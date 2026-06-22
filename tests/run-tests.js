// Unit tests for the pure helper functions in content.js and background.js.
// Strategy: load each source file inside a Node `vm` sandbox with the browser/
// extension globals mocked, so top-level function declarations become available
// without executing any DOM or network code. The extension source is NOT modified.

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');

function loadModule(file, overrides = {}) {
    const code = fs.readFileSync(path.join(ROOT, file), 'utf8');
    const sandbox = {
        console: { log() {}, warn() {}, error() {} },
        chrome: { runtime: { onMessage: { addListener() {} } } },
        fetch: () => { throw new Error('network disabled in tests'); },
        setTimeout,
        document: undefined,
        window: undefined,
        CSS: { escape: (s) => String(s) },
        requestAnimationFrame: (cb) => cb(),
    };
    Object.assign(sandbox, overrides);
    vm.createContext(sandbox);
    vm.runInContext(code, sandbox, { filename: file });
    return sandbox;
}

// ---- tiny test runner ----
let passed = 0, failed = 0;
const failures = [];
function eq(actual, expected, msg) {
    const a = JSON.stringify(actual);
    const e = JSON.stringify(expected);
    if (a === e) { passed++; }
    else { failed++; failures.push(`${msg}\n    expected: ${e}\n    actual:   ${a}`); }
}
function ok(cond, msg) {
    if (cond) { passed++; }
    else { failed++; failures.push(`${msg}\n    expected truthy, got: ${cond}`); }
}

// ============== content.js ==============
const content = loadModule('content.js');
const { matchScore, matchesAnswerText, stripLeadingLabel, parseCheckboxAnswer } = content;

ok(typeof matchScore === 'function', 'matchScore should be defined');
ok(typeof parseCheckboxAnswer === 'function', 'parseCheckboxAnswer should be defined');

// stripLeadingLabel
eq(stripLeadingLabel('a. Option One'), 'Option One', 'stripLeadingLabel removes "a." prefix');
eq(stripLeadingLabel('B) Thing'), 'Thing', 'stripLeadingLabel removes "B)" prefix');
eq(stripLeadingLabel('No label here'), 'No label here', 'stripLeadingLabel keeps plain text');

// matchScore ranking
eq(matchScore('Confidentiality', 'Confidentiality'), 100, 'exact match -> 100');
eq(matchScore('Confidentiality', 'confidentiality'), 95, 'case-insensitive -> 95');
ok(matchScore('Integrity!', 'integrity') >= 90, 'normalized (punctuation) match high score');
eq(matchScore('a. Availability', 'Availability'), 85, 'strip label from option equals answer -> 85');
eq(matchScore('a. Availability', 'a'), 80, 'answer is label prefix -> 80');
ok(matchScore('Apple', 'Banana') === 0, 'no match -> 0');
eq(matchScore('anything', ''), 0, 'empty answer -> 0');
eq(matchScore('', 'anything'), 0, 'empty option -> 0');

// matchScore: substring containment branch (score 55-60)
const subScore = matchScore('The CIA triad includes confidentiality', 'confidentiality');
ok(subScore >= 55 && subScore < 90, 'long option containing short answer -> substring score');
const subScore2 = matchScore('integrity', 'data integrity controls');
ok(subScore2 >= 55 && subScore2 < 90, 'answer containing option -> substring score');

// matchScore: word-overlap branch for multi-word texts (no substring containment)
const overlap = matchScore('security monitoring tools', 'monitoring security');
ok(overlap > 0 && overlap <= 40, 'word overlap >= 0.8 -> partial score');
eq(matchScore('network security monitoring', 'security network auditing'), 0,
    'word overlap below 0.8 threshold -> 0');
eq(matchScore('alpha beta gamma', 'delta epsilon zeta'), 0, 'no word overlap -> 0');

// best-match preference: exact should outrank a fuzzy substring
const optExact = 'Network security';
const optFuzzy = 'Network security and database administration practices';
ok(matchScore(optExact, 'Network security') > matchScore(optFuzzy, 'Network security'),
    'exact option scores higher than a longer fuzzy option');

// matchesAnswerText boolean wrapper
ok(matchesAnswerText('a. Confidentiality', 'Confidentiality'), 'matchesAnswerText true on label-stripped match');
ok(!matchesAnswerText('Apple', 'Orange'), 'matchesAnswerText false on no match');
ok(!matchesAnswerText('', 'anything'), 'matchesAnswerText false on empty option');

