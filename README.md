# CHAT — Personal Assistant

CHAT is a mobile-friendly personal assistant designed to run in a browser on your device.

## Current features

- Local conversation history with search
- Personal notes/memories stored in this browser
- Reminders with Done, Undo and Delete controls
- JSON backup and restore for conversations, memories and reminders
- Basic arithmetic calculator
- Built-in offline knowledge for selected school and general topics
- Optional speech input and speech output where the browser supports them
- System checks for browser capabilities and local data
- Optional downloadable on-device language model

## Open CHAT

Open the GitHub Pages website for this repository after Pages has been enabled in the repository settings:

https://derrickgyamfi146-ui.github.io/chat-assistant/

If the page does not open, check **Repository → Settings → Pages** and confirm that Pages is published from the intended branch and folder.

## First-time offline AI setup

The optional AI model is not included in this GitHub repository. In CHAT, use **Download & prepare AI** only when you have a reliable Wi-Fi connection and enough free device storage.

- The selected 4-bit model weights are approximately 182 MB; additional tokenizer, configuration and runtime files may also be downloaded.
- Keep CHAT open during setup.
- The browser may use WebGPU or a slower CPU/WASM mode, depending on device support.
- After a successful download, the browser may reuse cached model files for offline sessions. Offline reuse depends on browser storage and cache behaviour; it has not been verified on every Android device.
- This is a small model and is not as capable as a large cloud assistant. It can make mistakes.
- Do not start the download on mobile data unless you intentionally want to use that data.

If setup fails, the built-in offline tools remain available. CHAT does not use a paid AI API or require an API key.

## Important limitations

- Memories, reminders and chat history are stored in the browser's local storage on that device. They do not automatically sync to another phone or browser.
- Use **Back up data** regularly and keep the downloaded JSON file somewhere safe. Use **Restore backup** to bring it back.
- Do not clear browser/site storage or uninstall/reset the browser before backing up; doing so can erase local CHAT data.
- Reminders are checked while the CHAT page is open. This version does not guarantee background reminders after the browser is closed.
- Microphone input, notifications, file downloads and offline AI support depend on the browser and device. Run **System check** and test the features on the target phone.
- A browser capability check does not prove that a feature works end-to-end.

## Privacy

CHAT's built-in notes, reminders and conversation history are stored locally in the browser. The optional model is downloaded from Hugging Face when you choose to set it up. No cloud chat API is configured in this project.

## Version

Current interface label: **CHAT v1.0**.
