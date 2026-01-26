export interface Database {
    public: {
        Tables: {
            categories: {
                Row: Category
                Insert: Omit<Category, 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Omit<Category, 'id' | 'created_at' | 'updated_at'>>
            }
            menu_items: {
                Row: MenuItem
                Insert: Omit<MenuItem, 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Omit<MenuItem, 'id' | 'created_at' | 'updated_at'>>
            }
            ingredients: {
                Row: Ingredient
                Insert: Omit<Ingredient, 'id' | 'created_at'>
                Update: Partial<Omit<Ingredient, 'id' | 'created_at'>>
            }
            services: {
                Row: Service
                Insert: Omit<Service, 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Omit<Service, 'id' | 'created_at' | 'updated_at'>>
            }
            achievements: {
                Row: Achievement
                Insert: Omit<Achievement, 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Omit<Achievement, 'id' | 'created_at' | 'updated_at'>>
            }
        }
    }
}

export interface Category {
    id: string
    name: string
    slug: string
    description: string | null
    parent_id: string | null
    image_url: string | null
    icon: string | null
    order_index: number
    is_active: boolean
    created_at: string
    updated_at: string
}

export interface MenuItem {
    id: string
    name: string
    slug: string
    description: string | null
    category_id: string

    // Nutritional values
    calories: number | null
    protein: number | null
    carbs: number | null
    fats: number | null
    sugar: number | null
    fiber: number | null
    sodium: number | null

    // Pricing
    price: number
    currency: string

    // Media
    image_url: string | null
    thumbnail_url: string | null

    // Filters & flags
    is_vegetarian: boolean
    is_vegan: boolean
    is_gluten_free: boolean
    is_kids_friendly: boolean
    is_cheat_meal: boolean
    is_high_protein: boolean
    is_low_sugar: boolean

    // Status
    is_active: boolean
    is_featured: boolean
    is_new: boolean

    // Metadata
    preparation_time: number | null
    serving_size: string | null
    allergen_info: string | null

    created_at: string
    updated_at: string
}

export interface Ingredient {
    id: string
    name: string
    slug: string
    is_allergen: boolean
    allergen_type: string | null
    created_at: string
}

export interface Service {
    id: string
    title: string
    slug: string
    description: string | null
    icon: string | null
    image_url: string | null
    order_index: number
    is_active: boolean
    created_at: string
    updated_at: string
}

export interface Achievement {
    id: string
    title: string
    description: string | null
    achievement_type: string | null
    image_url: string | null
    year: number | null
    date: string | null
    order_index: number
    is_active: boolean
    created_at: string
    updated_at: string
}

// Extended types with joins
export interface MenuItemWithCategory extends MenuItem {
    category_name: string
    category_slug: string
    category_parent_id: string | null
}

export interface CategoryWithChildren extends Category {
    children?: Category[]
}
