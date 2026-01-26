'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MOBILE_NAV_ITEMS } from '@/lib/constants'
import { useTranslation } from 'react-i18next'

export default function MobileNav() {
    const pathname = usePathname()
    const { t } = useTranslation()

    const getNavLabel = (icon: string) => {
        if (icon === 'menu') return t('nav.menu')
        if (icon === 'search') return t('nav.search')
        if (icon === 'heart') return t('nav.favorites')
        if (icon === 'info') return t('nav.info')
        return ''
    }

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[rgb(var(--color-surface))] border-t border-[rgb(var(--color-secondary))] shadow-lg mobile-safe z-50">
            <div className="flex justify-around items-center h-16">
                {MOBILE_NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${isActive ? 'text-[rgb(var(--color-primary))]' : 'text-[rgb(var(--color-text-secondary))]'
                                }`}
                        >
                            {/* Icons */}
                            {item.icon === 'menu' && (
                                <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                            {item.icon === 'search' && (
                                <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            )}
                            {item.icon === 'heart' && (
                                <svg className="w-6 h-6 mb-1" fill={isActive ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            )}
                            {item.icon === 'info' && (
                                <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )}

                            <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>
                                {getNavLabel(item.icon)}
                            </span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
