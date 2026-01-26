import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import FilteredMenuGrid from '@/components/menu/FilteredMenuGrid'
import { MenuItemCardSkeleton } from '@/components/ui/Skeleton'
import { Category, MenuItem } from '@/types/database'

interface CategoryPageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateStaticParams() {
    const supabase = await createClient()
    const { data: categories } = await supabase
        .from('categories')
        .select('slug')
        .eq('is_active', true)

    return categories?.map((category) => ({
        slug: category.slug,
    })) || []
}

export async function generateMetadata({ params }: CategoryPageProps) {
    const { slug } = await params
    const supabase = await createClient()

    const { data: category } = await supabase
        .from('categories')
        .select('name, description')
        .eq('slug', slug)
        .single()

    if (!category) {
        return {
            title: 'Category Not Found',
        }
    }

    return {
        title: category.name,
        description: category.description || `Browse our ${category.name} menu`,
    }
}

async function getCategoryWithItems(slug: string) {
    const supabase = await createClient()

    // Get category
    const { data: category, error: categoryError } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single()

    if (categoryError || !category) {
        return null
    }

    // Get menu items for this category
    const { data: items, error: itemsError } = await supabase
        .from('menu_items')
        .select('*')
        .eq('category_id', category.id)
        .eq('is_active', true)

    if (itemsError) {
        console.error('Error fetching items:', itemsError)
        return { category, items: [] }
    }

    return { category, items: items || [] }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = await params
    const data = await getCategoryWithItems(slug)

    if (!data) {
        notFound()
    }

    const { category, items } = data

    return (
        <div className="min-h-screen bg-[rgb(var(--color-background))]">
            {/* Category Header */}
            <div className="bg-[rgb(var(--color-surface))] shadow-sm border-b border-[rgb(var(--color-secondary))] py-8 md:py-12 mb-6">
                <div className="container-custom">
                    <h1 className="text-3xl md:text-4xl font-bold text-[rgb(var(--color-text-primary))] mb-3 animate-slide-up">
                        {category.name}
                    </h1>
                    {category.description && (
                        <p className="text-[rgb(var(--color-text-secondary))] text-lg max-w-2xl animate-fade-in">
                            {category.description}
                        </p>
                    )}
                </div>
            </div>

            {/* Interactive Grid */}
            <div className="container-custom pb-12">
                <Suspense
                    fallback={
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                            {[...Array(8)].map((_, i) => (
                                <MenuItemCardSkeleton key={i} />
                            ))}
                        </div>
                    }
                >
                    <FilteredMenuGrid initialItems={items} categoryName={category.name} />
                </Suspense>
            </div>
        </div>
    )
}
