import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { NutritionPanel } from '@/components/menu/NutritionBadge'
import Button from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'
import { PLACEHOLDER_FOOD_IMAGE } from '@/lib/constants'

interface MenuDetailPageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateStaticParams() {
    const supabase = await createClient()
    const { data: items } = await supabase
        .from('menu_items')
        .select('slug')
        .eq('is_active', true)

    return items?.map((item) => ({
        slug: item.slug,
    })) || []
}

export async function generateMetadata({ params }: MenuDetailPageProps) {
    const { slug } = await params
    const supabase = await createClient()

    const { data: item } = await supabase
        .from('menu_items')
        .select('name, description')
        .eq('slug', slug)
        .single()

    if (!item) {
        return {
            title: 'Item Not Found',
        }
    }

    return {
        title: item.name,
        description: item.description,
    }
}

async function getItemDetails(slug: string) {
    const supabase = await createClient()

    // Fetch item details
    const { data: item, error } = await supabase
        .from('menu_items')
        .select(`
      *,
      categories (
        id,
        name,
        slug
      )
    `)
        .eq('slug', slug)
        .eq('is_active', true)
        .single()

    if (error || !item) {
        return null
    }

    // Fetch ingredients separately since it's a many-to-many through a junction table
    const { data: ingredientsData } = await supabase
        .from('menu_item_ingredients')
        .select(`
      quantity,
      ingredients (
        id,
        name,
        is_allergen,
        allergen_type
      )
    `)
        .eq('menu_item_id', item.id)

    const ingredients = ingredientsData?.map(row => ({
        ...row.ingredients,
        quantity: row.quantity
    })) || []

    return { item, ingredients }
}

export default async function MenuItemPage({ params }: MenuDetailPageProps) {
    const { slug } = await params
    const data = await getItemDetails(slug)

    if (!data) {
        notFound()
    }

    const { item, ingredients } = data
    const allergens = ingredients.filter((i: any) => i.is_allergen)

    return (
        <div className="min-h-screen bg-[rgb(var(--color-background))] pb-20">
            {/* Sticky Mobile Header / Breadcrumb */}
            <div className="sticky top-0 z-40 bg-[rgb(var(--color-surface))] shadow-sm py-4 px-4 md:px-8">
                <div className="container-custom max-w-5xl mx-auto flex items-center text-sm">
                    <Link href="/" className="text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-primary))]">
                        Menu
                    </Link>
                    <span className="mx-2 text-[rgb(var(--color-text-muted))]">/</span>
                    {/* @ts-ignore - Supabase type inference limitation */}
                    <Link href={`/categories/${item.categories?.slug}`} className="text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-primary))]">
                        {/* @ts-ignore */}
                        {item.categories?.name}
                    </Link>
                    <span className="mx-2 text-[rgb(var(--color-text-muted))]">/</span>
                    <span className="font-medium text-[rgb(var(--color-text-primary))] truncate">{item.name}</span>
                </div>
            </div>

            <main className="container-custom max-w-5xl mx-auto mt-6 md:mt-10">
                <div className="bg-[rgb(var(--color-surface))] rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">

                    {/* Image Section */}
                    <div className="w-full md:w-1/2 relative h-64 md:h-auto min-h-[400px]">
                        <Image
                            src={item.image_url || PLACEHOLDER_FOOD_IMAGE}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />

                        {/* Mobile Favorite/Action Overlay */}
                        <div className="absolute top-4 right-4 md:hidden">
                            <button className="bg-white/90 p-2 rounded-full shadow-md text-red-500">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-[rgb(var(--color-text-primary))] mb-2">
                                    {item.name}
                                </h1>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {item.is_vegetarian && (
                                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">Vegetarian</span>
                                    )}
                                    {item.is_vegan && (
                                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">Vegan</span>
                                    )}
                                    {item.is_gluten_free && (
                                        <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full font-medium">Gluten Free</span>
                                    )}
                                    {item.is_high_protein && (
                                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">High Protein</span>
                                    )}
                                </div>
                            </div>
                            <div className="text-2xl md:text-3xl font-bold text-[rgb(var(--color-primary))]">
                                {formatPrice(item.price, item.currency)}
                            </div>
                        </div>

                        <p className="text-[rgb(var(--color-text-secondary))] mb-8 leading-relaxed">
                            {item.description}
                        </p>

                        {/* Nutrition Grid */}
                        <div className="bg-[rgb(var(--color-background))] rounded-xl p-6 mb-8">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-[rgb(var(--color-text-muted))] mb-4">
                                Nutritional Values
                            </h3>
                            <div className="grid grid-cols-4 gap-4 text-center">
                                <div className="flex flex-col items-center">
                                    <span className="text-2xl font-bold text-[rgb(var(--color-calories))]">{item.calories}</span>
                                    <span className="text-xs text-[rgb(var(--color-text-secondary))]">kcal</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-xl font-bold text-[rgb(var(--color-protein))]">{item.protein}g</span>
                                    <span className="text-xs text-[rgb(var(--color-text-secondary))]">Protein</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-xl font-bold text-[rgb(var(--color-carbs))]">{item.carbs}g</span>
                                    <span className="text-xs text-[rgb(var(--color-text-secondary))]">Carbs</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-xl font-bold text-[rgb(var(--color-fats))]">{item.fats}g</span>
                                    <span className="text-xs text-[rgb(var(--color-text-secondary))]">Fats</span>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-3 gap-4 text-center text-sm">
                                {item.sugar !== null && (
                                    <div className="flex flex-col">
                                        <span className="font-semibold">{item.sugar}g</span>
                                        <span className="text-[rgb(var(--color-text-muted))] text-xs">Sugar</span>
                                    </div>
                                )}
                                {item.fiber !== null && (
                                    <div className="flex flex-col">
                                        <span className="font-semibold">{item.fiber}g</span>
                                        <span className="text-[rgb(var(--color-text-muted))] text-xs">Fiber</span>
                                    </div>
                                )}
                                {item.sodium !== null && (
                                    <div className="flex flex-col">
                                        <span className="font-semibold">{item.sodium}mg</span>
                                        <span className="text-[rgb(var(--color-text-muted))] text-xs">Sodium</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Ingredients & Allergens */}
                        <div className="space-y-6 flex-grow">
                            {ingredients.length > 0 && (
                                <div>
                                    <h3 className="font-semibold text-[rgb(var(--color-text-primary))] mb-2">Ingredients</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {ingredients.map((ing: any) => (
                                            <span key={ing.id} className="text-sm bg-white border border-gray-200 px-3 py-1 rounded-full text-[rgb(var(--color-text-secondary))]">
                                                {ing.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {allergens.length > 0 && (
                                <div>
                                    <h3 className="font-semibold text-[rgb(var(--color-text-primary))] mb-2">Allergens</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {allergens.map((ing: any) => (
                                            <span key={ing.id} className="text-sm bg-red-50 border border-red-100 px-3 py-1 rounded-full text-red-700 flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                </svg>
                                                {ing.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-8 pt-6 border-t border-[rgb(var(--color-secondary))] flex gap-4">
                            <Button size="lg" className="flex-1 shadow-lg shadow-[rgb(var(--color-primary)/0.2)]">
                                Add to Cart
                            </Button>
                            <Button size="lg" variant="outline" className="px-6">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
