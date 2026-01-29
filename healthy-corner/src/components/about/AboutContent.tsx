'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { BASE_PATH } from '@/lib/constants'
import Button from '@/components/ui/Button'

interface AboutContentProps {
  content: any
  achievements: any[]
}

export default function AboutContent({ content, achievements }: AboutContentProps) {
  const { t } = useTranslation()

  return (
    <div className="bg-background min-h-screen">
      {/* --- PREMIUM HERO SECTION --- */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-text-main">
        <div className="absolute inset-0 z-0">
          <Image
            src={`${BASE_PATH}/images/leaf-hero-bg.jpg`}
            alt="About Us Background"
            fill
            className="object-cover opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-text-main/80 to-text-main" />
        </div>

        <div className="container-premium relative z-10 text-center animate-reveal">
          <h1 className="text-5xl md:text-8xl font-brand mb-6 tracking-tighter leading-none [&>span:first-child]:!text-white">
            <span>{t('about.beyondThePlate')}</span> <br />
            <span className="text-primary">{t('about.plate')}</span>
          </h1>
          <div className="w-24 h-2 bg-primary mx-auto rounded-full" />
        </div>
      </section>

      {/* --- THE STORY --- */}
      <section className="py-24 md:py-32 overflow-hidden">
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] blur-2xl group-hover:bg-primary/10 transition-all duration-700" />
              <div className="relative aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl border border-secondary-dark/10">
                <Image
                  src={`${BASE_PATH}/images/leaf-hero-bg.jpg`}
                  alt="Our Journey"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-accent rounded-full flex flex-col items-center justify-center shadow-2xl border-8 border-background p-4 text-center animate-bounce-slow">
                <span className="text-primary-dark font-black text-4xl leading-none">EST.</span>
                <span className="text-primary-dark font-black text-5xl leading-none">2023</span>
              </div>
            </div>

            <div className="space-y-8 lg:pl-12">
              <h2 className="text-4xl md:text-6xl font-black text-text-main leading-[1.1] tracking-tight">
                {t('about.whereHealthMeetsPassion')} <br />
                <span className="text-primary">{t('about.meetsPassion')}</span>
              </h2>
              <p className="text-xl text-text-body font-medium leading-relaxed italic border-l-4 border-primary pl-6">
                {content.hero || t('about.heroDefault')}
              </p>
              <div className="space-y-6 text-lg text-text-muted leading-relaxed">
                <p>
                  {content.story || t('about.storyDefault')}
                </p>
                <p>
                  {t('about.integrity')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CORE PHILOSOPHY / VALUES --- */}
      <section className="bg-surface py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.03] pointer-events-none transform rotate-12 translate-x-20">
          <Image
            src={`${BASE_PATH}/images/logo.jpg`}
            alt="Background Logo"
            fill
            className="object-contain"
          />
        </div>

        <div className="container-premium relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">{t('about.ourCorePhilosophy')}</h2>
            <p className="text-xl text-text-muted">{content.mission || t('about.missionDefault')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(content.values || ["Transparency", "Integrity", "Innovation", "Sustainability", "Community"]).map((value: string, i: number) => (
              <div key={i} className="premium-card p-10 group hover:bg-primary transition-all duration-500">
                <div className="text-4xl mb-6 group-hover:scale-125 transition-transform duration-500 block text-primary group-hover:text-white">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l2.4 7.2h7.6L15.8 14.4 18.2 22l-6.2-4.6L5.8 22l2.4-7.6L2 9.2h7.6z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">{value}</h3>
                <p className="text-text-muted group-hover:text-white/80 transition-colors">
                  {t('about.commitmentToExcellence')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MILESTONES & ACHIEVEMENTS --- */}
      <section className="py-24 md:py-32">
        <div className="container-premium">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-primary font-black uppercase tracking-[0.2em] text-sm mb-4 block">{t('about.buildingTrust')}</span>
              <h2 className="text-4xl md:text-6xl font-black text-text-main leading-none">{t('about.milestonesRecognition')} <br /><span className="text-primary">{t('about.recognition')}</span></h2>
            </div>
            <p className="text-lg text-text-muted md:max-w-sm">{t('about.milestonesDesc')}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {achievements.map((item, idx) => (
              <div key={item.id} className="relative group">
                <div className="absolute inset-0 bg-primary/5 rounded-3xl group-hover:bg-primary transition-all duration-500" />
                <div className="relative p-8 md:p-10 flex gap-6 items-start">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                    {item.achievement_type === 'award' ? (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    ) : (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-primary font-black text-xl group-hover:text-white transition-colors">{item.year}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-accent group-hover:bg-white" />
                      <span className="text-xs uppercase tracking-widest font-bold text-text-muted group-hover:text-white/50 transition-colors">{item.achievement_type}</span>
                    </div>
                    <h4 className="text-2xl font-bold text-text-main mb-3 group-hover:text-white transition-colors">{item.title}</h4>
                    <p className="text-text-muted group-hover:text-white/80 transition-colors leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="container-premium pb-32">
        <div className="bg-gradient-to-br from-accent via-accent/95 to-primary-dark rounded-[3rem] md:rounded-[4rem] p-12 md:p-20 lg:p-24 text-center relative overflow-hidden group">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/30" />
            
            {/* Floating circles */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-float" />
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-float-delayed" />
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-xl animate-pulse-slow" />
            
            {/* Animated grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
              <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                backgroundSize: '50px 50px'
              }} />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 animate-reveal">

            {/* Enhanced heading */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 md:mb-8 leading-[1.1] tracking-tight relative">
              <span className="block mb-2 animate-fade-in-up">{t('about.bePartOfJourney')}</span>
              <span className="block text-white/90 font-brand italic relative inline-block">
                {t('about.ourJourney')}
                {/* Decorative underline */}
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/50 rounded-full" />
              </span>
            </h2>

            {/* Description text */}
            <p className="text-white/90 text-lg md:text-xl mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              {t('about.togetherWeAreBuildingAHealthierFuture')}
            </p>

            {/* Enhanced CTA Button */}
            <Link href="/contact" className="inline-block group/btn">
              <Button 
                size="lg" 
                className="rounded-full px-10 md:px-14 py-5 md:py-6 text-lg md:text-xl font-bold shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-110 active:scale-95 relative overflow-hidden bg-white text-primary-dark border-2 border-white hover:border-white/80 group-hover/btn:bg-white/95"
              >
                <span className="relative z-10 flex items-center gap-3 text-primary-dark">
                  {t('about.contactUsToday')}
                  <svg className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-white to-white/50 opacity-0 group-hover/btn:opacity-30 blur-xl transition-opacity duration-500" />
              </Button>
            </Link>

            {/* Decorative elements */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="font-semibold">{t('about.joinOurCommunity')}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/50" />
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold">{t('about.twentyFourSevenSupport')}</span>
              </div>
            </div>
          </div>

          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>
      </section>
    </div>
  )
}
