'use client'

import React, { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import MenuItemCard from '@/components/menu/MenuItemCard'
import { MenuItemCardSkeleton } from '@/components/ui/Skeleton'
import { useFavorites } from '@/hooks/useFavorites'
import { MenuItem } from '@/types/database'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { useTranslation } from 'react-i18next'

export default function FavoritesPage() {
    const { t } = useTranslation()
    const { favorites, isLoaded } = useFavorites()
    const [items, setItems] = useState<MenuItem[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        async function fetchFavorites() {
            if (!isLoaded) return

            if (favorites.length === 0) {
                setItems([])
                setLoading(false)
                return
            }

            setLoading(true)
            try {
                const { data, error } = await supabase
                    .from('menu_items')
                    .select('*')
                    .in('id', favorites)
                    .eq('is_active', true)

                if (error) throw error
                setItems(data || [])
            } catch (error) {
                console.error('Error fetching favorites:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchFavorites()
    }, [favorites, isLoaded])

    if (!isLoaded) return <div className="min-h-screen bg-[rgb(var(--color-background))]" />

    return (
        <div className="min-h-screen bg-[rgb(var(--color-background))]">
            <div className="bg-[rgb(var(--color-surface))] shadow-sm border-b border-[rgb(var(--color-secondary))] py-8 md:py-12 mb-6">
                <div className="container-custom">
                    <h1 className="text-3xl md:text-4xl font-bold text-[rgb(var(--color-text-primary))] mb-3">
                        {t('favorites.yourFavorites')}
                    </h1>
                    <p className="text-[rgb(var(--color-text-secondary))] text-lg">
                        {t('favorites.savedItems')}
                    </p>
                </div>
            </div>

            <div className="container-custom">
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <MenuItemCardSkeleton key={i} />
                        ))}
                    </div>
                ) : items.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {items.map(item => (
                            <div key={item.id} className="animate-fade-in">
                                <MenuItemCard item={item} isFavorite={true} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-[rgb(var(--color-surface))] rounded-xl shadow-sm">
                        <div className="text-5xl mb-4">❤️</div>
                        <h2 className="text-2xl font-bold text-[rgb(var(--color-text-primary))] mb-2">
                            {t('favorites.noFavoritesYet')}
                        </h2>
                        <p className="text-[rgb(var(--color-text-secondary))] mb-8 max-w-md mx-auto">
                            {t('favorites.exploreMenuDesc')}
                        </p>
                        <Link href="/">
                            <Button size="lg">{t('favorites.exploreMenu')}</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