// parseCheckboxAnswer
eq(parseCheckboxAnswer(['A', 'B'], ['A', 'B', 'C']), ['A', 'B'], 'array passes through');
eq(parseCheckboxAnswer('A, B', ['A', 'B', 'C']), ['A', 'B'], 'comma-split when all parts are valid options');
eq(parseCheckboxAnswer('A; B', ['A', 'B', 'C']), ['A', 'B'], 'semicolon-split when all parts are valid options');
eq(parseCheckboxAnswer('Hello, world', ['Hello, world']), ['Hello, world'],
    'comma kept as single answer when split parts are NOT valid options');
eq(parseCheckboxAnswer('Single', ['Single', 'Other']), ['Single'], 'single answer -> one-element array');
eq(parseCheckboxAnswer('  ', ['A']), [], 'blank answer -> empty array');

// findOptionElement: picks best-scoring option among candidates (mock DOM)
const { findOptionElement } = content;
ok(typeof findOptionElement === 'function', 'findOptionElement should be defined');

function mockOption(text, dataValue) {
    return {
        innerText: text,
        textContent: text,
        _dataValue: dataValue,
        getAttribute(name) { return name === 'data-value' ? (this._dataValue ?? null) : null; },
    };
}
function mockContainer(options) {
    return {
        _options: options,
        querySelector(sel) {
            // Only the data-value exact-match selector is used by Strategy 1
            const m = sel.match(/\[data-value="([^"]*)"\]/);
            if (m) return this._options.find(o => o._dataValue === m[1]) || null;
            return null;
        },
        querySelectorAll(sel) {
            if (sel === 'label') return [];
            return this._options;
        },
    };
}

// Strategy 1: exact data-value match wins immediately
const c1 = mockContainer([mockOption('Apple', 'Apple'), mockOption('Banana', 'Banana')]);
eq(findOptionElement(c1, 'div[role="radio"]', 'Banana').innerText, 'Banana',
    'findOptionElement matches by exact data-value');

// Strategy 2: no data-value -> pick highest matchScore (exact text beats fuzzy substring)
const c2 = mockContainer([
    mockOption('Network security and administration practices'),
    mockOption('Network security'),
]);
eq(findOptionElement(c2, 'div[role="radio"]', 'Network security').innerText, 'Network security',
    'findOptionElement prefers exact text over longer fuzzy option');

// Strategy 2: label-prefixed option matched by stripped answer
const c3 = mockContainer([mockOption('a. Confidentiality'), mockOption('b. Integrity')]);
eq(findOptionElement(c3, 'div[role="radio"]', 'Integrity').innerText, 'b. Integrity',
    'findOptionElement matches label-prefixed option by stripped text');

// No match -> returns null
const c4 = mockContainer([mockOption('Apple'), mockOption('Banana')]);
eq(findOptionElement(c4, 'div[role="radio"]', 'Spaceship'), null,
    'findOptionElement returns null when nothing matches');

// ============== content.js :: scrapeQuestions (mock DOM) ==============
// Builds a fake Google Form <listitem> node for one question of a given type.
function mockQuestionItem({ type, options = [], title = 'Q', description, required = false }) {
    const optNodes = options.map(o => ({
        innerText: o.text ?? o.value,
        getAttribute(n) { return n === 'data-value' ? (o.value ?? null) : null; },
    }));
    const attrs = {};
    return {
        innerText: title,
        setAttribute(n, v) { attrs[n] = v; },
        getAttribute(n) { return attrs[n] ?? null; },
        querySelector(sel) {
            if (sel.includes('role="radio"')) return type === 'radio' ? (optNodes[0] || {}) : null;
            if (sel.includes('role="checkbox"')) return type === 'checkbox' ? (optNodes[0] || {}) : null;
            if (sel.includes('role="listbox"')) return type === 'dropdown' ? {} : null;
            if (sel.includes('input[type="text"]')) return type === 'text' ? {} : null;
            if (sel.includes('role="heading"')) return { innerText: title };
            if (sel.includes('gubaDc')) return description ? { innerText: description } : null;
            if (sel.includes('Required') || sel.includes('vnumgf') || sel.includes('data-required')) return required ? {} : null;
            return null;
        },
        querySelectorAll(sel) {
            if (sel.includes('role="radio"')) return type === 'radio' ? optNodes : [];
            if (sel.includes('role="checkbox"')) return type === 'checkbox' ? optNodes : [];
            if (sel.includes('role="option"')) return type === 'dropdown' ? optNodes : [];
            return [];
        },
    };
}
function scrapeWith(items) {
    const doc = {
        querySelector() { return null; },
        querySelectorAll(sel) { return sel.includes('listitem') ? items : []; },
    };
    return loadModule('content.js', { document: doc }).scrapeQuestions();
}

