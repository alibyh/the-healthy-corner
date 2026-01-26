import { type ClassValue, clsx } from 'clsx'

/**
 * Utility function to merge class names
 */
export function cn(...inputs: ClassValue[]) {
    return clsx(inputs)
}

/**
 * Format price with currency
 */
export function formatPrice(price: number, currency: string = 'MRU'): string {
    return new Intl.NumberFormat('fr-MR', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(price)
}

/**
 * Generate slug from string
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

/**
 * Calculate total macros
 */
export function calculateTotalMacros(protein: number = 0, carbs: number = 0, fats: number = 0) {
    return {
        total: protein + carbs + fats,
        protein,
        carbs,
        fats,
    }
}

/**
 * Get nutrition color class
 */
export function getNutritionColor(type: 'protein' | 'carbs' | 'fats' | 'calories'): string {
    const colors = {
        protein: 'rgb(var(--color-protein))',
        carbs: 'rgb(var(--color-carbs))',
        fats: 'rgb(var(--color-fats))',
        calories: 'rgb(var(--color-calories))',
    }
    return colors[type]
}

/**
 * Truncate text
 */
export function truncate(text: string, length: number = 100): string {
    if (text.length <= length) return text
    return text.slice(0, length).trim() + '...'
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null

    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            timeout = null
            func(...args)
        }

        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

/**
 * Check if item matches filter
 */
export function matchesFilter(
    item: any,
    filters: {
        searchQuery?: string
        caloriesRange?: [number, number]
        priceRange?: [number, number]
        isVegetarian?: boolean
        isVegan?: boolean
        isGlutenFree?: boolean
        isHighProtein?: boolean
        isLowSugar?: boolean
    }
): boolean {
    // Search query
    if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase()
        const searchString = `${item.name} ${item.description}`.toLowerCase()
        if (!searchString.includes(query)) return false
    }

    // Calories range
    if (filters.caloriesRange && item.calories) {
        const [min, max] = filters.caloriesRange
        if (item.calories < min || item.calories > max) return false
    }

    // Price range
    if (filters.priceRange) {
        const [min, max] = filters.priceRange
        if (item.price < min || item.price > max) return false
    }

    // Boolean filters
    if (filters.isVegetarian && !item.is_vegetarian) return false
    if (filters.isVegan && !item.is_vegan) return false
    if (filters.isGlutenFree && !item.is_gluten_free) return false
    if (filters.isHighProtein && !item.is_high_protein) return false
    if (filters.isLowSugar && !item.is_low_sugar) return false

    return true
}

/**
 * Sort menu items
 */
export function sortMenuItems(
    items: any[],
    sortBy: 'name' | 'price-asc' | 'price-desc' | 'calories-asc' | 'calories-desc' | 'protein-desc'
): any[] {
    const sorted = [...items]

    switch (sortBy) {
        case 'name':
            return sorted.sort((a, b) => a.name.localeCompare(b.name))
        case 'price-asc':
            return sorted.sort((a, b) => a.price - b.price)
        case 'price-desc':
            return sorted.sort((a, b) => b.price - a.price)
        case 'calories-asc':
            return sorted.sort((a, b) => (a.calories || 0) - (b.calories || 0))
        case 'calories-desc':
            return sorted.sort((a, b) => (b.calories || 0) - (a.calories || 0))
        case 'protein-desc':
            return sorted.sort((a, b) => (b.protein || 0) - (a.protein || 0))
        default:
            return sorted
    }
}
