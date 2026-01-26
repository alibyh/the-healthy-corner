import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import CategoryCard from '@/components/menu/CategoryCard'
import { CategoryCardSkeleton } from '@/components/ui/Skeleton'
import Button from '@/components/ui/Button'
import { APP_NAME } from '@/lib/constants'

// Note: Using the user-provided hero image
const HERO_IMAGE = '/images/hero.jpg';

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
    <div className="bg-background">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-secondary">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_IMAGE}
            alt="The Healthy Corner Hero"
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        </div>

        <div className="container-premium relative z-20">
          <div className="max-w-xl animate-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Experience the Difference
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-text-main mb-6 leading-[1.1]">
              Fueling Your <br />
              <span className="text-primary italic">Healthy Journey.</span>
            </h1>

            <p className="text-lg md:text-xl text-text-body mb-8 leading-relaxed font-medium">
              Transparent nutrition, balanced flavors. We believe in food that makes you feel amazing inside and out.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/search">
                <Button size="lg" className="w-full sm:w-auto rounded-full px-10 shadow-xl shadow-primary/20">
                  Explore Our Menu
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-10">
                  Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block animate-bounce opacity-30">
          <svg className="w-6 h-6 text-text-main" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* --- CATEGORIES SECTION --- */}
      <section className="py-24 md:py-32">
        <div className="container-premium">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Curated Nutrition</h2>
              <p className="text-lg text-text-muted">Explore our specialized menu categories, each designed to provide specific health benefits while delighting your palate.</p>
            </div>
            <Link href="/search" className="text-primary font-bold hover:underline flex items-center gap-2 group transition-all">
              View Full Menu <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <Suspense fallback={<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"><CategoryCardSkeleton /><CategoryCardSkeleton /><CategoryCardSkeleton /><CategoryCardSkeleton /></div>}>
            <CategoriesGrid />
          </Suspense>
        </div>
      </section>

      {/* --- BRAND VALUES SECTION --- */}
      <section className="bg-surface py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

        <div className="container-premium relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="premium-card p-10 group hover:bg-primary transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 group-hover:bg-white flex items-center justify-center text-3xl mb-8 transition-colors duration-500">🥙</div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">Pure Ingredients</h3>
              <p className="text-text-body group-hover:text-white/80 transition-colors leading-relaxed">
                We use 100% farm-fresh, organic ingredients. No stabilizers, no hidden sugars—just pure, honest food that your body deserves.
              </p>
            </div>

            <div className="premium-card p-10 group hover:bg-primary transition-all duration-500 md:translate-y-8">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 group-hover:bg-white flex items-center justify-center text-3xl mb-8 transition-colors duration-500">📉</div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">Macro Precision</h3>
              <p className="text-text-body group-hover:text-white/80 transition-colors leading-relaxed">
                Every calorie is counted. Every gram of protein is verified. Know exactly what you are fueling your body with for optimal health.
              </p>
            </div>

            <div className="premium-card p-10 group hover:bg-primary transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 group-hover:bg-white flex items-center justify-center text-3xl mb-8 transition-colors duration-500">🌱</div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">Sustainable Life</h3>
              <p className="text-text-body group-hover:text-white/80 transition-colors leading-relaxed">
                Sourced locally, packaged sustainably. We care for your health and the environment, creating a better future for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRE-FOOTER CTA SECTION --- */}
      <section className="container-premium py-24 md:py-32">
        <div className="bg-primary rounded-[3rem] p-8 md:p-20 relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center gap-16 group">
          {/* Background Image/Overlay */}
          <div className="absolute inset-0 opacity-10 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out">
            <Image
              src={HERO_IMAGE}
              alt="Background"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary-dark/90" />

          <div className="relative z-10 flex-1 text-center lg:text-left">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-bold uppercase tracking-[0.2em] mb-6">
              Visit Nouakchott's Finest
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-none tracking-tighter">
              READY TO EAT <br />
              <span className="text-accent italic">Better?</span>
            </h2>
            <p className="text-xl text-white/80 mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
              Step into a space where every bite is calculated for your health and every flavor is crafted for your soul.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto lg:mx-0">
              <div className="flex items-center gap-4 text-white group/item">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-2xl group-hover/item:bg-accent group-hover/item:text-primary-dark transition-all duration-300">📍</div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-widest font-black text-white/50">Our Location</span>
                  <span className="font-bold text-lg">Nouakchott, Mauritania</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white group/item">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-2xl group-hover/item:bg-accent group-hover/item:text-primary-dark transition-all duration-300">🕒</div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-widest font-black text-white/50">Service Hours</span>
                  <span className="font-bold text-lg">Every Day: 8:00 - 23:00</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 w-full lg:w-auto text-center lg:text-right">
            <Link href="/contact" className="inline-block">
              <div className="relative group/order p-4">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl opacity-0 group-hover/order:opacity-100 transition-all duration-700" />

                <button className="w-64 h-64 rounded-full bg-white flex flex-col items-center justify-center shadow-2xl relative z-10 transform group-hover/order:scale-105 transition-all duration-500 overflow-hidden ring-8 ring-white/10 group-hover:ring-accent/30">
                  <span className="text-primary-dark font-black uppercase tracking-[0.4em] text-[11px] mb-3 opacity-90">Now Serving</span>
                  <span className="text-6xl font-brand text-primary leading-none">Order Now</span>

                  {/* Interactive fill */}
                  <div className="absolute inset-0 bg-accent transform translate-y-full group-hover/order:translate-y-0 transition-transform duration-500 -z-10" />
                </button>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
