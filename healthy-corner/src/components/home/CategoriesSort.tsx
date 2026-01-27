'use client'

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

type SortOption = 'default' | 'name-asc' | 'name-desc' | 'items-asc' | 'items-desc'

interface CategoriesSortProps {
  onSortChange?: (sortBy: SortOption) => void
}

export default function CategoriesSort({ onSortChange }: CategoriesSortProps) {
  const { t } = useTranslation()
  const [sortBy, setSortBy] = useState<SortOption>('default')
  const [isOpen, setIsOpen] = useState(false)

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'default', label: t('common.default') || 'Default' },
    { value: 'name-asc', label: t('common.nameAsc') || 'Name (A-Z)' },
    { value: 'name-desc', label: t('common.nameDesc') || 'Name (Z-A)' },
    { value: 'items-asc', label: t('common.itemsAsc') || 'Items (Low to High)' },
    { value: 'items-desc', label: t('common.itemsDesc') || 'Items (High to Low)' },
  ]

  const handleSortChange = (value: SortOption) => {
    setSortBy(value)
    setIsOpen(false)
    if (onSortChange) {
      onSortChange(value)
    }
  }

  const currentLabel = sortOptions.find(opt => opt.value === sortBy)?.label || sortOptions[0].label

  return (
    <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
      <span className="text-sm font-semibold text-text-muted">{t('common.orderBy')}</span>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          <span>{currentLabel}</span>
          <svg className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
            <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[180px] z-20">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSortChange(option.value)}
                  className={cn(
                    "w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors",
                    sortBy === option.value && "bg-primary/10 text-primary font-semibold"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
