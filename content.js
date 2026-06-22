// content.js
console.log("AutoForm Content Script Loaded");

// Listen for messages from Popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "START_SCRAPE") {
        handleFormFill(request.profile, request.apiKey);
        sendResponse({ status: "started" });
    }
});

// Scrape form-level metadata (title, description)
function scrapeFormMeta() {
    const meta = {};
    // Form title
    const titleEl = document.querySelector('div[role="heading"][aria-level="1"], .ahS2Le, .F9yp7e .lrKTG');
    if (titleEl) meta.title = titleEl.innerText.trim();
    // Form description
    const descEl = document.querySelector('.RMkAFc, .gubaDc, .cBGGJ');
    if (descEl) meta.description = descEl.innerText.trim();
    return meta;
}

async function handleFormFill(profile, apiKey) {
    const formMeta = scrapeFormMeta();
    const questions = scrapeQuestions();

    if (questions.length === 0) {
        alert("No questions found. Is this a Google Form?");
        return;
    }

    console.log("Form metadata:", formMeta);
    console.log("Scraped questions:", questions);

    try {
        // Send to Background for Gemini
        const response = await chrome.runtime.sendMessage({
            action: "FETCH_GEMINI",
            profile: profile,
            apiKey: apiKey,
            questions: questions,
            formMeta: formMeta
        });

        console.log("Response from Gemini:", response);
        
        if (response.success) {
            console.log("Answers received:", response.data);
            await fillForm(questions, response.data);
        } else {
            alert("Error from Gemini: " + response.error);
        }

    } catch (e) {
        console.error("Error during processing:", e);
        alert("Error during processing: " + e.message);
    }
}

function scrapeQuestions() {
    const questions = [];
    const items = document.querySelectorAll('div[role="listitem"]');
    let questionIndex = 0;

    items.forEach((item) => {
        // Determine type and options first to filter non-question items
        let type = "text";
        let options = [];
        let hasInput = false;

        if (item.querySelector('div[role="radio"]')) {
            type = "radio";
            hasInput = true;
            item.querySelectorAll('div[role="radio"]').forEach(opt => {
                const val = opt.getAttribute('data-value');
                if (val) options.push(val);
            });
            // Fallback to visible text if data-value missing
            if (options.length === 0) {
                item.querySelectorAll('div[role="radio"]').forEach(opt => {
                    const text = opt.innerText?.trim();
                    if (text) options.push(text);
                });
            }
        } else if (item.querySelector('div[role="checkbox"]')) {
            type = "checkbox";
            hasInput = true;
            item.querySelectorAll('div[role="checkbox"]').forEach(opt => {
                const val = opt.getAttribute('data-value');
                if (val) options.push(val);
            });
            // Fallback if data-value missing
            if (options.length === 0) {
                item.querySelectorAll('label').forEach(lbl => {
                    const text = lbl.innerText?.trim();
                    if (text) options.push(text);
                });
            }
        } else if (item.querySelector('div[role="listbox"]')) {
            type = 'dropdown';
            hasInput = true;
            // Scrape dropdown options
            item.querySelectorAll('div[role="option"]').forEach(opt => {
                const val = opt.getAttribute('data-value');
                if (val) options.push(val);
            });
            if (options.length === 0) {
                item.querySelectorAll('div[role="option"] .vRMGwf, div[role="option"] span').forEach(el => {
                    const text = el.innerText?.trim();
                    if (text) options.push(text);
                });
            }
        } else if (item.querySelector('input[type="text"], input[type="email"], input[type="tel"], input[type="url"], input[type="number"], input[type="date"], input[type="time"], input[type="datetime-local"], textarea')) {
            type = "text";
            hasInput = true;
        }

        // Skip non-question items (section headers, info text blocks)
        if (!hasInput) return;

        const qId = `q_${questionIndex}`;
        questionIndex++;
        item.setAttribute('data-q-id', qId);

        // Try to find the title
        let title = "Unknown Question";
        const titleEl = item.querySelector('div[role="heading"], .M7eMe');
        if (titleEl) {
            title = titleEl.innerText.trim();
        } else {
            const firstLine = item.innerText.split('\n')[0]?.trim();
            if (firstLine) title = firstLine;
        }

        // Capture question description/helper text
        let description = undefined;
        const descEl = item.querySelector('.gubaDc, .ulDsOb, .SL4Cs');
        if (descEl) {
            const descText = descEl.innerText?.trim();
            if (descText) description = descText;
        }

        // Detect required indicator
        const isRequired = !!(item.querySelector('[aria-label*="Required"], .vnumgf, [data-required="true"]')
            || item.querySelector('span[aria-label="Required question"]'));

        const questionData = {
            id: qId,
            text: title,
            type: type
        };
        if (description) questionData.description = description;
        if (isRequired) questionData.required = true;
        if (options.length > 0) questionData.options = options;

        questions.push(questionData);
    });

    return questions;
}

