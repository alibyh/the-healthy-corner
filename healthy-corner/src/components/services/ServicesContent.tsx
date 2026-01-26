'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { APP_NAME, BASE_PATH } from '@/lib/constants'
import Button from '@/components/ui/Button'

// Refined icons mapping with SVGs
const IconMap: { [key: string]: React.ReactNode } = {
  'utensils': <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>,
  'shopping-bag': <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>,
  'calendar': <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  'dumbbell': <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>,
  'baby': <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  'cog': <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
}

interface ServicesContentProps {
  services: any[]
}

export default function ServicesContent({ services }: ServicesContentProps) {
  const { t } = useTranslation()

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* --- EDITORIAL HERO SECTION --- */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-text-main">
        <div className="absolute inset-0 z-0">
          <Image
            src={`${BASE_PATH}/images/hero.jpg`}
            alt="Our Services Background"
            fill
            className="object-cover opacity-30 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-text-main/70 to-text-main" />
        </div>

        <div className="container-premium relative z-10 text-center animate-reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary-light text-xs font-bold uppercase tracking-[0.3em] mb-6 shadow-xl backdrop-blur-sm">
            {t('services.totalWellness')}
          </span>
          <h1 className="text-6xl md:text-9xl font-brand text-white mb-6 tracking-tighter leading-none">
            {t('services.ourServices')} <span className="text-primary mt-2 block md:inline">{t('services.services')}</span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
            {t('services.servicesDesc', { appName: APP_NAME })}
          </p>
        </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-full opacity-[0.03] pointer-events-none transform -rotate-12 -translate-x-20">
          <Image
            src={`${BASE_PATH}/images/logo.jpg`}
            alt="Background Logo"
            fill
            className="object-contain"
          />
        </div>

        <div className="container-premium relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="animate-reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="premium-card h-full p-10 flex flex-col group hover:bg-primary transition-all duration-700 ease-out border-b-8 border-transparent hover:border-accent">
                  <div className="w-20 h-20 bg-primary/5 rounded-[2rem] flex items-center justify-center text-5xl mb-8 group-hover:bg-white group-hover:scale-110 transition-all duration-500 shadow-inner">
                    {service.icon && IconMap[service.icon] ? IconMap[service.icon] : '🥗'}
                  </div>
                  <h3 className="text-3xl font-black text-text-main mb-6 group-hover:text-white transition-colors leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-lg text-text-muted leading-relaxed group-hover:text-white/80 transition-colors flex-1 font-medium">
                    {service.description}
                  </p>
                  <div className="mt-8 flex items-center gap-2 text-primary group-hover:text-accent font-black uppercase tracking-widest text-xs transition-colors translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-500">
                    {t('common.learnMore')} <span className="text-lg">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PREMIUM CALL TO ACTION --- */}
      <section className="container-premium mt-12 mb-20">
        <div className="bg-accent rounded-[3.5rem] p-12 md:p-24 flex flex-col lg:flex-row items-center justify-between gap-16 overflow-hidden relative group shadow-2xl">
          <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-[0.03] transition-opacity duration-1000" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="relative z-10 text-center lg:text-left max-w-2xl">
            <span className="text-primary-dark/60 font-black uppercase tracking-[0.2em] text-sm mb-6 block">{t('services.readyToTransform')}</span>
            <h2 className="text-5xl md:text-7xl font-black text-primary-dark mb-8 leading-[1.1] tracking-tighter">
              {t('services.startYourHealth')} <br />
              <span className="text-white italic font-brand text-8xl">{t('services.journey')}</span>
            </h2>
            <p className="text-xl text-primary-dark/80 mb-12 font-medium leading-relaxed">
              {t('services.startJourneyDesc')}
            </p>
            <Link href="/contact">
              <Button size="lg" className="h-20 rounded-2xl px-12 text-2xl font-black shadow-2xl hover:scale-105 active:scale-95 transition-all bg-primary-dark text-white border-none">
                {t('services.getInTouch')}
              </Button>
            </Link>
          </div>

          <div className="relative z-10 w-full md:w-2/5 lg:w-1/3">
            <div className="aspect-square bg-white/20 backdrop-blur-3xl rounded-[3rem] flex items-center justify-center shadow-2xl p-12 ring-1 ring-white/30 transform -rotate-6 group-hover:rotate-0 transition-transform duration-700">
              <svg className="w-40 h-40 text-white drop-shadow-2xl" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.5V4m-2 2a2 2 0 104 0M9 10h6" />
              </svg>
            </div>
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-primary rounded-2xl opacity-20 animate-bounce-slow" />
            <div className="absolute -bottom-10 -right-4 w-24 h-24 bg-white rounded-full opacity-30 animate-pulse" />
          </div>
        </div>
      </section>
    </div>
  )
}
