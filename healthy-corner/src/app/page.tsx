import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import CategoryCard from '@/components/menu/CategoryCard'
import { CategoryCardSkeleton } from '@/components/ui/Skeleton'
import HomeContent from '@/components/home/HomeContent'
import CategoriesHeader from '@/components/home/CategoriesHeader'
import PreFooterCTA from '@/components/home/PreFooterCTA'

async function getCategories() {
  const supabase = await createClient()
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .is('parent_id', null)
    .eq('is_active', true)
    .order('order_index', { ascending: true })

  if (error) return []

  return Promise.all(
    (categories || []).map(async (category) => {
      const { count } = await supabase
        .from('menu_items')
        .select('*', { count: 'exact', head: true })
        .eq('category_id', category.id)
        .eq('is_active', true)
      return { ...category, itemCount: count || 0 }
    })
  )
}

async function CategoriesGrid() {
  const categories = await getCategories()
  // Note: This will be translated on client side via HomeContent
  if (categories.length === 0) return <div className="text-center py-20 text-text-muted">No categories found.</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
      {categories.map((category, idx) => (
        <div key={category.id} className="animate-reveal" style={{ animationDelay: `${idx * 0.1}s` }}>
          <CategoryCard category={category} itemCount={category.itemCount} />
        </div>
      ))}
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <HomeContent />
      {/* --- CATEGORIES SECTION --- */}
      <section className="py-24 md:py-32">
        <div className="container-premium">
          <CategoriesHeader />
          <Suspense fallback={<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"><CategoryCardSkeleton /><CategoryCardSkeleton /><CategoryCardSkeleton /><CategoryCardSkeleton /></div>}>
            <CategoriesGrid />
          </Suspense>
        </div>
      </section>
      {/* --- PRE-FOOTER CTA SECTION --- */}
      <PreFooterCTA />
    </>
  )
}
