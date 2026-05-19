# Campedèl-Hof 🍽️🍷

A modern, cross-platform digital menu application (Speisekarte) built for the **Campedèl-Hof**. The app displays food, drinks, wines, and allergens in a beautiful, easy-to-navigate interface.

## 🌟 Features

- **Multi-Platform Support:** Runs seamlessly on iOS, Android, and Web.
- **Internationalization (i18n):** Full multi-language support (German, English, Italian) with automatic device locale detection.
- **Interactive Menu:** Browse through categorized food items, drinks, and a dedicated wine selection.
- **Allergen Information:** Clear and accessible allergen badges and lists for dietary requirements.
- **Modern UI/UX:** Built with performant image loading, haptic feedback, and smooth navigation.

## 🛠️ Tech Stack

- **Framework:** [React Native](https://reactnative.dev/) & [Expo](https://expo.dev/) (SDK 54)
- **Language:** TypeScript
- **Navigation:** [React Navigation v7](https://reactnavigation.org/) (Tabs & Native Stack)
- **Localization:** `i18next`, `react-i18next`, and `expo-localization`
- **UI & Assets:** `@expo/vector-icons`, `expo-image`, `expo-linear-gradient`

## 📂 Project Structure

```text
src/
├── components/   # Reusable UI components (Cards, Headers, Badges)
├── context/      # React contexts for global state management
├── data/         # Static data models (menu, drinks, wines, allergens)
├── i18n/         # Language files (de.json, en.json, it.json) & config
├── navigation/   # Stack and Tab navigators
├── screens/      # Main application views (Home, Menu, Drinks, Wine, Details)
├── services/     # API calls and external services
├── theme/        # Global styling, colors, and typography
└── utils/        # Helper functions (e.g., price formatting)
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- Expo Go app on your physical device (optional, for quick testing)

### Installation

1. Clone the repository and navigate to the project folder:
   ```bash
   cd SpeisekarteApp
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npx expo start
   ```

4. Open the app:
   - Press `a` to open in Android Emulator
   - Press `i` to open in iOS Simulator
   - Press `w` to open in your Web Browser
   - Scan the QR code with your phone's camera (iOS) or the Expo Go app (Android) to view it on a physical device.

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Starts the Expo development server. |
| `npm run reset-project` | Resets the Expo project to a clean state. |
| `npm run web` | Starts the Expo server specifically for web. |

## 📄 License

This project is proprietary and confidential. All rights reserved by Campedèl-Hof.
