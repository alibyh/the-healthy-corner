'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { APP_NAME, CONTACT_INFO, SOCIAL_LINKS, DESKTOP_NAV_ITEMS, BASE_PATH } from '@/lib/constants'
import { InstagramIcon, FacebookIcon, SnapchatLogo, WhatsAppIcon } from '@/components/ui/SocialIcons'
import { useTranslation } from 'react-i18next'

export default function Footer() {
    const { t } = useTranslation()
    const currentYear = new Date().getFullYear()

    const getNavLabel = (href: string) => {
        if (href === '/') return t('nav.home')
        if (href === '/services') return t('nav.services')
        if (href === '/about') return t('nav.about')
        if (href === '/contact') return t('nav.contact')
        return ''
    }

    return (
        <footer className="bg-text-main text-white py-20 overflow-hidden relative">
            <div className="container-premium relative z-10">
                <div className="flex flex-col items-center text-center">
                    {/* Logo and Tagline */}
                    <Link href="/" className="flex items-center gap-3 mb-8 group">
                        <div className="w-16 h-16 relative overflow-hidden rounded-2xl shadow-2xl scale-125 transition-transform duration-500 group-hover:rotate-12 bg-white">
                            <Image
                                src={`${BASE_PATH}/images/logo.jpg`}
                                alt="Healthy Corner Logo"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </Link>

                    <h3 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tighter flex items-center justify-center gap-2">
                        <span className="text-white font-brand">{t('header.appName').split(' ').slice(0, -1).join(' ')}</span>
                        <span className="text-primary font-brand text-6xl mt-2">{t('header.appName').split(' ').slice(-1)[0]}</span>
                    </h3>
                    <p className="text-white/60 max-w-lg mb-12 text-lg leading-relaxed">
                        {t('footer.craftingFuture')}
                    </p>

                    {/* Navigation Links */}
                    <nav className="flex flex-wrap justify-center gap-x-10 gap-y-4 mb-16 px-4">
                        {DESKTOP_NAV_ITEMS.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-white/80 hover:text-primary font-bold uppercase tracking-widest text-xs transition-colors"
                            >
                                {getNavLabel(item.href)}
                            </Link>
                        ))}
                    </nav>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-5xl mb-20">
                        <div className="flex flex-col items-center group/info">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-xl mb-4 text-primary group-hover/info:bg-primary group-hover/info:text-white transition-all">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            </div>
                            <h4 className="font-bold text-white mb-2">{t('footer.locateUs')}</h4>
                            <p className="text-white/50 text-sm leading-relaxed">{CONTACT_INFO.address}</p>
                        </div>

                        <div className="flex flex-col items-center group/info">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-xl mb-4 text-primary group-hover/info:bg-primary group-hover/info:text-white transition-all relative overflow-hidden">
                                <Image
                                    src={`${BASE_PATH}/images/icons/working_hours.svg`}
                                    alt="Working Hours"
                                    fill
                                    className="object-contain p-2"
                                />
                            </div>
                            <h4 className="font-bold text-white mb-2">{t('footer.hours')}</h4>
                            <p className="text-white/50 text-sm">{t('footer.hoursValue')}</p>
                        </div>

                        <div className="flex flex-col items-center group/info">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-xl mb-4 text-primary group-hover/info:bg-primary group-hover/info:text-white transition-all">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            </div>
                            <h4 className="font-bold text-white mb-2">{t('footer.contact')}</h4>
                            <p className="text-white/50 text-sm">{CONTACT_INFO.phone}</p>
                            <p className="text-white/50 text-sm">{CONTACT_INFO.email}</p>
                        </div>
                    </div>

                    {/* Socials */}
                    <div className="flex gap-6 mb-12">
                        <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-[#E1306C] transition-all hover:-translate-y-1">
                            <InstagramIcon size={24} />
                        </a>
                        <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-[#1877F2] transition-all hover:-translate-y-1">
                            <FacebookIcon size={24} />
                        </a>
                        <a href={SOCIAL_LINKS.snapchat} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-[#FFFC00] hover:text-black transition-all hover:-translate-y-1">
                            <SnapchatLogo size={24} />
                        </a>
                        <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-[#25D366] transition-all hover:-translate-y-1">
                            <WhatsAppIcon size={24} />
                        </a>
                    </div>

                    {/* Copyright */}
                    <div className="pt-10 border-t border-white/10 w-full text-white/30 text-xs font-medium uppercase tracking-[0.3em]">
                        &copy; {currentYear} {APP_NAME}. {t('footer.designForHealth')}
                    </div>
                </div>
            </div>

            {/* Background Decorative Circles */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        </footer>
    )
}