// Helpers to compare option text with provided answers (accepts "a", "a.", "a)", etc.)
function stripLeadingLabel(s) {
    if (!s) return '';
    return s.replace(/^[A-Za-z]\s*[\.\)]\s*/,'').trim();
}

function matchesAnswerText(optText, answer) {
    return matchScore(optText, answer) > 0;
}

// Score how well an option text matches a proposed answer.
// Higher = better match; 0 = no match. Used to pick the BEST option (not just the first).
function matchScore(optText, answer) {
    if (!optText) return 0;
    const o = optText.trim();
    const a = String(answer).trim();
    if (!a) return 0;

    // Exact match (strongest)
    if (o === a) return 100;

    const oLower = o.toLowerCase();
    const aLower = a.toLowerCase();
    if (oLower === aLower) return 95;

    // Alphanumeric-only normalization (handles punctuation/spacing differences)
    const norm = str => (str || '').replace(/[^a-z0-9]/gi, '').toLowerCase();
    if (norm(o).length > 0 && norm(o) === norm(a)) return 90;

    // Strip leading label ("a.", "B)") from either side and compare
    if (stripLeadingLabel(o).toLowerCase() === aLower) return 85;
    if (oLower === stripLeadingLabel(a).toLowerCase()) return 85;

    // Option starts with the answer used as a label prefix, e.g. answer "a" -> "a. Foo"
    if (oLower.startsWith(aLower + '.') || oLower.startsWith(aLower + ')')) return 80;

    // Substantial substring containment (for longer texts)
    if (aLower.length >= 4 && oLower.includes(aLower)) return 60;
    if (oLower.length >= 4 && aLower.includes(oLower)) return 55;

    // Word overlap ratio (for multi-word options)
    const oWords = oLower.split(/\s+/).filter(w => w.length > 2);
    const aWords = aLower.split(/\s+/).filter(w => w.length > 2);
    if (oWords.length >= 2 && aWords.length >= 2) {
        const overlap = oWords.filter(w => aWords.includes(w)).length;
        const ratio = overlap / Math.min(oWords.length, aWords.length);
        if (ratio >= 0.8) return Math.round(40 * ratio);
    }

    return 0;
}

// Preserve current scroll position while running an action, then restore.
function preserveScrollAsync(action) {
    const x = window.scrollX || window.pageXOffset || 0;
    const y = window.scrollY || window.pageYOffset || 0;
    try {
        action();
    } catch (e) {
        console.warn('preserveScroll action error', e);
    }

    return new Promise(resolve => {
        // Restore on next frame to override any scroll caused by action
        requestAnimationFrame(() => {
            try { window.scrollTo(x, y); } catch (e) {}
            resolve();
        });
    });
}