// radio question: type + options from data-value + required flag
{
    const qs = scrapeWith([mockQuestionItem({
        type: 'radio', title: 'Pick one', required: true,
        options: [{ value: 'Confidentiality' }, { value: 'Integrity' }],
    })]);
    eq(qs.length, 1, 'scrapeQuestions returns one radio question');
    eq(qs[0].type, 'radio', 'radio type detected');
    eq(qs[0].id, 'q_0', 'first question gets id q_0');
    eq(qs[0].options, ['Confidentiality', 'Integrity'], 'radio options scraped from data-value');
    ok(qs[0].required === true, 'required flag detected');
}

// checkbox / dropdown / text detection
{
    const qs = scrapeWith([
        mockQuestionItem({ type: 'checkbox', title: 'Many', options: [{ value: 'X' }, { value: 'Y' }] }),
        mockQuestionItem({ type: 'dropdown', title: 'Drop', options: [{ value: 'D1' }] }),
        mockQuestionItem({ type: 'text', title: 'Free' }),
    ]);
    eq(qs.map(q => q.type), ['checkbox', 'dropdown', 'text'], 'checkbox/dropdown/text types detected');
    eq(qs.map(q => q.id), ['q_0', 'q_1', 'q_2'], 'ids are sequential');
    ok(!('options' in qs[2]), 'text question has no options key');
}

// non-question items (no input) are skipped and do not consume an id
{
    const qs = scrapeWith([
        mockQuestionItem({ type: 'none', title: 'Section header' }),
        mockQuestionItem({ type: 'text', title: 'Real question' }),
    ]);
    eq(qs.length, 1, 'section header without input is skipped');
    eq(qs[0].id, 'q_0', 'skipped item does not consume an id');
    eq(qs[0].text, 'Real question', 'question title captured from heading');
}

// description / helper text is captured when present
{
    const qs = scrapeWith([mockQuestionItem({ type: 'text', title: 'Q', description: 'helper text' })]);
    eq(qs[0].description, 'helper text', 'question description captured');
}

// ============== background.js ==============
const background = loadModule('background.js');
const { buildSystemInstruction, buildUserContent, loadContextMaterial } = background;

ok(typeof buildSystemInstruction === 'function', 'buildSystemInstruction defined');
ok(typeof buildUserContent === 'function', 'buildUserContent defined');
ok(typeof loadContextMaterial === 'function', 'loadContextMaterial defined');

const sys = buildSystemInstruction();
ok(sys.includes('JSON'), 'system instruction mentions JSON output');
ok(/EVERY question/i.test(sys), 'system instruction requires answering every question');

// loadContextMaterial: the escaped backticks must resolve to real code fences at runtime
const ctx = loadContextMaterial();
ok(ctx.includes('# Chapter 1: Security and Information Technology'), 'context includes Chapter 1');
ok(ctx.includes('# Chapter 4: Database Installation 2'), 'context includes Chapter 4');
ok(ctx.includes('```sql'), 'context has a real ```sql fence (escaping resolved)');
ok(ctx.includes('```bash'), 'context has a real ```bash fence (escaping resolved)');
ok(!ctx.includes('\\`'), 'context contains no leftover escaped-backtick sequences');

// buildUserContent wiring
const questions = [
    { id: 'q_0', text: 'Your name?', type: 'text' },
    { id: 'q_1', text: 'Pick one', type: 'radio', options: ['A', 'B'] },
];
const uc = buildUserContent('PROFILE_DATA', questions, { title: 'Quiz', description: 'desc' }, ctx);
ok(uc.includes('PROFILE_DATA'), 'user content includes the profile');
ok(uc.includes('Reference Material'), 'user content includes the reference material section');
ok(uc.includes('Form Title: Quiz'), 'user content includes form title');
ok(uc.includes('"q_0"') && uc.includes('"q_1"'), 'user content serializes question ids');

// buildUserContent without context material should omit the reference section
const uc2 = buildUserContent('P', questions, null, null);
ok(!uc2.includes('Reference Material'), 'no reference section when context material is null');

// ============== background.js :: callGemini (mocked fetch) ==============
// Helper to build a fake Gemini HTTP response object.
function geminiResponse(text, { ok: okFlag = true, status = 200, finishReason = 'STOP', noParts = false } = {}) {
    const candidate = noParts
        ? { finishReason }
        : { finishReason, content: { parts: [{ text }] } };
    return {
        ok: okFlag,
        status,
        statusText: okFlag ? 'OK' : 'Error',
        text: async () => (typeof text === 'string' ? text : JSON.stringify(text)),
        json: async () => ({ candidates: okFlag ? [candidate] : [] }),
    };
}

