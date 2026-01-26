'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { BASE_PATH } from '@/lib/constants'

const HERO_IMAGE = `${BASE_PATH}/images/leaf-hero-bg.jpg`

export default function PreFooterCTA() {
  const { t } = useTranslation()

  return (
    <section className="container-premium py-24 md:py-32">
      <div className="bg-primary rounded-[3rem] p-8 md:p-20 relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center gap-16 group">
        {/* Background Image/Overlay */}
        <div className="absolute inset-0 opacity-10 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out">
          <Image
            src={HERO_IMAGE}
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary-dark/90" />

        <div className="relative z-10 flex-1 text-center lg:text-left">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-bold uppercase tracking-[0.2em] mb-6">
            {t('home.visitNouakchottFinest')}
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-none tracking-tighter">
            {t('home.readyToEatBetter')} <br />
            <span className="text-accent italic">{t('home.better')}</span>
          </h2>
          <p className="text-xl text-white/80 mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
            {t('home.readyToEatDesc')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto lg:mx-0">
            <div className="flex items-center gap-4 text-white group/item">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-2xl group-hover/item:bg-accent group-hover/item:text-primary-dark transition-all duration-300">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-widest font-black text-white/50">{t('home.ourLocation')}</span>
                <span className="font-bold text-sm leading-tight max-w-[200px]">in front of Chighali mosque -- Tevragh Zeina</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white group/item">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-2xl group-hover/item:bg-accent group-hover/item:text-primary-dark transition-all duration-300 relative overflow-hidden">
                <Image
                  src={`${BASE_PATH}/images/icons/working_hours.svg`}
                  alt="Working Hours"
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-widest font-black text-white/50">{t('home.serviceHours')}</span>
                <span className="font-bold text-lg">{t('home.everyDayHours')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full lg:w-auto text-center lg:text-right">
          <Link href="/contact" className="inline-block">
            <div className="relative group/order p-4">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl opacity-0 group-hover/order:opacity-100 transition-all duration-700" />

              <button className="w-64 h-64 rounded-full bg-white flex flex-col items-center justify-center shadow-2xl relative z-10 transform group-hover/order:scale-105 transition-all duration-500 overflow-hidden ring-8 ring-white/10 group-hover:ring-accent/30">
                <span className="text-primary-dark font-black uppercase tracking-[0.4em] text-[11px] mb-3 opacity-90">{t('home.nowServing')}</span>
                <span className="text-6xl font-brand text-primary leading-none">{t('home.orderNow')}</span>

                {/* Interactive fill */}
                <div className="absolute inset-0 bg-accent transform translate-y-full group-hover/order:translate-y-0 transition-transform duration-500 -z-10" />
              </button>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
