/**
 * Application-wide constants
 */

export const APP_NAME = 'The Healthy Corner'
export const APP_DESCRIPTION = 'Healthy, balanced, and transparent nutrition'

// Navigation
export const MOBILE_NAV_ITEMS = [
    { label: 'Menu', icon: 'menu', href: '/' },
    { label: 'Search', icon: 'search', href: '/search' },
    { label: 'Favorites', icon: 'heart', href: '/favorites' },
    { label: 'Info', icon: 'info', href: '/about' },
] as const

export const DESKTOP_NAV_ITEMS = [
    { label: 'Home', href: '/' },
    { label: 'Our Services', href: '/services' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
] as const

// Filters
export const FILTER_OPTIONS = {
    dietary: [
        { label: 'Vegetarian', value: 'isVegetarian', icon: '🥗' },
        { label: 'Vegan', value: 'isVegan', icon: '🌱' },
        { label: 'Gluten-Free', value: 'isGlutenFree', icon: '🌾' },
    ],
    nutrition: [
        { label: 'High Protein', value: 'isHighProtein', icon: '💪' },
        { label: 'Low Sugar', value: 'isLowSugar', icon: '🍬' },
    ],
} as const

export const SORT_OPTIONS = [
    { label: 'Name (A-Z)', value: 'name' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Calories: Low to High', value: 'calories-asc' },
    { label: 'Calories: High to Low', value: 'calories-desc' },
    { label: 'Highest Protein', value: 'protein-desc' },
] as const

// Ranges
export const DEFAULT_CALORIE_RANGE: [number, number] = [0, 1000]
export const DEFAULT_PRICE_RANGE: [number, number] = [0, 200]

// Storage keys
export const FAVORITES_STORAGE_KEY = 'healthy-corner-favorites'
export const RECENT_SEARCHES_KEY = 'healthy-corner-recent-searches'

// Pagination
export const ITEMS_PER_PAGE = 12

// Image placeholders
export const REPO_NAME = '/the-healthy-corner'
export const BASE_PATH = REPO_NAME // Match next.config.ts basePath

export const PLACEHOLDER_FOOD_IMAGE = `${BASE_PATH}/images/placeholder-food.jpg`
export const PLACEHOLDER_CATEGORY_IMAGE = `${BASE_PATH}/images/placeholder-category.jpg`

// Social media
export const SOCIAL_LINKS = {
    facebook: 'https://www.facebook.com/share/17smBmCAwH/?mibextid=wwXIfr',
    instagram: 'https://www.instagram.com/healthycornermr?igsh=NHVjcmxxOWhpczZk',
    snapchat: 'https://snapchat.com/t/jomDgNnl',
    whatsapp: 'https://wa.me/22236820842',
} as const

// Contact info
export const CONTACT_INFO = {
    phone: '+222 36 82 08 42',
    whatsapp: '+222 36 82 08 42',
    email: 'contact@healthycorner.mr',
    address: 'in front of Chighali mosque in Nouakchott -- Tevragh Zeina',
    googleMaps: 'https://maps.app.goo.gl/UnCtudp1zLSfZNfn6',
} as const
