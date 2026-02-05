// content.js
console.log("AutoForm Content Script Loaded");

// Listen for messages from Popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "START_SCRAPE") {
        handleFormFill(request.profile, request.apiKey);
        sendResponse({ status: "started" });
    }
});

async function handleFormFill(profile, apiKey) {
    const questions = scrapeQuestions();

    if (questions.length === 0) {
        alert("No questions found. Is this a Google Form?");
        return;
    }

    // Highlight processing - removed yellow border
    // questions.forEach(q => {
    //     const el = document.querySelector(`[data-q-id="${q.id}"]`);
    //     if (el) el.style.border = "2px solid yellow";
    // });

    try {
        // Send to Background for Gemini
        const response = await chrome.runtime.sendMessage({
            action: "FETCH_GEMINI",
            profile: profile,
            apiKey: apiKey,
            questions: questions
        });

        console.log("📨 Response from Gemini:", response);
        
        if (response.success) {
            console.log("📊 Answers received:", response.data);
            await fillForm(questions, response.data);
            // Completion notification removed per user request
        } else {
            alert("Error from Gemini: " + response.error);
        }

    } catch (e) {
        console.error("❌ Error during processing:", e);
        alert("Error during processing: " + e.message);
    }
}

function scrapeQuestions() {
    const questions = [];
    // Google Forms usually uses role="listitem" for question cards
    const items = document.querySelectorAll('div[role="listitem"]');

    items.forEach((item, index) => {
        // Generate a temporary ID for tracking
        const qId = `q_${index}`;
        item.setAttribute('data-q-id', qId);

        // Try to find the title
        let title = "Unknown Question";
        // Google Forms titles are often in specific divs, e.g. role="heading" or specific classes
        // We look for the first non-empty text node or specific header
        const titleEl = item.querySelector('div[role="heading"], .M7eMe');
        if (titleEl) {
            title = titleEl.innerText;
        } else {
            // Fallback: grab all text and take the first line
            title = item.innerText.split('\n')[0];
        }

        // Determine type and options
        let type = "text"; // default
        let options = [];

        // Check for specific input indicators
        if (item.querySelector('div[role="radio"]')) {
            type = "radio";
            // Scrape options
            item.querySelectorAll('div[role="radio"]').forEach(opt => {
                options.push(opt.getAttribute('data-value'));
            });
        } else if (item.querySelector('div[role="checkbox"]')) {
            type = "checkbox";
            item.querySelectorAll('div[role="checkbox"]').forEach(opt => {
                options.push(opt.getAttribute('data-value')); // often in data-value attribute
            });
            // Fallback if data-value is missing, check aria-label or text
            if (options.some(o => !o)) {
                options = [];
                item.querySelectorAll('label').forEach(lbl => options.push(lbl.innerText));
            }
        } else if (item.querySelector('div[role="listbox"]')) {
            type = 'dropdown'; // Slightly harder, skipping complex dropdown scraping for MVP text/radio/check
        }

        questions.push({
            id: qId,
            text: title,
            type: type,
            options: options.length > 0 ? options : undefined
        });
    });

    return questions;
}

