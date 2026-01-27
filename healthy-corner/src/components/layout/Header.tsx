'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { DESKTOP_NAV_ITEMS, BASE_PATH } from '@/lib/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'
import MobileMenu from './MobileMenu'

export default function Header() {
    const pathname = usePathname()
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { t } = useTranslation()

    // Handle scroll for glassmorphism effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Map navigation items to translation keys
    const getNavLabel = (href: string) => {
        if (href === '/') return t('nav.home')
        if (href === '/services') return t('nav.services')
        if (href === '/about') return t('nav.about')
        if (href === '/contact') return t('nav.contact')
        return ''
    }

    return (
        <>
            <header className={cn(
                "sticky top-0 z-50 transition-all duration-300",
                scrolled
                    ? "bg-white/80 backdrop-blur-md shadow-premium py-2"
                    : "bg-background py-2 border-b border-secondary-dark/10"
            )}>
                <div className="container-premium flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 md:w-12 md:h-12 relative overflow-hidden rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-500 bg-white">
                            <Image
                                src={`${BASE_PATH}/images/logo.jpg`}
                                alt="Healthy Corner Logo"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg md:text-2xl font-brand text-text-main leading-none">
                                {t('header.appName')}
                            </span>
                            <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-black text-primary leading-none">{t('header.tagline')}</span>
                        </div>
                    </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-1">
                    {DESKTOP_NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "px-5 py-2 rounded-full font-bold text-sm transition-all relative overflow-hidden group",
                                    isActive
                                        ? "text-primary"
                                        : "text-text-body hover:text-primary"
                                )}
                            >
                                {getNavLabel(item.href)}
                                {isActive && (
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                                )}
                            </Link>
                        )
                    })}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2 md:gap-3">
                    {/* Language Switcher */}
                    <LanguageSwitcher />

                    {/* Cart Icon */}
                    <Link
                        href="/cart"
                        className="p-2.5 rounded-full hover:bg-secondary transition-colors relative group"
                        aria-label="Shopping Cart"
                    >
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-text-main group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {/* Cart badge - can be connected to cart state later */}
                        {/* For now, hidden. Uncomment and connect to cart state when cart functionality is added */}
                        {/* {cartCount > 0 && (
                          <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg">
                            {cartCount}
                          </span>
                        )} */}
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="lg:hidden p-2.5 rounded-full hover:bg-secondary transition-colors"
                        aria-label={t('nav.menu')}
                    >
                        <svg className="w-6 h-6 text-text-main" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <Link
                        href="/search"
                        className="hidden md:block p-2.5 rounded-full hover:bg-secondary transition-colors group"
                        aria-label={t('common.search')}
                    >
                        <svg className="w-5 h-5 text-text-main group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </Link>

                    <Link
                        href="/favorites"
                        className="hidden md:block p-2.5 rounded-full hover:bg-secondary transition-colors relative group"
                        aria-label={t('common.favorites')}
                    >
                        <svg className="w-5 h-5 text-text-main group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </Link>

                    <Link href="/contact" className="hidden sm:block">
                        <button className="bg-primary hover:bg-primary-dark text-white px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-bold transition-all shadow-lg shadow-primary/20">
                            {t('header.orderNow')}
                        </button>
                    </Link>
                </div>
            </div>
        </header>

        {/* Mobile Menu */}
        <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        </>
    )
}
