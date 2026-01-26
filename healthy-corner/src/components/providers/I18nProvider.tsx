'use client'

import { useEffect } from 'react'
import { I18nextProvider, useTranslation } from 'react-i18next'
import i18n from '@/lib/i18n'

function LanguageSync() {
  const { i18n: i18nInstance } = useTranslation()

  useEffect(() => {
    // Update HTML attributes when language changes
    const updateAttributes = () => {
      const currentLang = i18nInstance.language || 'en'
      document.documentElement.lang = currentLang
      document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr'
    }

    // Set initial attributes
    updateAttributes()

    // Listen for language changes
    i18nInstance.on('languageChanged', updateAttributes)

    return () => {
      i18nInstance.off('languageChanged', updateAttributes)
    }
  }, [i18nInstance])

  return null
}

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <LanguageSync />
      {children}
    </I18nextProvider>
  )
}