// Unified option finder: picks the BEST-scoring option among data-value, visible text, and labels
function findOptionElement(container, roleSelector, answerText) {
    // Strategy 1: Try data-value attribute (exact match) — highest confidence
    let el = container.querySelector(`${roleSelector}[data-value="${CSS.escape(String(answerText))}"]`);
    if (el) return el;

    // Strategy 2: Rank all candidate elements by match score and return the best one.
    let best = null;
    let bestScore = 0;
    const candidates = [
        ...Array.from(container.querySelectorAll(roleSelector)),
        ...Array.from(container.querySelectorAll('label'))
    ];
    for (const opt of candidates) {
        const optText = opt.innerText?.trim() || opt.textContent?.trim() || '';
        const score = matchScore(optText, answerText);
        if (score > bestScore) {
            bestScore = score;
            best = opt;
        }
    }

    return best;
}

// Unified click handler: prefers underlying input, falls back to synthetic click
async function clickOption(element) {
    const innerInput = element.querySelector('input[type="radio"], input[type="checkbox"], input');
    if (innerInput) {
        await preserveScrollAsync(() => {
            try {
                innerInput.checked = true;
                innerInput.dispatchEvent(new Event('input', { bubbles: true }));
                innerInput.dispatchEvent(new Event('change', { bubbles: true }));
                if (element.setAttribute) element.setAttribute('aria-checked', 'true');
            } catch (e) {
                console.warn('Could not set underlying input checked:', e);
            }
        });
    } else {
        await preserveScrollAsync(() => {
            try { element.focus && element.focus({ preventScroll: true }); } catch (e) { try { element.focus && element.focus(); } catch (e2) {} }
            element.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
        });
    }
}

// Parse checkbox answer: handle arrays, comma-separated strings, and single strings
function parseCheckboxAnswer(answer, availableOptions) {
    if (Array.isArray(answer)) return answer.map(a => String(a).trim()).filter(Boolean);
    const str = String(answer).trim();
    if (!str) return [];
    const opts = availableOptions || [];
    // If the whole string strongly matches a single option, keep it intact.
    // This protects option texts that legitimately contain commas/semicolons.
    if (opts.some(opt => matchScore(opt, str) >= 85)) return [str];
    // Try splitting by comma; only accept the split if every part STRONGLY matches an option.
    if (opts.length > 0 && str.includes(',')) {
        const parts = str.split(',').map(s => s.trim()).filter(Boolean);
        const allMatch = parts.every(p => opts.some(opt => matchScore(opt, p) >= 85));
        if (allMatch) return parts;
    }
    // Try splitting by semicolon
    if (opts.length > 0 && str.includes(';')) {
        const parts = str.split(';').map(s => s.trim()).filter(Boolean);
        const allMatch = parts.every(p => opts.some(opt => matchScore(opt, p) >= 85));
        if (allMatch) return parts;
    }
    return [str];
}

