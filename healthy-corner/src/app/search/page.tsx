'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import MenuItemCard from '@/components/menu/MenuItemCard'
import { MenuItemCardSkeleton } from '@/components/ui/Skeleton'
import { MenuItem } from '@/types/database'
import { debounce } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

function SearchContent() {
    const { t } = useTranslation()
    const searchParams = useSearchParams()
    const initialQuery = searchParams.get('q') || ''

    const [query, setQuery] = useState(initialQuery)
    const [results, setResults] = useState<MenuItem[]>([])
    const [loading, setLoading] = useState(false)
    const [hasSearched, setHasSearched] = useState(false)

    const supabase = createClient()

    // Search function
    const performSearch = async (searchQuery: string) => {
        if (!searchQuery.trim()) {
            setResults([])
            setHasSearched(false)
            return
        }

        setLoading(true)
        setHasSearched(true)

        try {
            // Simple search implementation
            // For production, consider using a dedicated search index or Postgres Full Text Search
            const { data, error } = await supabase
                .from('menu_items')
                .select('*')
                .eq('is_active', true)
                .or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`)
                .order('name')
                .limit(50)

            if (error) throw error
            setResults(data || [])
        } catch (error) {
            console.error('Search error:', error)
            setResults([])
        } finally {
            setLoading(false)
        }
    }

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (query) {
                performSearch(query)
            } else {
                setResults([])
                setHasSearched(false)
            }
        }, 500)

        return () => clearTimeout(timer)
    }, [query])

    return (
        <div className="min-h-screen bg-[rgb(var(--color-background))]">
            {/* Search Header */}
            <div className="bg-[rgb(var(--color-surface))] shadow-sm sticky top-0 md:relative z-30 pt-4 pb-6 px-4">
                <div className="container-custom max-w-3xl mx-auto">
                    <h1 className="text-2xl font-bold mb-4 text-[rgb(var(--color-text-primary))]">{t('search.searchMenu')}</h1>
                    <div className="relative">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={t('search.searchPlaceholder')}
                            className="w-full px-5 py-3 pl-12 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))] text-lg"
                            autoFocus
                        />
                        <svg
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        {query && (
                            <button
                                onClick={() => setQuery('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="container-custom max-w-7xl mx-auto mt-4 md:mt-6 px-4 md:px-6">
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {[...Array(8)].map((_, i) => (
                            <MenuItemCardSkeleton key={i} />
                        ))}
                    </div>
                ) : (
                    <>
                        {hasSearched && results.length > 0 && (
                            <div>
                                <p className="text-[rgb(var(--color-text-secondary))] mb-4 text-sm md:text-base">
                                    {t('search.foundResults', { count: results.length, query })}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                                    {results.map(item => (
                                        <div key={item.id} className="animate-fade-in">
                                            <MenuItemCard item={item} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {hasSearched && results.length === 0 && (
                            <div className="text-center py-20">
                                <div className="text-5xl mb-4">🤔</div>
                                <h3 className="text-xl font-medium text-[rgb(var(--color-text-primary))] mb-2">{t('search.noMatchesFound')}</h3>
                                <p className="text-[rgb(var(--color-text-secondary))]">
                                    {t('search.tryDifferentKeywords')}
                                </p>
                            </div>
                        )}

                        {!hasSearched && (
                            <div className="text-center py-20 opacity-50">
                                <div className="text-5xl mb-4">🔍</div>
                                <p className="text-lg">{t('search.typeToSearch')}</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[rgb(var(--color-background))]" />}>
            <SearchContent />
        </Suspense>
    )
}