// Loads background.js with a scripted sequence of fetch responses; records the
// generationConfig sent on each call so we can assert retry behavior.
function withGemini(responses) {
    const calls = [];
    let i = 0;
    const fetchMock = async (url, init) => {
        const body = JSON.parse(init.body);
        calls.push(body.generationConfig);
        const r = responses[Math.min(i, responses.length - 1)];
        i++;
        return r;
    };
    const mod = loadModule('background.js', { fetch: fetchMock });
    return { mod, calls, get count() { return i; } };
}

async function runAsyncTests() {
    // 1) Plain valid JSON
    {
        const { mod } = withGemini([geminiResponse('{"q_0":"Alice","q_1":"A"}')]);
        const res = await mod.callGemini('KEY', 'sys', 'user');
        eq(res, { q_0: 'Alice', q_1: 'A' }, 'callGemini parses plain JSON');
    }

    // 2) JSON wrapped in markdown fences is stripped
    {
        const fenced = '```json\n{"q_0":"X"}\n```';
        const { mod } = withGemini([geminiResponse(fenced)]);
        const res = await mod.callGemini('KEY', 'sys', 'user');
        eq(res, { q_0: 'X' }, 'callGemini strips markdown fences before parsing');
    }

    // 3) Multiple content parts are concatenated
    {
        const resp = {
            ok: true, status: 200, statusText: 'OK',
            text: async () => '',
            json: async () => ({ candidates: [{ finishReason: 'STOP', content: { parts: [{ text: '{"q_0":' }, { text: '"joined"}' }] } }] }),
        };
        const { mod } = withGemini([resp]);
        const res = await mod.callGemini('KEY', 'sys', 'user');
        eq(res, { q_0: 'joined' }, 'callGemini joins multiple response parts');
    }

    // 4) MAX_TOKENS with no parts -> retries with bigger budget + lower thinking, then succeeds
    {
        const { mod, calls } = withGemini([
            geminiResponse('', { finishReason: 'MAX_TOKENS', noParts: true }),
            geminiResponse('{"q_0":"ok"}'),
        ]);
        const res = await mod.callGemini('KEY', 'sys', 'user');
        eq(res, { q_0: 'ok' }, 'callGemini recovers after MAX_TOKENS-no-output retry');
        ok(calls.length === 2, 'MAX_TOKENS path triggers exactly one retry');
        ok(calls[1].maxOutputTokens > calls[0].maxOutputTokens, 'retry doubles the token budget');
        eq(calls[1].thinkingConfig.thinkingLevel, 'medium', 'retry lowers thinking level to medium');
    }

    // 5) Truncated JSON (MAX_TOKENS WITH partial text) -> retry yields complete object
    {
        const { mod, calls } = withGemini([
            geminiResponse('{"q_0":"partial', { finishReason: 'MAX_TOKENS' }),
            geminiResponse('{"q_0":"complete"}'),
        ]);
        const res = await mod.callGemini('KEY', 'sys', 'user');
        eq(res, { q_0: 'complete' }, 'callGemini retries on truncated JSON and succeeds');
        ok(calls.length === 2, 'truncated JSON triggers one retry');
    }

    // 6) Invalid JSON retried up to limit, then throws
    {
        const { mod, calls } = withGemini([geminiResponse('not json at all')]);
        let threw = false;
        try { await mod.callGemini('KEY', 'sys', 'user'); }
        catch (e) { threw = true; ok(/not valid JSON/.test(e.message), 'throws a not-valid-JSON error'); }
        ok(threw, 'callGemini throws after exhausting JSON retries');
        ok(calls.length === 3, 'invalid JSON retried twice (3 total attempts)');
    }

    // 7) HTTP error throws immediately with details
    {
        const { mod, calls } = withGemini([geminiResponse('quota exceeded', { ok: false, status: 429 })]);
        let threw = false;
        try { await mod.callGemini('KEY', 'sys', 'user'); }
        catch (e) { threw = true; ok(/429/.test(e.message), 'HTTP error message includes status code'); }
        ok(threw, 'callGemini throws on non-ok HTTP response');
        ok(calls.length === 1, 'HTTP error does not retry');
    }

    // 8) No candidates -> throws
    {
        const resp = { ok: true, status: 200, statusText: 'OK', text: async () => '', json: async () => ({ candidates: [] }) };
        const { mod } = withGemini([resp]);
        let threw = false;
        try { await mod.callGemini('KEY', 'sys', 'user'); }
        catch (e) { threw = true; ok(/no candidates/i.test(e.message), 'no-candidates error message'); }
        ok(threw, 'callGemini throws when no candidates are returned');
    }

    // ===== FETCH_GEMINI message listener (end-to-end with mocked fetch) =====
    // Loads background.js, capturing the registered onMessage listener and scripting fetch.
    function withListener(responses) {
        let listener = null;
        const calls = [];
        let i = 0;
        const chromeMock = { runtime: { onMessage: { addListener: (fn) => { listener = fn; } } } };
        const fetchMock = async (url, init) => {
            calls.push(JSON.parse(init.body));
            const r = responses[Math.min(i, responses.length - 1)];
            i++;
            return r;
        };
        loadModule('background.js', { chrome: chromeMock, fetch: fetchMock });
        return { listener, calls };
    }
    function invoke(listener, request) {
        return new Promise((resolve) => {
            const ret = listener(request, {}, (response) => resolve(response));
            ok(ret === true, 'listener returns true to keep the async channel open');
        });
    }
    const baseReq = {
        action: 'FETCH_GEMINI', apiKey: 'KEY', profile: 'P', formMeta: {},
        questions: [{ id: 'q_0', text: 'A', type: 'text' }, { id: 'q_1', text: 'B', type: 'text' }],
    };

    // 9) All answers present in first response -> success, no follow-up
    {
        const { listener, calls } = withListener([geminiResponse('{"q_0":"a0","q_1":"a1"}')]);
        const resp = await invoke(listener, baseReq);
        ok(resp.success === true, 'listener reports success');
        eq(resp.data, { q_0: 'a0', q_1: 'a1' }, 'listener returns all answers');
        ok(calls.length === 1, 'no follow-up when nothing is missing');
    }

    // 10) Missing answer -> targeted follow-up fills it in
    {
        const { listener, calls } = withListener([
            geminiResponse('{"q_0":"a0"}'),        // q_1 missing
            geminiResponse('{"q_1":"recovered"}'), // follow-up supplies it
        ]);
        const resp = await invoke(listener, baseReq);
        ok(resp.success === true, 'listener still succeeds after follow-up');
        eq(resp.data, { q_0: 'a0', q_1: 'recovered' }, 'follow-up merges the missing answer');
        ok(calls.length === 2, 'exactly one follow-up request was made');
    }

    // 11) Empty-string / placeholder answers count as missing and trigger follow-up
    {
        const { listener, calls } = withListener([
            geminiResponse('{"q_0":"","q_1":"[MANUAL_REVIEW]"}'),
            geminiResponse('{"q_0":"real0","q_1":"real1"}'),
        ]);
        const resp = await invoke(listener, baseReq);
        eq(resp.data, { q_0: 'real0', q_1: 'real1' }, 'blank and placeholder answers are re-asked and replaced');
        ok(calls.length === 2, 'follow-up triggered for empty/placeholder answers');
    }

    // 12) Underlying API error -> listener reports failure gracefully
    {
        const { listener } = withListener([geminiResponse('boom', { ok: false, status: 500 })]);
        const resp = await invoke(listener, baseReq);
        ok(resp.success === false, 'listener reports success:false on API error');
        ok(typeof resp.error === 'string' && resp.error.length > 0, 'listener includes an error message');
    }

    // 13) Context material is actually injected into the prompt sent to Gemini
    {
        const { listener, calls } = withListener([geminiResponse('{"q_0":"a0","q_1":"a1"}')]);
        await invoke(listener, baseReq);
        const sentUserText = calls[0].contents[0].parts[0].text;
        ok(sentUserText.includes('## Reference Material'),
            'prompt sent to Gemini contains the Reference Material section');
        ok(sentUserText.includes('# Chapter 1: Security and Information Technology'),
            'prompt sent to Gemini contains real context content (Chapter 1)');
        ok(sentUserText.includes('# Chapter 4: Database Installation 2'),
            'prompt sent to Gemini contains real context content (Chapter 4)');
        ok(sentUserText.includes('```sql'),
            'context code fences survive into the prompt (escaping resolved at runtime)');
        ok(!sentUserText.includes('\\`'),
            'no leftover escaped-backtick sequences in the prompt');
        // The injected context must match loadContextMaterial() verbatim.
        const ctxMat = loadContextMaterial();
        ok(sentUserText.includes(ctxMat),
            'full context material is embedded verbatim in the user prompt');
    }
}

runAsyncTests().then(() => {
    // ---- report ----
    console.log(`\nTests: ${passed} passed, ${failed} failed`);
    if (failures.length) {
        console.log('\nFailures:');
        failures.forEach((f, i) => console.log(`\n${i + 1}) ${f}`));
        process.exit(1);
    }
    process.exit(0);
}).catch((e) => {
    console.error('Test harness crashed:', e);
    process.exit(1);
});
