export interface MenuFilter {
    caloriesRange: [number, number]
    priceRange: [number, number]
    isVegetarian?: boolean
    isVegan?: boolean
    isGlutenFree?: boolean
    isHighProtein?: boolean
    isLowSugar?: boolean
    searchQuery?: string
}

export interface NutritionInfo {
    calories?: number | null
    protein?: number | null
    carbs?: number | null
    fats?: number | null
    sugar?: number | null
    fiber?: number | null
}

export interface FilterOption {
    label: string
    value: string
    icon?: string
}

export type ViewMode = 'grid' | 'list'

export interface SortOption {
    label: string
    value: 'name' | 'price-asc' | 'price-desc' | 'calories-asc' | 'calories-desc' | 'protein-desc'
}
