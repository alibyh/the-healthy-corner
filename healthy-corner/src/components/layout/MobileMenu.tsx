'use client'

import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { DESKTOP_NAV_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()
  const { t, i18n } = useTranslation()
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const languageMenuRef = useRef<HTMLDivElement>(null)

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ]

  // Close menu when route changes
  useEffect(() => {
    if (isOpen) {
      onClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setShowLanguageMenu(false)
      }
    }

    if (showLanguageMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showLanguageMenu])

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode)
    setShowLanguageMenu(false)
  }

  const getNavLabel = (href: string) => {
    if (href === '/') return t('nav.home')
    if (href === '/services') return t('nav.services')
    if (href === '/about') return t('nav.about')
    if (href === '/contact') return t('nav.contact')
    return ''
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Slide-out menu */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Enhanced Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-text-main">{t('nav.menu')}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors active:scale-95"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-6">
            <div className="space-y-3 px-4">
              {DESKTOP_NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "block px-6 py-4 rounded-2xl font-bold text-base transition-all relative overflow-hidden group",
                      isActive
                        ? "bg-primary text-white shadow-lg shadow-primary/30"
                        : "text-text-body hover:bg-gray-50 hover:shadow-md"
                    )}
                  >
                    {getNavLabel(item.href)}
                    {isActive && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
                    {!isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Additional Links */}
            <div className="mt-8 px-4 space-y-3 border-t border-gray-200 pt-6">
              <Link
                href="/search"
                onClick={onClose}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl text-text-body hover:bg-gray-50 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <span className="font-semibold">{t('nav.search')}</span>
              </Link>
              <Link
                href="/favorites"
                onClick={onClose}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl text-text-body hover:bg-gray-50 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <span className="font-semibold">{t('nav.favorites')}</span>
              </Link>

              {/* Language Option */}
              <div className="relative" ref={languageMenuRef}>
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-text-body hover:bg-gray-50 hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                  </div>
                  <span className="font-semibold flex-1 text-left">{t('common.language')}</span>
                  <svg className={cn("w-5 h-5 transition-transform", showLanguageMenu && "rotate-180")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showLanguageMenu && (
                  <div className="mt-2 ml-16 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        className={cn(
                          "w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors flex items-center gap-3",
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

              {/* Account/Sign Up Option */}
              <button
                onClick={() => {
                  // Placeholder for future sign up functionality
                  onClose()
                }}
                className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-text-body hover:bg-gray-50 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="font-semibold">{t('common.account')}</span>
              </button>

              <Link
                href="/contact"
                onClick={onClose}
                className="flex items-center justify-center gap-3 px-6 py-5 rounded-2xl bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary transition-all font-bold shadow-lg shadow-primary/30 hover:shadow-xl hover:scale-[1.02] active:scale-95"
              >
                <span>{t('header.orderNow')}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
