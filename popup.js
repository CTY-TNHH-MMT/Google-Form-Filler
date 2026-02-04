// popup.js
document.getElementById('openOptions').addEventListener('click', () => {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
});

document.getElementById('fillBtn').addEventListener('click', async () => {
    const errorDiv = document.getElementById('error');
    errorDiv.style.display = 'none';

    // Check if key/profile exist
    const data = await chrome.storage.local.get(['gemini_api_key', 'user_profile']);
    if (!data.gemini_api_key || !data.user_profile) {
        errorDiv.textContent = 'Please configure API Key and Profile in Options first.';
        errorDiv.style.display = 'block';
        return;
    }

    // Get active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab.url.includes("docs.google.com/forms")) {
        errorDiv.textContent = 'This is not a Google Form.';
        errorDiv.style.display = 'block';
        return;
    }

    // Inject content script if not already there (Manifest V3 style safety)
    try {
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['content.js']
        });
    } catch (e) {
        // Ignored, might already be injected or constrained
        console.log("Injection attempt:", e);
    }

    // Send message to start
    chrome.tabs.sendMessage(tab.id, {
        action: "START_SCRAPE",
        profile: data.user_profile,
        apiKey: data.gemini_api_key
    }, (response) => {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            errorDiv.textContent = "Error: Refresh the page.";
            errorDiv.style.display = 'block';
        }
    });

    window.close();
});
