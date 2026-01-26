import React from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { CONTACT_INFO, SOCIAL_LINKS, APP_NAME } from '@/lib/constants';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[rgb(var(--color-background))] pb-20">
            <div className="bg-[rgb(var(--color-surface))] shadow-sm border-b border-[rgb(var(--color-secondary))] py-12 md:py-20 mb-12">
                <div className="container-custom text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-[rgb(var(--color-text-primary))] mb-4 animate-slide-up">
                        Contact Us
                    </h1>
                    <p className="text-lg md:text-xl text-[rgb(var(--color-text-secondary))] max-w-2xl mx-auto animate-fade-in">
                        Have questions about our menu or want to place an order? We're here to help you stay healthy.
                    </p>
                </div>
            </div>

            <div className="container-custom max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Contact Information */}
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-[rgb(var(--color-text-primary))] mb-6">Get in Touch</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                            <Card className="p-6 flex items-start gap-4">
                                <div className="w-12 h-12 bg-[rgb(var(--color-primary)/0.1)] rounded-xl flex items-center justify-center text-[rgb(var(--color-primary))]">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-[rgb(var(--color-text-primary))] mb-1">Our Location</h3>
                                    <p className="text-[rgb(var(--color-text-secondary))]">{CONTACT_INFO.address}</p>
                                </div>
                            </Card>

                            <Card className="p-6 flex items-start gap-4">
                                <div className="w-12 h-12 bg-[rgb(var(--color-primary)/0.1)] rounded-xl flex items-center justify-center text-[rgb(var(--color-primary))]">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-[rgb(var(--color-text-primary))] mb-1">Phone Number</h3>
                                    <p className="text-[rgb(var(--color-text-secondary))] font-medium text-lg">{CONTACT_INFO.phone}</p>
                                </div>
                            </Card>

                            <Card className="p-6 flex items-start gap-4">
                                <div className="w-12 h-12 bg-[rgb(var(--color-primary)/0.1)] rounded-xl flex items-center justify-center text-[rgb(var(--color-primary))]">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-[rgb(var(--color-text-primary))] mb-1">Email Address</h3>
                                    <p className="text-[rgb(var(--color-text-secondary))]">{CONTACT_INFO.email}</p>
                                </div>
                            </Card>
                        </div>

                        <div className="pt-6">
                            <h3 className="font-bold text-[rgb(var(--color-text-primary))] mb-4">Follow Our Journey</h3>
                            <div className="flex gap-4">
                                <a href={SOCIAL_LINKS.instagram} className="w-10 h-10 bg-white shadow-sm border border-[rgb(var(--color-secondary))] rounded-full flex items-center justify-center hover:bg-[rgb(var(--color-primary))] hover:text-white transition-colors">
                                    📸
                                </a>
                                <a href={SOCIAL_LINKS.facebook} className="w-10 h-10 bg-white shadow-sm border border-[rgb(var(--color-secondary))] rounded-full flex items-center justify-center hover:bg-[rgb(var(--color-primary))] hover:text-white transition-colors">
                                    👥
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact / Order Form */}
                    <Card className="p-8 md:p-12 shadow-2xl relative overflow-hidden">
                        {/* Decorative element */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[rgb(var(--color-primary)/0.05)] rounded-bl-full" />

                        <h2 className="text-2xl font-bold text-[rgb(var(--color-text-primary))] mb-8">Send us a Message</h2>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[rgb(var(--color-text-secondary))]">Full Name</label>
                                    <input type="text" className="w-full px-4 py-3 bg-[rgb(var(--color-background))] rounded-xl border border-transparent focus:border-[rgb(var(--color-primary))] focus:ring-1 focus:ring-[rgb(var(--color-primary))] outline-none transition-all" placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[rgb(var(--color-text-secondary))]">Phone Number</label>
                                    <input type="tel" className="w-full px-4 py-3 bg-[rgb(var(--color-background))] rounded-xl border border-transparent focus:border-[rgb(var(--color-primary))] focus:ring-1 focus:ring-[rgb(var(--color-primary))] outline-none transition-all" placeholder="+222 XXX..." />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[rgb(var(--color-text-secondary))]">Subject</label>
                                <select className="w-full px-4 py-3 bg-[rgb(var(--color-background))] rounded-xl border border-transparent focus:border-[rgb(var(--color-primary))] focus:ring-1 focus:ring-[rgb(var(--color-primary))] outline-none transition-all appearance-none cursor-pointer">
                                    <option>General Inquiry</option>
                                    <option>Place an Order</option>
                                    <option>Feedback & Suggestions</option>
                                    <option>Special Diet Request</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[rgb(var(--color-text-secondary))]">Your Message</label>
                                <textarea rows={4} className="w-full px-4 py-3 bg-[rgb(var(--color-background))] rounded-xl border border-transparent focus:border-[rgb(var(--color-primary))] focus:ring-1 focus:ring-[rgb(var(--color-primary))] outline-none transition-all resize-none" placeholder="How can we help you?" />
                            </div>

                            <Button size="lg" className="w-full shadow-lg shadow-[rgb(var(--color-primary)/0.2)]">
                                Send Message
                            </Button>

                            <p className="text-xs text-center text-[rgb(var(--color-text-muted))]">
                                We typically respond within 24 hours.
                            </p>
                        </form>
                    </Card>
                </div>
            </div>

            {/* Map Placeholder */}
            <section className="container-custom mt-20">
                <div className="w-full h-96 bg-[rgb(var(--color-secondary))] rounded-3xl overflow-hidden shadow-inner flex items-center justify-center text-[rgb(var(--color-text-secondary))] relative group">
                    <span className="text-lg font-medium">Interactive Map Integration Placeholder</span>
                    <div className="absolute inset-0 bg-[rgb(var(--color-primary)/0.05)] group-hover:bg-transparent transition-colors" />
                </div>
            </section>
        </div>
    );
}