async function fillForm(questions, answers) {
    console.log("🔄 Starting to fill form with questions:", questions);
    console.log("📝 Answers to fill:", answers);
    
    for (const q of questions) {
        const answer = answers[q.id];
        
        console.log(`Processing Q${q.id}: "${q.text}" | Type: ${q.type} | Answer: ${answer}`);
        
        if (!answer || answer === "[MANUAL_REVIEW]") {
            console.log(`⏭️  Skipping Q${q.id} - no answer or manual review needed`);
            continue;
        }

        const container = document.querySelector(`[data-q-id="${q.id}"]`);
        if (!container) {
            console.warn(`⚠️ Container not found for Q${q.id}`);
            continue;
        }

        // Remove green border styling - just fill without visual feedback
        // container.style.border = "2px solid green";

        if (q.type === 'text') {
            const input = container.querySelector('input[type="text"], input[type="email"], input[type="tel"], textarea, input[type="url"], input[type="number"]');
            if (input) {
                console.log(`✍️  Filling text field Q${q.id} with: ${answer}`);
                simulateTyping(input, String(answer));
                await new Promise(resolve => setTimeout(resolve, 300)); // Wait for input to register
            } else {
                console.warn(`⚠️ No text input found in Q${q.id}`);
            }
        } else if (q.type === 'radio') {
            console.log(`🔘 Processing radio Q${q.id}, looking for: ${answer}`);
            
            // Strategy 1: Try data-value attribute
            let radio = container.querySelector(`div[role="radio"][data-value="${CSS.escape(String(answer))}"]`);
            
            // Strategy 2: Try finding by visible text
            if (!radio) {
                const radioOptions = Array.from(container.querySelectorAll('div[role="radio"]'));
                console.log(`Found ${radioOptions.length} radio options in Q${q.id}`);
                
                for (let opt of radioOptions) {
                    const optText = opt.innerText?.trim() || opt.textContent?.trim() || '';
                    if (optText === String(answer).trim()) {
                        radio = opt;
                        console.log(`✅ Found radio option by text: ${optText}`);
                        break;
                    }
                }
            }
            
            // Strategy 3: Try label text
            if (!radio) {
                const labels = Array.from(container.querySelectorAll('label'));
                const targetLabel = labels.find(l => l.innerText?.trim() === String(answer).trim());
                if (targetLabel) {
                    radio = targetLabel;
                    console.log(`✅ Found radio option by label text`);
                }
            }

            if (radio) {
                console.log(`✅ Activating radio for Q${q.id} without scrolling`);

                // Prefer toggling an underlying input if available (no scroll)
                const innerInput = radio.querySelector('input[type="radio"], input[type="checkbox"], input');
                if (innerInput) {
                    try {
                        innerInput.checked = true;
                        innerInput.dispatchEvent(new Event('input', { bubbles: true }));
                        innerInput.dispatchEvent(new Event('change', { bubbles: true }));
                        radio.setAttribute && radio.setAttribute('aria-checked', 'true');
                    } catch (e) {
                        console.warn('Could not set underlying input checked:', e);
                    }
                } else {
                    // Fallback: dispatch a synthetic click without focusing (less likely to cause scroll)
                    try { radio.focus && radio.focus({ preventScroll: true }); } catch (e) { try { radio.focus && radio.focus(); } catch (e2) {} }
                    radio.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
                }
                await new Promise(resolve => setTimeout(resolve, 200));
            } else {
                console.warn(`❌ Could not find radio option for Q${q.id}: ${answer}`);
            }
        } else if (q.type === 'checkbox') {
            const answerList = Array.isArray(answer) ? answer : [String(answer)];
            console.log(`☑️  Processing checkbox Q${q.id}, answers: ${answerList.join(', ')}`);
            
            for (const ans of answerList) {
                // Strategy 1: Try data-value
                let checkbox = container.querySelector(`div[role="checkbox"][data-value="${CSS.escape(String(ans))}"]`);
                
                // Strategy 2: Find by visible text
                if (!checkbox) {
                    const checkboxOptions = Array.from(container.querySelectorAll('div[role="checkbox"]'));
                    for (let opt of checkboxOptions) {
                        const optText = opt.innerText?.trim() || opt.textContent?.trim() || '';
                        if (optText === String(ans).trim()) {
                            checkbox = opt;
                            break;
                        }
                    }
                }
                
                // Strategy 3: Try label
                if (!checkbox) {
                    const labels = Array.from(container.querySelectorAll('label'));
                    const targetLabel = labels.find(l => l.innerText?.trim() === String(ans).trim());
                    if (targetLabel) checkbox = targetLabel;
                }

                if (checkbox) {
                    const isChecked = checkbox.getAttribute && checkbox.getAttribute('aria-checked') === 'true';
                    if (!isChecked) {
                        console.log(`✅ Activating checkbox for: ${ans} without scrolling`);

                        // Prefer toggling an underlying input if available
                        const innerInput = checkbox.querySelector('input[type="checkbox"], input[type="radio"], input');
                        if (innerInput) {
                            try {
                                innerInput.checked = true;
                                innerInput.dispatchEvent(new Event('input', { bubbles: true }));
                                innerInput.dispatchEvent(new Event('change', { bubbles: true }));
                                checkbox.setAttribute && checkbox.setAttribute('aria-checked', 'true');
                            } catch (e) {
                                console.warn('Could not set underlying input checked:', e);
                            }
                        } else {
                            try { checkbox.focus && checkbox.focus({ preventScroll: true }); } catch (e) { try { checkbox.focus && checkbox.focus(); } catch (e2) {} }
                            checkbox.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
                        }
                        await new Promise(resolve => setTimeout(resolve, 150));
                    }
                } else {
                    console.warn(`❌ Could not find checkbox for: ${ans}`);
                }
            }
        }
    }
    
    console.log("✨ Form filling completed!");
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
