# JCR Guide Pro — Android Studio Project

This directory contains the ready-to-build Android Studio project for **JCR Guide Pro**.

## Quick Start in Android Studio

1. **Open Android Studio**:
   - Click **Open** (or `File > Open...`).
   - Navigate to the unzipped project folder and select the `android/` directory (or the project root).
   - Click **OK**.

2. **Gradle Sync**:
   - Android Studio will automatically recognize the Gradle build files and sync the dependencies (`androidx.webkit`, `material`, `appcompat`, `swiperefreshlayout`).
   - If prompted to upgrade Gradle or Android Gradle Plugin (AGP), click **Accept / Upgrade**.

3. **Run on Device or Emulator**:
   - Select an Android Virtual Device (AVD with API 24+ / Android 7.0+) or connect an Android physical device with USB Debugging enabled.
   - Click the green **Run** button (▶) or press `Shift + F10`.

4. **Build Standalone APK**:
   - In the top menu, go to `Build > Build Bundle(s) / APK(s) > Build APK(s)`.
   - Once compilation finishes, click **locate** in the popup to retrieve `app-debug.apk`.
   - Transfer and install `app-debug.apk` onto any Android phone or tablet for bench-side usage!

## Features in Android Build:
- Full offline support with LocalStorage & IndexedDB caching for all 624 repair guides.
- Multimeter voltage rail pinouts and hardware diagnostic flowcharts.
- Direct hardware back-button navigation handling in WebView.
- Pull-to-refresh sync gestures.
