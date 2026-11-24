# CHAT Android app

This folder contains the native Android application. The existing GitHub Pages app remains unchanged.

## Build

GitHub Actions builds a debug APK on a hosted runner. No Android SDK is installed on the phone.

1. Open the repository's Actions tab.
2. Select **Build CHAT Android APK**.
3. Run the workflow on the `native-android-chat` branch.
4. When it succeeds, download the `CHAT-debug-apk` artifact.
5. Extract the ZIP and install `app-debug.apk` on the Android phone.

The first screen is only a native shell. Gemini, voice input/output, wake-word detection, notification access, and accessibility actions are not implemented yet. They will be added and tested in separate stages.

## Security and permissions

The initial build requests no microphone, notification-listener, or accessibility permissions. These will be introduced only when the matching feature is implemented and explained. Never commit API keys or passwords to this repository.

## Build compatibility

- Java 17
- Android Gradle Plugin 8.7.3
- Kotlin 2.0.21
- Android SDK 35
- Minimum Android 8.0 (API 26)
