'use client'

import React from 'react'
import Slider from '@/components/ui/Slider'
import { MenuFilter as MenuFilterType } from '@/types/ui'
import { FILTER_OPTIONS, DEFAULT_CALORIE_RANGE, DEFAULT_PRICE_RANGE } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface MenuFilterProps {
    filters: MenuFilterType
    onFilterChange: (filters: MenuFilterType) => void
    totalItems: number
    className?: string
    currency?: string
}

export default function MenuFilter({
    filters,
    onFilterChange,
    totalItems,
    className,
    currency = 'MRU'
}: MenuFilterProps) {

    const handleRangeChange = (type: 'calories' | 'price', value: [number, number]) => {
        onFilterChange({
            ...filters,
            [type === 'calories' ? 'caloriesRange' : 'priceRange']: value
        })
    }

    const handleToggle = (key: keyof MenuFilterType) => {
        onFilterChange({
            ...filters,
            [key]: !filters[key]
        })
    }

    const handleReset = () => {
        onFilterChange({
            caloriesRange: DEFAULT_CALORIE_RANGE,
            priceRange: DEFAULT_PRICE_RANGE,
            isVegetarian: false,
            isVegan: false,
            isGlutenFree: false,
            isHighProtein: false,
            isLowSugar: false,
            searchQuery: ''
        })
    }

    return (
        <div className={cn("bg-white rounded-lg shadow-sm p-4 md:p-6", className)}>
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg text-[rgb(var(--color-text-primary))]">Filters</h3>
                <button
                    onClick={handleReset}
                    className="text-sm text-[rgb(var(--color-primary))] hover:underline"
                >
                    Reset
                </button>
            </div>

            <div className="space-y-6">
                {/* Calories Range */}
                <div>
                    <label className="text-sm font-medium mb-2 block text-[rgb(var(--color-text-secondary))]">
                        Calories (kcal)
                    </label>
                    <Slider
                        min={0}
                        max={1500}
                        step={50}
                        value={filters.caloriesRange}
                        onChange={(val) => handleRangeChange('calories', val)}
                    />
                </div>

                {/* Price Range */}
                <div>
                    <label className="text-sm font-medium mb-2 block text-[rgb(var(--color-text-secondary))]">
                        Price ({currency})
                    </label>
                    <Slider
                        min={0}
                        max={500}
                        step={10}
                        value={filters.priceRange}
                        onChange={(val) => handleRangeChange('price', val)}
                    />
                </div>

                {/* Dietary Preferences */}
                <div>
                    <h4 className="text-sm font-medium mb-3 text-[rgb(var(--color-text-secondary))]">Dietary</h4>
                    <div className="space-y-2">
                        {FILTER_OPTIONS.dietary.map((option) => (
                            <label key={option.value} className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={!!filters[option.value as keyof MenuFilterType]}
                                    onChange={() => handleToggle(option.value as keyof MenuFilterType)}
                                    className="w-4 h-4 rounded border-gray-300 text-[rgb(var(--color-primary))] focus:ring-[rgb(var(--color-primary))]"
                                />
                                <span className="text-sm text-[rgb(var(--color-text-primary))] group-hover:text-[rgb(var(--color-primary))] transition-colors">
                                    {option.icon} {option.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Nutrition Goals */}
                <div>
                    <h4 className="text-sm font-medium mb-3 text-[rgb(var(--color-text-secondary))]">Nutrition Goals</h4>
                    <div className="space-y-2">
                        {FILTER_OPTIONS.nutrition.map((option) => (
                            <label key={option.value} className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={!!filters[option.value as keyof MenuFilterType]}
                                    onChange={() => handleToggle(option.value as keyof MenuFilterType)}
                                    className="w-4 h-4 rounded border-gray-300 text-[rgb(var(--color-primary))] focus:ring-[rgb(var(--color-primary))]"
                                />
                                <span className="text-sm text-[rgb(var(--color-text-primary))] group-hover:text-[rgb(var(--color-primary))] transition-colors">
                                    {option.icon} {option.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[rgb(var(--color-secondary))] text-center">
                <p className="text-sm text-[rgb(var(--color-text-muted))]">
                    Showing {totalItems} items
                </p>
            </div>
        </div>
    )
}
