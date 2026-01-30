'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { BASE_PATH } from '@/lib/constants'
import { cn } from '@/lib/utils'

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
]

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 rounded-full hover:bg-secondary transition-colors group relative"
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <div className="w-5 h-5 relative">
          <Image
            src={`${BASE_PATH}/images/icons/language-icon.svg`}
            alt="Language"
            width={20}
            height={20}
            className="object-contain"
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 rtl:left-0 rtl:right-auto top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[150px] z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={cn(
                "w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors flex items-center gap-3",
                i18n.language === language.code && "bg-primary/10 text-primary font-semibold"
              )}
            >
              <span className="text-xl">{language.flag}</span>
              <span className="text-sm">{language.name}</span>
              {i18n.language === language.code && (
                <span className="ml-auto text-primary">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
