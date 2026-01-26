'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MenuItem } from '@/types/database'
import { formatPrice } from '@/lib/utils'
import { PLACEHOLDER_FOOD_IMAGE } from '@/lib/constants'

interface MenuItemCardProps {
    item: MenuItem
    onFavoriteToggle?: (itemId: string) => void
    isFavorite?: boolean
}

export default function MenuItemCard({ item, onFavoriteToggle, isFavorite = false }: MenuItemCardProps) {
    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (onFavoriteToggle) onFavoriteToggle(item.id)
    }

    return (
        <Link href={`/menu/${item.slug}`} className="group block h-full">
            <div className="premium-card h-full flex flex-col overflow-hidden relative">
                {/* Favorite Button Overlay */}
                <button
                    onClick={handleFavoriteClick}
                    className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full glass-morphism flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
                    aria-label="Toggle Favorite"
                >
                    <svg
                        className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-error text-error' : 'text-text-main'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                </button>

                {/* Image Container */}
                <div className="relative w-full aspect-[16/10] bg-secondary overflow-hidden">
                    <Image
                        src={item.image_url || PLACEHOLDER_FOOD_IMAGE}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-1000"
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />

                    {/* Tags */}
                    <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
                        {item.is_vegetarian && (
                            <span className="px-2 py-0.5 glass-morphism text-[10px] font-bold uppercase tracking-wider text-primary rounded-md">
                                Vegetarian
                            </span>
                        )}
                        {item.is_high_protein && (
                            <span className="px-2 py-0.5 glass-morphism text-[10px] font-bold uppercase tracking-wider text-error rounded-md">
                                High Protein
                            </span>
                        )}
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-3 gap-2">
                        <h3 className="text-lg font-bold text-text-main line-clamp-1 group-hover:text-primary transition-colors">
                            {item.name}
                        </h3>
                        <span className="text-lg font-extrabold text-primary whitespace-nowrap">
                            {formatPrice(item.price, item.currency)}
                        </span>
                    </div>

                    <p className="text-xs text-text-muted mb-5 line-clamp-2 leading-relaxed flex-1">
                        {item.description || 'Nutritiously balanced meal prepared with fresh ingredients.'}
                    </p>

                    {/* Nutrition Info Strip */}
                    <div className="flex items-center justify-between pt-4 border-t border-secondary-dark/30">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-text-muted uppercase tracking-tighter">Energy</span>
                            <span className="text-sm font-black text-primary">{item.calories || 0}<span className="text-[10px] font-normal ml-0.5">kcal</span></span>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex flex-col items-end">
                                <span className="text-[8px] font-bold text-text-muted uppercase tracking-tighter">Pro</span>
                                <span className="text-xs font-bold text-text-main">{item.protein || 0}g</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[8px] font-bold text-text-muted uppercase tracking-tighter">Carb</span>
                                <span className="text-xs font-bold text-text-main">{item.carbs || 0}g</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[8px] font-bold text-text-muted uppercase tracking-tighter">Fat</span>
                                <span className="text-xs font-bold text-text-main">{item.fats || 0}g</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