async function fillForm(questions, answers) {
    console.log("Starting to fill form with questions:", questions);
    console.log("Answers to fill:", answers);
    let filled = 0, skipped = 0, failed = 0;
    const failedQuestions = [];
    
    for (const q of questions) {
        const answer = answers[q.id];
        
        console.log(`Processing ${q.id}: "${q.text}" | Type: ${q.type} | Answer:`, answer);
        
        if (!answer || answer === "[MANUAL_REVIEW]") {
            console.log(`Skipping ${q.id} - no answer`);
            skipped++;
            failedQuestions.push({ id: q.id, text: q.text, reason: 'no answer from LLM' });
            continue;
        }

        const container = document.querySelector(`[data-q-id="${q.id}"]`);
        if (!container) {
            console.warn(`Container not found for ${q.id}`);
            failed++;
            failedQuestions.push({ id: q.id, text: q.text, reason: 'DOM container not found' });
            continue;
        }

        if (q.type === 'text') {
            const input = container.querySelector('input[type="text"], input[type="email"], input[type="tel"], textarea, input[type="url"], input[type="number"], input[type="date"], input[type="time"], input[type="datetime-local"]');
            if (input) {
                simulateTyping(input, String(answer));
                filled++;
                await new Promise(resolve => setTimeout(resolve, 300));
            } else {
                console.warn(`No text input found in ${q.id}`);
                failed++;
                failedQuestions.push({ id: q.id, text: q.text, reason: 'no input element found' });
            }
        } else if (q.type === 'radio') {
            let radio = findOptionElement(container, 'div[role="radio"]', String(answer));

            if (radio) {
                await clickOption(radio);
                filled++;
                await new Promise(resolve => setTimeout(resolve, 200));
            } else {
                console.warn(`Could not find radio option for ${q.id}: ${answer}`);
                failed++;
                failedQuestions.push({ id: q.id, text: q.text, reason: `option not found: ${answer}` });
            }
        } else if (q.type === 'checkbox') {
            const answerList = parseCheckboxAnswer(answer, q.options);
            let cbFilled = 0;
            
            for (const ans of answerList) {
                let checkbox = findOptionElement(container, 'div[role="checkbox"]', ans);

                if (checkbox) {
                    const isChecked = checkbox.getAttribute && checkbox.getAttribute('aria-checked') === 'true';
                    if (!isChecked) {
                        await clickOption(checkbox);
                        cbFilled++;
                        await new Promise(resolve => setTimeout(resolve, 150));
                    } else {
                        cbFilled++; // already checked
                    }
                } else {
                    console.warn(`Could not find checkbox for: ${ans}`);
                }
            }
            if (cbFilled > 0) filled++; else {
                failed++;
                failedQuestions.push({ id: q.id, text: q.text, reason: `checkbox options not found: ${answerList.join(', ')}` });
            }
        } else if (q.type === 'dropdown') {
            // Click to open the dropdown
            const listbox = container.querySelector('div[role="listbox"]');
            if (listbox) {
                await preserveScrollAsync(() => {
                    listbox.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
                });
                await new Promise(resolve => setTimeout(resolve, 300));

                // Find and click the BEST matching option (rank by score, not first match)
                const allOptions = Array.from(document.querySelectorAll('div[role="option"], div[data-value]'));
                let matched = false;
                let bestOpt = null;
                let bestScore = 0;
                for (const opt of allOptions) {
                    const optText = opt.getAttribute('data-value') || opt.innerText?.trim() || '';
                    const score = matchScore(optText, String(answer));
                    if (score > bestScore) {
                        bestScore = score;
                        bestOpt = opt;
                    }
                }
                if (bestOpt) {
                    await preserveScrollAsync(() => {
                        bestOpt.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
                    });
                    filled++;
                    matched = true;
                }
                if (!matched) {
                    failed++;
                    failedQuestions.push({ id: q.id, text: q.text, reason: `dropdown option not found: ${answer}` });
                    // Click again to close dropdown
                    await preserveScrollAsync(() => {
                        listbox.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
                    });
                }
                await new Promise(resolve => setTimeout(resolve, 200));
            } else {
                failed++;
                failedQuestions.push({ id: q.id, text: q.text, reason: 'dropdown listbox not found' });
            }
        }
    }

    // Fill summary
    const total = questions.length;
    console.log(`\n===== FILL SUMMARY =====`);
    console.log(`Total questions: ${total}`);
    console.log(`Filled: ${filled}`);
    console.log(`Skipped (no answer): ${skipped}`);
    console.log(`Failed: ${failed}`);
    if (failedQuestions.length > 0) {
        console.log(`Failed questions:`);
        failedQuestions.forEach(fq => console.log(`  - ${fq.id} "${fq.text}": ${fq.reason}`));
    }
    console.log(`========================\n`);
}

// Crucial: Simulating typing events
function simulateTyping(element, text) {
    // Try to focus without causing the browser to scroll the element into view.
    try {
        if (typeof element.focus === 'function') {
            element.focus({ preventScroll: true });
        }
    } catch (e) {
        try { element.focus(); } catch (e2) { /* ignore */ }
    }

    // Set value and dispatch input/change/blur so frameworks pick up the change.
    element.value = text;
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
    try { element.dispatchEvent(new Event('blur', { bubbles: true })); } catch (e) { /* ignore */ }
}
