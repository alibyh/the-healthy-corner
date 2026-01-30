import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enTranslations from '@/locales/en.json'
import arTranslations from '@/locales/ar.json'
import frTranslations from '@/locales/fr.json'

// Only initialize if not already initialized
if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          translation: enTranslations,
        },
        ar: {
          translation: arTranslations,
        },
        fr: {
          translation: frTranslations,
        },
      },
      fallbackLng: 'en',
      supportedLngs: ['en', 'ar', 'fr'],
      defaultNS: 'translation',
      interpolation: {
        escapeValue: false, // React already escapes values
      },
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
      },
    })
}

export default i18n
