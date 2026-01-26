'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { APP_NAME, CONTACT_INFO, SOCIAL_LINKS, DESKTOP_NAV_ITEMS } from '@/lib/constants'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-text-main text-white py-20 overflow-hidden relative">
            <div className="container-premium relative z-10">
                <div className="flex flex-col items-center text-center">
                    {/* Logo and Tagline */}
                    <Link href="/" className="flex items-center gap-3 mb-8 group">
                        <div className="w-16 h-16 relative overflow-hidden rounded-2xl shadow-2xl scale-125 transition-transform duration-500 group-hover:rotate-12 bg-white">
                            <Image
                                src="/images/logo.jpg"
                                alt="Healthy Corner Logo"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </Link>

                    <h3 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tighter flex items-center justify-center gap-2">
                        <span className="text-white font-brand">The Healthy</span>
                        <span className="text-primary font-brand text-6xl mt-2">Corner</span>
                    </h3>
                    <p className="text-white/60 max-w-lg mb-12 text-lg leading-relaxed">
                        Crafting the future of transparent nutrition. Every meal is a step towards a better, more balanced you.
                    </p>

                    {/* Navigation Links */}
                    <nav className="flex flex-wrap justify-center gap-x-10 gap-y-4 mb-16 px-4">
                        {DESKTOP_NAV_ITEMS.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-white/80 hover:text-primary font-bold uppercase tracking-widest text-xs transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-5xl mb-20">
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-xl mb-4 text-primary">📍</div>
                            <h4 className="font-bold text-white mb-2">Locate Us</h4>
                            <p className="text-white/50 text-sm leading-relaxed">{CONTACT_INFO.address}</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-xl mb-4 text-primary">🕒</div>
                            <h4 className="font-bold text-white mb-2">Hours</h4>
                            <p className="text-white/50 text-sm">Mon - Sun: 8:00 AM - 11:00 PM</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-xl mb-4 text-primary">📞</div>
                            <h4 className="font-bold text-white mb-2">Contact</h4>
                            <p className="text-white/50 text-sm">{CONTACT_INFO.phone}</p>
                            <p className="text-white/50 text-sm">{CONTACT_INFO.email}</p>
                        </div>
                    </div>

                    {/* Socials */}
                    <div className="flex gap-6 mb-12">
                        <a href={SOCIAL_LINKS.instagram} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-xl hover:bg-primary transition-all hover:-translate-y-1">📸</a>
                        <a href={SOCIAL_LINKS.facebook} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-xl hover:bg-primary transition-all hover:-translate-y-1">👥</a>
                    </div>

                    {/* Copyright */}
                    <div className="pt-10 border-t border-white/10 w-full text-white/30 text-xs font-medium uppercase tracking-[0.3em]">
                        &copy; {currentYear} {APP_NAME}. Design for Health.
                    </div>
                </div>
            </div>

            {/* Background Decorative Circles */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        </footer>
    )
}
