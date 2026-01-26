'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import Button from '@/components/ui/Button'
import { BASE_PATH } from '@/lib/constants'

const HERO_IMAGE = `${BASE_PATH}/images/hero.jpg`

export default function HomeContent() {
  const { t } = useTranslation()

  return (
    <div className="bg-background">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-secondary">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_IMAGE}
            alt="The Healthy Corner Hero"
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        </div>

        <div className="container-premium relative z-20">
          <div className="max-w-xl animate-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              {t('home.experienceTheDifference')}
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-text-main mb-6 leading-[1.1]">
              {t('home.fuelingYourHealthyJourney')} <br />
              <span className="text-primary italic">{t('home.healthyJourney')}</span>
            </h1>

            <p className="text-lg md:text-xl text-text-body mb-8 leading-relaxed font-medium">
              {t('home.transparentNutrition')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/search">
                <Button size="lg" className="w-full sm:w-auto rounded-full px-10 shadow-xl shadow-primary/20">
                  {t('home.exploreOurMenu')}
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-10">
                  {t('home.ourServices')}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block animate-bounce opacity-30">
          <svg className="w-6 h-6 text-text-main" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>
    </div>
  )
}
