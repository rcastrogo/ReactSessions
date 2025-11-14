import i18n from 'i18next';
import i18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import general_en from './local/en/general.json';
import general_es from './local/es/general.json';

const resources = {
  es: {
    general: general_es,
  },
  en: {
    general: general_en,
  },
};

i18n
  .use(i18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    defaultNS: 'general',
    fallbackLng: ['es', 'en'],
    detection: {
      order: ['cookie', 'navigator'],
      lookupCookie: 'i18nextLng',
      cookieOptions: {
        path: '/',
        sameSite: 'lax',
        maxAge: 31536000,
      },
      caches: ['cookie'],
    },
    interpolation: {
      escapeValue: false,
    },
    returnNull: false,
    resources,
  });

export default i18n;
