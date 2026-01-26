'use client'

import React, { useState, useEffect, useMemo } from 'react'
import MenuItemCard from '@/components/menu/MenuItemCard'
import MenuFilter from '@/components/menu/MenuFilter'
import Button from '@/components/ui/Button'
import { MenuItem } from '@/types/database'
import { MenuFilter as MenuFilterType, SortOption } from '@/types/ui'
import { matchesFilter, sortMenuItems } from '@/lib/utils'
import { DEFAULT_CALORIE_RANGE, DEFAULT_PRICE_RANGE, SORT_OPTIONS } from '@/lib/constants'

interface FilteredMenuGridProps {
    initialItems: MenuItem[]
    categoryName: string
}

export default function FilteredMenuGrid({ initialItems, categoryName }: FilteredMenuGridProps) {
    const [items, setItems] = useState<MenuItem[]>(initialItems)
    const [showFilters, setShowFilters] = useState(false)
    const [sortBy, setSortBy] = useState<SortOption['value']>('name')

    const [filters, setFilters] = useState<MenuFilterType>({
        caloriesRange: DEFAULT_CALORIE_RANGE,
        priceRange: DEFAULT_PRICE_RANGE,
        searchQuery: '',
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        isHighProtein: false,
        isLowSugar: false,
    })

    // Calculate stats for initial state to set realistic ranges
    useEffect(() => {
        if (initialItems.length > 0) {
            const prices = initialItems.map(i => i.price)
            const calories = initialItems.map(i => i.calories || 0)

            const maxPrice = Math.max(...prices)
            const maxCalories = Math.max(...calories)

            setFilters(prev => ({
                ...prev,
                priceRange: [0, Math.ceil(maxPrice / 10) * 10], // Round up to nearest 10
                caloriesRange: [0, Math.ceil(maxCalories / 50) * 50] // Round up to nearest 50
            }))
        }
    }, [initialItems])

    // Filter and sort items
    const filteredItems = useMemo(() => {
        let result = initialItems.filter(item => matchesFilter(item, filters))
        return sortMenuItems(result, sortBy)
    }, [initialItems, filters, sortBy])


    return (
        <div className="flex flex-col lg:flex-row gap-8 relative items-start">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden w-full sticky top-[4rem] z-30 bg-[rgb(var(--color-surface))] p-3 md:p-4 shadow-sm rounded-lg mb-4 flex items-center justify-between gap-2">
                <span className="font-semibold text-sm md:text-base">{filteredItems.length} items</span>
                <div className="flex gap-2 flex-shrink-0">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption['value'])}
                        className="px-2 md:px-3 py-1.5 md:py-2 border rounded-lg bg-white text-xs md:text-sm"
                    >
                        {SORT_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-1 md:gap-2 text-xs md:text-sm px-2 md:px-3"
                    >
                        <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                        <span className="hidden sm:inline">Filter</span>
                    </Button>
                </div>
            </div>

            {/* Sidebar Filters (Desktop) & Mobile Drawer */}
            <aside className={`
        ${showFilters ? 'fixed inset-0 z-50 p-4 bg-black/50 lg:bg-transparent lg:p-0' : 'hidden'}
        lg:block lg:w-64 lg:sticky lg:top-24 flex-shrink-0
      `}>
                <div className={`
          bg-white rounded-lg h-full lg:h-auto overflow-y-auto lg:overflow-visible
          w-full max-w-xs mx-auto lg:max-w-none lg:w-full
          ${showFilters ? 'block animate-slide-up' : ''}
        `}>
                    {showFilters && (
                        <div className="lg:hidden flex justify-end p-2">
                            <button onClick={() => setShowFilters(false)} className="p-2">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )}
                    <MenuFilter
                        filters={filters}
                        onFilterChange={setFilters}
                        totalItems={filteredItems.length}
                    />
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 w-full">
                {/* Desktop Toolbar */}
                <div className="hidden lg:flex justify-between items-center mb-6">
                    <p className="text-[rgb(var(--color-text-secondary))]">
                        Showing <strong>{filteredItems.length}</strong> items for <span className="font-semibold text-[rgb(var(--color-primary))]">{categoryName}</span>
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-[rgb(var(--color-text-muted))]">Sort by:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortOption['value'])}
                            className="px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))]"
                        >
                            {SORT_OPTIONS.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Grid */}
                {filteredItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                        {filteredItems.map((item) => (
                            <div key={item.id} className="animate-fade-in">
                                <MenuItemCard item={item} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-[rgb(var(--color-surface))] rounded-lg">
                        <div className="text-4xl mb-4">🔍</div>
                        <h3 className="text-lg font-medium text-[rgb(var(--color-text-primary))] mb-2">No items found</h3>
                        <p className="text-[rgb(var(--color-text-secondary))]">
                            Try adjusting your filters or search criteria.
                        </p>
                        <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => setFilters(prev => ({
                                ...prev,
                                caloriesRange: DEFAULT_CALORIE_RANGE,
                                priceRange: DEFAULT_PRICE_RANGE,
                                isVegetarian: false,
                                isVegan: false,
                                isGlutenFree: false,
                                isHighProtein: false,
                                isLowSugar: false
                            }))}
                        >
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
