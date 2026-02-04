# AutoForm - AI Google Form Filler

**AutoForm** is a private, local-first Chrome Extension that automates the process of filling out Google Forms using your personal data and OpenAI's GPT models. It leverages a user-defined "Master Profile" to intelligently answer questions, saving you time on repetitive applications and surveys.

## Features

-   **Intelligent Autofill**: Uses GPT-4o-mini to map your profile information to form questions.
-   **Local & Private**: Your API key and profile data are stored locally in your browser (`chrome.storage.local`) and are only sent to OpenAI for processing.
-   **Smart Detection**: Automatically identifies text fields, radio buttons, and checkboxes.
-   **Visual Feedback**: Highlights fields in yellow while processing and green when successfully filled.
-   **Manual Review**: Marks uncertain answers for your manual review to ensure accuracy.

## Installation

Since this is a private tool, it is installed in Developer Mode:

1.  **Clone or Download** this repository to your local machine.
2.  Open Google Chrome and navigate to `chrome://extensions/`.
3.  Enable **Developer mode** in the top right corner.
4.  Click **Load unpacked** in the top left.
5.  Select the `chrome-extension` folder from this repository.

## Configuration

Before using AutoForm, you need to configure your API key and profile:

1.  Click the **AutoForm extension icon** in your browser toolbar.
2.  Click **"Open Settings"** (or right-click the icon and select "Options").
3.  **OpenAI API Key**: Enter your valid OpenAI API Key (needs access to `gpt-4o-mini`).
4.  **User Profile**: Paste your resume, bio, or a comprehensive list of your details.
    *   *Tip: Be detailed! Include your full name, email, phone, address, education history, work experience, and common skills.*
5.  Click **Save Settings**.

## Usage

1.  Navigate to any **Google Form** (URL starts with `docs.google.com/forms`).
2.  Click the **AutoForm extension icon**.
3.  Click **"Autofill Form"**.
4.  Wait for the process to complete:
    *   **Yellow Border**: The field is being analyzed.
    *   **Green Border**: The field has been filled.
    *   **Orange Border / Alert**: The AI couldn't confidently answer; please review manually.
5.  **Review** the filled information carefully.
6.  **Submit** the form manually.

## Privacy & Security

-   **Data Storage**: Your OpenAI API Key and User Profile are stored strictly in your browser's local storage.
-   **Data Transmission**: Data is sent directly from your browser to OpenAI's API (`https://api.openai.com/v1/chat/completions`). No intermediate servers are used.
-   **Code**: This extension is built with pure JavaScript (Manifest V3) for transparency and security.

## Troubleshooting

-   **"No questions found"**: Ensure you are on a valid Google Form page. Refresh the page and try again.
-   **API Error**: Check your OpenAI API quota and ensure your API key is correct in the Options page.
-   **Incorrect Answers**: Improve your **User Profile** text. Adding specific keywords or formatting it as a clear list often helps the AI understand your data better.

## License

[MIT License](LICENSE)
