// options.js
document.addEventListener('DOMContentLoaded', () => {
    // Load saved settings
    chrome.storage.local.get(['gemini_api_key', 'user_profile'], (result) => {
        if (result.gemini_api_key) {
            document.getElementById('apiKey').value = result.gemini_api_key;
        }
        if (result.user_profile) {
            document.getElementById('profile').value = result.user_profile;
        }
    });

    // Save settings
    document.getElementById('save').addEventListener('click', () => {
        const apiKey = document.getElementById('apiKey').value.trim();
        const profile = document.getElementById('profile').value.trim();

        chrome.storage.local.set({
            gemini_api_key: apiKey,
            user_profile: profile
        }, () => {
            const status = document.getElementById('status');
            status.textContent = 'Settings saved.';
            setTimeout(() => {
                status.textContent = '';
            }, 2000);
        });
    });
});
