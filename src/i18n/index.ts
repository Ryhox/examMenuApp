import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import de from './de.json';
import it from './it.json';
import en from './en.json';

export type Language = 'de' | 'it' | 'en';

const deviceLocale = Localization.getLocales()[0]?.languageCode ?? 'de';
const supported: Language[] = ['de', 'it', 'en'];
const defaultLang: Language = supported.includes(deviceLocale as Language)
  ? (deviceLocale as Language)
  : 'de';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    resources: {
      de: { translation: de },
      it: { translation: it },
      en: { translation: en },
    },
    lng: defaultLang,
    fallbackLng: 'de',
    interpolation: { escapeValue: false },
  });

export default i18n;
