'use client'

import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function CategoriesHeader() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
      <div className="max-w-2xl">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4">{t('home.curatedNutrition')}</h2>
        <p className="text-lg text-text-muted">{t('home.curatedNutritionDesc')}</p>
      </div>
      <Link href="/search" className="text-primary font-bold hover:underline flex items-center gap-2 group transition-all">
        {t('common.viewFullMenu')} <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
      </Link>
    </div>
  )
}
