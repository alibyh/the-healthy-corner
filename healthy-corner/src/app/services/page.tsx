import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { APP_NAME } from '@/lib/constants';
import Button from '@/components/ui/Button';

// Refined icons mapping for services
const IconMap: { [key: string]: string } = {
    'utensils': '🍽️',
    'shopping-bag': '🛍️',
    'calendar': '📅',
    'dumbbell': '💪',
    'baby': '👶',
    'cog': '⚙️',
};

async function getServices() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });

    if (error) {
        console.error('Error fetching services:', error);
        return [];
    }
    return data;
}

export default async function ServicesPage() {
    const services = await getServices();

    return (
        <div className="bg-background min-h-screen pb-24">
            {/* --- EDITORIAL HERO SECTION --- */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-text-main">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/hero.jpg"
                        alt="Our Services Background"
                        fill
                        className="object-cover opacity-30 grayscale"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-text-main/70 to-text-main" />
                </div>

                <div className="container-premium relative z-10 text-center animate-reveal">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary-light text-xs font-bold uppercase tracking-[0.3em] mb-6 shadow-xl backdrop-blur-sm">
                        Total Wellness
                    </span>
                    <h1 className="text-6xl md:text-9xl font-brand text-white mb-6 tracking-tighter leading-none">
                        Our <span className="text-primary mt-2 block md:inline">Services.</span>
                    </h1>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
                        At {APP_NAME}, we go beyond serving food. We provide a complete health and nutrition ecosystem tailored to your lifestyle.
                    </p>
                </div>
            </section>

            {/* --- SERVICES GRID --- */}
            <section className="py-24 md:py-32 relative overflow-hidden">
                {/* Background Logo Element */}
                <div className="absolute top-0 left-0 w-1/3 h-full opacity-[0.03] pointer-events-none transform -rotate-12 -translate-x-20">
                    <Image
                        src="/images/logo.jpg"
                        alt="Background Logo"
                        fill
                        className="object-contain"
                    />
                </div>

                <div className="container-premium relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                className="animate-reveal"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="premium-card h-full p-10 flex flex-col group hover:bg-primary transition-all duration-700 ease-out border-b-8 border-transparent hover:border-accent">
                                    <div className="w-20 h-20 bg-primary/5 rounded-[2rem] flex items-center justify-center text-5xl mb-8 group-hover:bg-white group-hover:scale-110 transition-all duration-500 shadow-inner">
                                        {service.icon && IconMap[service.icon] ? IconMap[service.icon] : '🥗'}
                                    </div>
                                    <h3 className="text-3xl font-black text-text-main mb-6 group-hover:text-white transition-colors leading-tight">
                                        {service.title}
                                    </h3>
                                    <p className="text-lg text-text-muted leading-relaxed group-hover:text-white/80 transition-colors flex-1 font-medium">
                                        {service.description}
                                    </p>
                                    <div className="mt-8 flex items-center gap-2 text-primary group-hover:text-accent font-black uppercase tracking-widest text-xs transition-colors translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-500">
                                        Learn More <span className="text-lg">→</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- PREMIUM CALL TO ACTION --- */}
            <section className="container-premium mt-12 mb-20">
                <div className="bg-accent rounded-[3.5rem] p-12 md:p-24 flex flex-col lg:flex-row items-center justify-between gap-16 overflow-hidden relative group shadow-2xl">
                    <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-[0.03] transition-opacity duration-1000" />
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <div className="relative z-10 text-center lg:text-left max-w-2xl">
                        <span className="text-primary-dark/60 font-black uppercase tracking-[0.2em] text-sm mb-6 block">Ready to Transform?</span>
                        <h2 className="text-5xl md:text-7xl font-black text-primary-dark mb-8 leading-[1.1] tracking-tighter">
                            Start Your Health <br />
                            <span className="text-white italic font-brand text-8xl">Journey.</span>
                        </h2>
                        <p className="text-xl text-primary-dark/80 mb-12 font-medium leading-relaxed">
                            Our nutrition experts are ready to craft a personalized lifestyle plan just for you. Reach out today and feel the difference.
                        </p>
                        <Link href="/contact">
                            <Button size="lg" className="h-20 rounded-2xl px-12 text-2xl font-black shadow-2xl hover:scale-105 active:scale-95 transition-all bg-primary-dark text-white border-none">
                                GET IN TOUCH
                            </Button>
                        </Link>
                    </div>

                    <div className="relative z-10 w-full md:w-2/5 lg:w-1/3">
                        <div className="aspect-square bg-white/20 backdrop-blur-3xl rounded-[3rem] flex items-center justify-center shadow-2xl p-12 ring-1 ring-white/30 transform -rotate-6 group-hover:rotate-0 transition-transform duration-700">
                            <span className="text-[10rem] drop-shadow-2xl">🍏</span>
                        </div>
                        {/* Decorative floating shapes */}
                        <div className="absolute -top-6 -left-6 w-16 h-16 bg-primary rounded-2xl opacity-20 animate-bounce-slow" />
                        <div className="absolute -bottom-10 -right-4 w-24 h-24 bg-white rounded-full opacity-30 animate-pulse" />
                    </div>
                </div>
            </section>
        </div>
    );
}
