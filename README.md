
# Expressly AI

**Expressly AI** is a Chrome extension designed to enhance your messaging experience on WhatsApp Web. It integrates AI-powered message enhancement directly into WhatsApp's interface, allowing users to refine their messages with custom moods, tones, and prompts. With a sleek and responsive UI inspired by WhatsApp's design, Expressly AI makes communication more expressive and efficient.

---

## Features

- **AI-Powered Message Enhancement**: Refine your messages with AI-generated suggestions.
- **Mood Selection**: Choose from a variety of moods (e.g., Happy 😄, Professional 💼, Casual 😎) to tailor your message.
- **Custom Prompts**: Provide specific instructions for how you want your message to sound.
- **Theme Support**: Switch between light and dark themes for a personalized experience.
- **Responsive UI**: A clean and intuitive interface that integrates seamlessly with WhatsApp Web.
- **Quick Actions**: Accept, discard, or regenerate enhanced messages with a single click.

---

## Screenshots

![Expressly AI Tooltip](screenshots/tooltip.png)  
*The Expressly AI tooltip in action.*

---

## Installation

### Prerequisites
- Google Chrome or any Chromium-based browser.
- A valid OpenAI API key (for AI message enhancement).

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Chebaleomkar/Expressly-AI.git
   cd expressly-ai
   ```

2. **Load the Extension in Chrome**:
   - Open Chrome and go to `chrome://extensions/`.
   - Enable **Developer Mode** (toggle in the top-right corner).
   - Click **Load unpacked** and select the `expressly-ai` directory.

3. **Set Up OpenAI API Key**:
   - Open the extension's popup or options page.
   - Enter your OpenAI API key in the settings.

4. **Open WhatsApp Web**:
   - Navigate to [WhatsApp Web](https://web.whatsapp.com/).
   - Look for the **Expressly AI** icon in the message input area.

---

## Usage

1. **Open the Tooltip**:
   - Click the **Expressly AI** icon in the WhatsApp Web message input area.

2. **Select a Mood**:
   - Choose a mood from the **Moods** tab to set the tone of your message.

3. **Add Custom Prompts**:
   - Switch to the **Prompt** tab and provide specific instructions for your message.

4. **Toggle Themes**:
   - Go to the **Settings** tab to switch between light and dark themes.

5. **Enhance Your Message**:
   - Click **Regenerate** to get AI-enhanced suggestions.
   - Use **Accept** to replace your message or **Discard** to close the tooltip.

---

## Project Structure

```
expressly-ai/
├── manifest.json          # Extension metadata and permissions
├── content.js             # Main script for injecting UI and handling logic
├── styles.css             # Styles for the tooltip and UI elements
├── popup.html             # Popup UI (if needed for settings)
├── icons/                 # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md              # Project documentation
```

---

## Acknowledgments

- Inspired by WhatsApp's elegant UI design.
- Powered by OpenAI's GPT for message enhancement.

---
