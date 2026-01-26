'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import Button from '@/components/ui/Button'
import { BASE_PATH } from '@/lib/constants'

const HERO_IMAGE = `${BASE_PATH}/images/leaf-hero-bg.jpg`

export default function HomeContent() {
  const { t } = useTranslation()

  return (
    <div className="bg-background">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] md:min-h-[85vh] flex items-center overflow-hidden bg-secondary">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_IMAGE}
            alt="The Healthy Corner Hero"
            fill
            className="object-cover opacity-70 md:opacity-80 scale-105 group-hover:scale-100 transition-transform duration-[20s] ease-out"
            priority
          />
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 md:via-background/40 to-transparent" />
          {/* Animated gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 animate-pulse-slow" />
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float hidden lg:block" />
        <div className="absolute bottom-32 left-10 w-24 h-24 bg-accent/10 rounded-full blur-2xl animate-float-delayed hidden lg:block" />

        <div className="container-premium relative z-20">
          <div className="max-w-2xl animate-reveal">
            

            {/* Enhanced heading with better typography */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-text-main mb-6 leading-[1.05] tracking-tight">
              <span className="block mb-2">{t('home.fuelingYourHealthyJourney')}</span>
              <span className="block text-primary italic font-brand relative">
                {t('home.healthyJourney')}
                {/* Decorative underline */}
                <span className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full opacity-60" />
              </span>
            </h1>

            {/* Enhanced description */}
            <p className="text-base sm:text-lg md:text-xl text-text-body mb-10 leading-relaxed font-medium max-w-xl relative pl-4 border-l-4 border-primary/30">
              {t('home.transparentNutrition')}
            </p>

            {/* Enhanced CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 relative z-10">
              <Link href="/search" className="group/btn">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto rounded-full px-8 md:px-10 py-4 md:py-5 shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden"
                >
                  <span className="relative z-10">{t('home.exploreOurMenu')}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                </Button>
              </Link>
              <Link href="/services" className="group/btn">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto rounded-full px-8 md:px-10 py-4 md:py-5 border-2 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm bg-white/80"
                >
                  {t('home.ourServices')}
                </Button>
              </Link>
            </div>

            {/* Stats or trust indicators */}
            <div className="mt-12 flex flex-wrap gap-6 text-sm text-text-muted">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold">100% Fresh</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="font-semibold">Transparent Nutrition</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 animate-bounce opacity-40 hover:opacity-70 transition-opacity">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-widest">Scroll</span>
          <svg className="w-6 h-6 text-text-main" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>
    </div>
  )
}
