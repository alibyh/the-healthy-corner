'use client'

import React, { useEffect } from 'react'
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
  const { t } = useTranslation()

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
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-text-main">{t('nav.menu')}</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-6">
            <div className="space-y-2 px-4">
              {DESKTOP_NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "block px-6 py-4 rounded-xl font-bold text-base transition-all",
                      isActive
                        ? "bg-primary text-white"
                        : "text-text-body hover:bg-gray-100"
                    )}
                  >
                    {getNavLabel(item.href)}
                  </Link>
                )
              })}
            </div>

            {/* Additional Links */}
            <div className="mt-8 px-4 space-y-2 border-t border-gray-200 pt-6">
              <Link
                href="/search"
                onClick={onClose}
                className="flex items-center gap-3 px-6 py-4 rounded-xl text-text-body hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="font-medium">{t('nav.search')}</span>
              </Link>
              <Link
                href="/favorites"
                onClick={onClose}
                className="flex items-center gap-3 px-6 py-4 rounded-xl text-text-body hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="font-medium">{t('nav.favorites')}</span>
              </Link>
              <Link
                href="/contact"
                onClick={onClose}
                className="flex items-center gap-3 px-6 py-4 rounded-xl bg-primary text-white hover:bg-primary-dark transition-colors font-bold"
              >
                <span>{t('header.orderNow')}</span>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
