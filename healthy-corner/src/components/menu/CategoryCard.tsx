'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Category } from '@/types/database'

interface CategoryCardProps {
    category: Category
    itemCount?: number
}

// Map icons to emojis or SVG if not provided
const IconFallback: { [key: string]: string } = {
    'sunrise': '☀️',
    'restaurant': '🍽️',
    'bread': '🍞',
    'bowl': '🥣',
    'leaf': '🥗',
    'cake': '🍰',
    'cup': '🥤',
    'coffee': '☕',
    'burger': '🍔',
    'baby': '👶',
}

export default function CategoryCard({ category, itemCount }: CategoryCardProps) {
    return (
        <Link href={`/categories/${category.slug}`} className="group block">
            <div className="premium-card h-full flex flex-col overflow-hidden">
                {/* Visual Header */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-secondary">
                    {category.image_url ? (
                        <Image
                            src={category.image_url}
                            alt={category.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            sizes="(max-width: 768px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary to-primary/10">
                            <span className="text-5xl transform group-hover:scale-125 transition-transform duration-500">
                                {category.icon && IconFallback[category.icon] ? IconFallback[category.icon] : '🥗'}
                            </span>
                        </div>
                    )}

                    {/* Subtle Overlay */}
                    <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/0 transition-colors duration-500" />
                </div>

                {/* Content Area */}
                <div className="p-6 text-center flex-1 flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-text-main group-hover:text-primary transition-colors duration-300">
                        {category.name}
                    </h3>
                    <div className="flex items-center justify-center gap-2 mt-2">
                        <span className="text-sm font-medium text-text-muted">
                            {itemCount || 0} {itemCount === 1 ? 'Delicious Option' : 'Healthy Choices'}
                        </span>
                    </div>

                    {/* Decorative bar */}
                    <div className="w-8 h-1 bg-primary/20 group-hover:w-16 group-hover:bg-primary mx-auto mt-4 rounded-full transition-all duration-500" />
                </div>
            </div>
        </Link>
    )
}
