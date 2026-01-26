import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { APP_NAME, BASE_PATH } from '@/lib/constants'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

async function getAboutContent() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .eq('page_slug', 'about-us')
        .eq('is_active', true)

    if (error) return {}

    return data.reduce((acc, curr) => {
        acc[curr.section_key] = curr.content_type === 'json' ? JSON.parse(curr.content) : curr.content
        return acc
    }, {} as any)
}

async function getAchievements() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .eq('is_active', true)
        .order('year', { ascending: false })
        .order('order_index', { ascending: true })

    if (error) return []
    return data
}

export default async function AboutPage() {
    const content = await getAboutContent()
    const achievements = await getAchievements()

    return (
        <div className="bg-background min-h-screen">
            {/* --- PREMIUM HERO SECTION --- */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-text-main">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={`${BASE_PATH}/images/hero.jpg`}
                        alt="About Us Background"
                        fill
                        className="object-cover opacity-40 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-text-main/80 to-text-main" />
                </div>

                <div className="container-premium relative z-10 text-center animate-reveal">
                    <span className="inline-block px-4 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary-light text-xs font-bold uppercase tracking-[0.3em] mb-6">
                        Our Legacy
                    </span>
                    <h1 className="text-5xl md:text-8xl font-brand text-white mb-6 tracking-tighter leading-none">
                        Beyond the <br />
                        <span className="text-primary">Plate.</span>
                    </h1>
                    <div className="w-24 h-2 bg-primary mx-auto rounded-full" />
                </div>
            </section>

            {/* --- THE STORY --- */}
            <section className="py-24 md:py-32 overflow-hidden">
                <div className="container-premium">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] blur-2xl group-hover:bg-primary/10 transition-all duration-700" />
                            <div className="relative aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl border border-secondary-dark/10">
                                <Image
                                    src={`${BASE_PATH}/images/hero.jpg`}
                                    alt="Our Journey"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                                />
                            </div>
                            {/* Floating badge */}
                            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-accent rounded-full flex flex-col items-center justify-center shadow-2xl border-8 border-background p-4 text-center animate-bounce-slow">
                                <span className="text-primary-dark font-black text-4xl leading-none">EST.</span>
                                <span className="text-primary-dark font-black text-5xl leading-none">2023</span>
                            </div>
                        </div>

                        <div className="space-y-8 lg:pl-12">
                            <h2 className="text-4xl md:text-6xl font-black text-text-main leading-[1.1] tracking-tight">
                                Where Health <br />
                                <span className="text-primary">Meets Passion.</span>
                            </h2>
                            <p className="text-xl text-text-body font-medium leading-relaxed italic border-l-4 border-primary pl-6">
                                {content.hero || "The Healthy Corner was born from a vision to redefine what 'healthy eating' truly means in Mauritania."}
                            </p>
                            <div className="space-y-6 text-lg text-text-muted leading-relaxed">
                                <p>
                                    {content.story || "Founded from a simple belief: healthy food doesn’t have to be boring. We combine nutritional science with culinary expertise to create meals that fuel your body and delight your taste buds."}
                                </p>
                                <p>
                                    Integrity is our main ingredient. We believe that everyone deserves to know exactly what they are consuming, which is why we’ve pioneered the most transparent food service in the region.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CORE PHILOSOPHY / VALUES --- */}
            <section className="bg-surface py-24 md:py-32 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.03] pointer-events-none transform rotate-12 translate-x-20">
                    <Image
                        src={`${BASE_PATH}/images/logo.jpg`}
                        alt="Background Logo"
                        fill
                        className="object-contain"
                    />
                </div>

                <div className="container-premium relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Our Core Philosophy</h2>
                        <p className="text-xl text-text-muted">{content.mission || "Our mission is to make healthy eating accessible, enjoyable, and transparent."}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {(content.values || ["Transparency", "Integrity", "Innovation", "Sustainability", "Community"]).map((value: string, i: number) => (
                            <div key={i} className="premium-card p-10 group hover:bg-primary transition-all duration-500">
                                <div className="text-4xl mb-6 group-hover:scale-125 transition-transform duration-500 block">✨</div>
                                <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">{value}</h3>
                                <p className="text-text-muted group-hover:text-white/80 transition-colors">
                                    Commitment to excellence in every aspect of our process, from sourcing to final serving.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- MILESTONES & ACHIEVEMENTS --- */}
            <section className="py-24 md:py-32">
                <div className="container-premium">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                        <div className="max-w-2xl">
                            <span className="text-primary font-black uppercase tracking-[0.2em] text-sm mb-4 block">Building Trust</span>
                            <h2 className="text-4xl md:text-6xl font-black text-text-main leading-none">Milestones & <br /><span className="text-primary">Recognition</span></h2>
                        </div>
                        <p className="text-lg text-text-muted md:max-w-sm">Recognition for our commitment to excellence in health and nutrition over the years.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {achievements.map((item, idx) => (
                            <div key={item.id} className="relative group">
                                <div className="absolute inset-0 bg-primary/5 rounded-3xl group-hover:bg-primary transition-all duration-500" />
                                <div className="relative p-8 md:p-10 flex gap-6 items-start">
                                    <div className="w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform">
                                        {item.achievement_type === 'award' ? '🏆' : '🎖️'}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-primary font-black text-xl group-hover:text-white transition-colors">{item.year}</span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-accent group-hover:bg-white" />
                                            <span className="text-xs uppercase tracking-widest font-bold text-text-muted group-hover:text-white/50 transition-colors">{item.achievement_type}</span>
                                        </div>
                                        <h4 className="text-2xl font-bold text-text-main mb-3 group-hover:text-white transition-colors">{item.title}</h4>
                                        <p className="text-text-muted group-hover:text-white/80 transition-colors leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CALL TO ACTION --- */}
            <section className="container-premium pb-32">
                <div className="bg-accent rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-700" />
                    <h2 className="text-4xl md:text-7xl font-black text-primary-dark mb-8 leading-none">BE PART OF <br /> OUR JOURNEY</h2>
                    <Link href="/contact">
                        <Button size="lg" className="rounded-full px-12 py-8 text-xl font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all">
                            Contact Us Today
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    )
}
