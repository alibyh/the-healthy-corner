import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CONTACT_INFO, SOCIAL_LINKS, APP_NAME, BASE_PATH } from '@/lib/constants';
import Button from '@/components/ui/Button';
import { InstagramIcon, FacebookIcon, SnapchatLogo, WhatsAppIcon, LocationIcon } from '@/components/ui/SocialIcons';

export default function ContactPage() {
    return (
        <div className="bg-background min-h-screen pb-24 overflow-hidden relative">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-1/3 h-screen opacity-[0.02] pointer-events-none transform rotate-12 translate-x-32">
                <Image
                    src={`${BASE_PATH}/images/logo.jpg`}
                    alt="Background Logo"
                    fill
                    className="object-contain"
                />
            </div>

            {/* --- PREMIUM HERO SECTION --- */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-text-main shadow-2xl">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={`${BASE_PATH}/images/hero.jpg`}
                        alt="Contact Us Background"
                        fill
                        className="object-cover opacity-20 filter grayscale"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-text-main/80 to-text-main" />
                </div>

                <div className="container-premium relative z-10 text-center animate-reveal">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary-light text-xs font-bold uppercase tracking-[0.4em] mb-6 backdrop-blur-sm shadow-xl">
                        Stay Connected
                    </span>
                    <h1 className="text-6xl md:text-9xl font-brand text-white mb-4 tracking-tighter leading-none">
                        Get in <span className="text-primary mt-2 block md:inline italic">Touch.</span>
                    </h1>
                    <p className="text-white/50 max-w-lg mx-auto text-lg md:text-xl font-medium tracking-wide">
                        We're here to fuel your journey. Reach out for orders, inquiries, or just to say hello.
                    </p>
                </div>
            </section>

            <div className="container-premium relative z-10 -mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* --- CONTACT METHODS --- */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Primary Actions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* WhatsApp Card */}
                            <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="group">
                                <div className="premium-card p-10 bg-white hover:bg-[#25D366] transition-all duration-700 h-full flex flex-col items-center text-center shadow-xl border-b-8 border-transparent hover:border-[#128C7E]">
                                    <div className="w-20 h-20 bg-[#25D366]/10 rounded-[2rem] flex items-center justify-center text-[#25D366] mb-6 group-hover:bg-white group-hover:scale-110 transition-all duration-500 shadow-inner">
                                        <WhatsAppIcon size={40} />
                                    </div>
                                    <h3 className="text-3xl font-black text-text-main mb-4 group-hover:text-white transition-colors">WhatsApp Us</h3>
                                    <p className="text-text-muted group-hover:text-white/80 transition-colors font-medium mb-6">Instantly place your order or ask a question.</p>
                                    <span className="text-xl font-black text-[#25D366] group-hover:text-white transition-colors">{CONTACT_INFO.whatsapp}</span>
                                </div>
                            </a>

                            {/* Location Card */}
                            <a href={CONTACT_INFO.googleMaps} target="_blank" rel="noopener noreferrer" className="group">
                                <div className="premium-card p-10 bg-white hover:bg-primary transition-all duration-700 h-full flex flex-col items-center text-center shadow-xl border-b-8 border-transparent hover:border-accent">
                                    <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary mb-6 group-hover:bg-white group-hover:scale-110 transition-all duration-500 shadow-inner">
                                        <LocationIcon size={40} />
                                    </div>
                                    <h3 className="text-3xl font-black text-text-main mb-4 group-hover:text-white transition-colors">Our Space</h3>
                                    <p className="text-text-muted group-hover:text-white/80 transition-colors font-medium mb-6">Step into the Corner and feel the energy.</p>
                                    <span className="px-6 py-2 bg-primary/10 text-primary font-bold rounded-full group-hover:bg-white group-hover:text-primary transition-all">Navigate on Maps</span>
                                </div>
                            </a>
                        </div>

                        {/* Social Wall */}
                        <div className="bg-surface rounded-[3.5rem] p-12 shadow-2xl relative overflow-hidden group/socials">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-30" />
                            <h2 className="text-4xl font-black text-text-main mb-12 tracking-tight">Social <span className="text-primary italic font-brand text-6xl">Corner.</span></h2>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {/* Instagram */}
                                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="premium-card p-8 group/item hover:bg-[#E1306C] flex flex-col items-center transition-all duration-500 text-center">
                                    <div className="text-4xl mb-4 group-hover/item:scale-125 transition-transform text-[#E1306C] group-hover/item:text-white">
                                        <InstagramIcon size={40} />
                                    </div>
                                    <span className="font-brand text-2xl group-hover/item:text-white">Instagram</span>
                                </a>
                                {/* Facebook */}
                                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="premium-card p-8 group/item hover:bg-[#1877F2] flex flex-col items-center transition-all duration-500 text-center">
                                    <div className="text-4xl mb-4 group-hover/item:scale-125 transition-transform text-[#1877F2] group-hover/item:text-white">
                                        <FacebookIcon size={40} />
                                    </div>
                                    <span className="font-brand text-2xl group-hover/item:text-white">Facebook</span>
                                </a>
                                {/* Snapchat */}
                                <a href={SOCIAL_LINKS.snapchat} target="_blank" rel="noopener noreferrer" className="premium-card p-8 group/item hover:bg-[#FFFC00] flex flex-col items-center transition-all duration-500 text-center">
                                    <div className="text-4xl mb-4 group-hover/item:scale-125 transition-transform text-[#FFFC00] group-hover/item:text-black">
                                        <SnapchatLogo size={50} />
                                    </div>
                                    <span className="font-brand text-2xl group-hover/item:text-black">Snapchat</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* --- CONTACT FORM --- */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-[3rem] p-8 md:p-10 shadow-2xl border border-secondary-dark/5 sticky top-28">
                            <h2 className="text-3xl font-black text-text-main mb-8 leading-none">Drop a <br /><span className="text-primary italic font-brand text-5xl mt-2 block">Message.</span></h2>

                            <form className="space-y-5">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-black uppercase tracking-widest text-text-muted ml-1">Full Name</label>
                                    <input type="text" className="w-full px-6 py-4 bg-surface rounded-2xl border-none focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium" placeholder="Your name" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-black uppercase tracking-widest text-text-muted ml-1">Phone</label>
                                    <input type="tel" className="w-full px-6 py-4 bg-surface rounded-2xl border-none focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium" placeholder="+222..." />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-black uppercase tracking-widest text-text-muted ml-1">Message</label>
                                    <textarea rows={4} className="w-full px-6 py-4 bg-surface rounded-2xl border-none focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium resize-none" placeholder="What's on your mind?" />
                                </div>

                                <Button size="lg" className="w-full h-18 rounded-2xl text-xl font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all py-6 mt-4">
                                    SEND MESSAGE
                                </Button>

                                <p className="text-center text-[10px] uppercase font-black tracking-widest text-text-muted opacity-50 mt-4 leading-relaxed">
                                    We typically respond within <br /> 24 hours of receiving.
                                </p>
                            </form>
                        </div>
                    </div>

                </div>
            </div>

            {/* --- MAP SECTION --- */}
            <section className="container-premium mt-24">
                <div className="relative rounded-[3.5rem] overflow-hidden group shadow-2xl border-8 border-white">
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-all duration-1000 z-10 pointer-events-none" />
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3848.3323049179!2d-15.9754117!3d18.10!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDA2JzAwLjAiTiAxNcKwNTgnMzEuNSJX!5e0!3m2!1sen!2smr!4v1700000000000!5m2!1sen!2smr"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                    {/* Maps Overlay Button */}
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none group-hover:opacity-0 transition-opacity duration-500">
                        <a href={CONTACT_INFO.googleMaps} target="_blank" rel="noopener noreferrer" className="pointer-events-auto bg-white/90 backdrop-blur-md px-10 py-5 rounded-full shadow-2xl text-primary font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all">
                            Open Interactive Map
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
