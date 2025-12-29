"use client";

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Section from '@/components/Section';
import Header from '@/components/Header';
import Button from '@/components/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, MessageSquare, Zap, BarChart3, Globe, Shield } from 'lucide-react';
import Image from 'next/image';

const slides = [
    "/nexi_hero_slide_1.png",
    "/nexi_hero_slide_2.png",
    "/nexi_hero_slide_3.png"
];

export default function NexiPage() {
    const t = useTranslations('Nexi');
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-black">
            {/* 1. Hero Section */}
            <section className="relative pt-10 pb-20 overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <motion.div
                            className="w-full lg:w-1/2 text-left"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-primary dark:text-blue-300 text-sm font-semibold mb-6 tracking-wide uppercase">
                                {t('hero.badge')}
                            </span>
                            <h1 className="text-5xl md:text-6xl font-bold font-heading mb-6 text-gray-900 dark:text-white leading-tight">
                                {t('hero.title')}
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-lg">
                                {t('hero.subtitle')}
                            </p>
                            <div className="flex gap-4">
                                <Button href="/signup" variant="primary" className="px-8 py-4 text-lg">
                                    {t('hero.cta')}
                                </Button>
                                <Button href="/demo" variant="outline" className="px-8 py-4 text-lg">
                                    {t('hero.secondaryCta')}
                                </Button>
                            </div>
                        </motion.div>
                        <motion.div
                            className="w-full lg:w-1/2 relative h-[500px] flex items-center justify-center"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="relative w-full h-full">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={currentSlide}
                                        src={slides[currentSlide]}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5 }}
                                        className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl"
                                        alt="Nexi Interface Slide"
                                    />
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 2. Social Proof */}
            <section className="py-12 border-y border-gray-100 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-900/20">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-8">{t('socialProof')}</p>
                    <div className="flex flex-wrap justify-center gap-12 grayscale opacity-60">
                        {/* Placeholders for logos */}
                        {['Acme Corp', 'GlobalTech', 'Nebula', 'FoxRun', 'Circle'].map((logo, i) => (
                            <div key={i} className="text-xl font-bold text-gray-400 flex items-center gap-2">
                                <div className="w-6 h-6 bg-gray-300 rounded-full"></div> {logo}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Feature 1: The Software (Center) */}
            <section className="py-24">
                <div className="container mx-auto px-4 text-center max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">{t('feature1.title')}</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">{t('feature1.subtitle')}</p>

                        {/* Large Browser Mockup */}
                        <div className="rounded-xl overflow-hidden shadow-2xl relative group">
                            <Image
                                src="/nexi_dashboard_main.png"
                                alt="Nexi Main Interface"
                                width={1200}
                                height={800}
                                className="w-full h-auto"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 4. Feature 2: Engage (Left Text, Right Image) */}
            <section className="py-24 bg-gray-50 dark:bg-gray-900/30">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <motion.div
                            className="w-full lg:w-1/2"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-primary mb-6">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">{t('feature2.title')}</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                                {t('feature2.subtitle')}
                            </p>
                            <Button href="#" variant="ghost" className="text-primary hover:text-blue-700 pl-0 text-lg flex items-center gap-2">
                                {t('feature2.cta')} <CheckCircle2 className="w-4 h-4" />
                            </Button>
                        </motion.div>
                        <motion.div
                            className="w-full lg:w-1/2"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="rounded-2xl overflow-hidden shadow-xl relative">
                                <Image
                                    src="/nexi_mobile_engage.png"
                                    alt="Mobile Engagement"
                                    width={600}
                                    height={600}
                                    className="w-full h-auto"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 5. Feature 3: Support (Right Text, Left Image) */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
                        <motion.div
                            className="w-full lg:w-1/2"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-600 mb-6">
                                <Shield className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">{t('feature3.title')}</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                                {t('feature3.subtitle')}
                            </p>
                            <Button href="#" variant="ghost" className="text-purple-600 hover:text-purple-700 pl-0 text-lg flex items-center gap-2">
                                {t('feature3.cta')} <CheckCircle2 className="w-4 h-4" />
                            </Button>
                        </motion.div>
                        <motion.div
                            className="w-full lg:w-1/2"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="rounded-2xl overflow-hidden shadow-xl relative">
                                <Image
                                    src="/nexi_support_desk.png"
                                    alt="Support Desk"
                                    width={600}
                                    height={600}
                                    className="w-full h-auto"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 6. Integrations */}
            <section className="py-20 bg-gray-50 dark:bg-gray-900/30 border-y border-gray-100 dark:border-gray-800">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">{t('integrations.title')}</h2>
                    <p className="text-gray-500 mb-12 max-w-xl mx-auto">{t('integrations.subtitle')}</p>
                    <div className="flex flex-wrap justify-center gap-6">
                        {/* Mock Icons for integrations */}
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="w-16 h-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:-translate-y-1 transition-transform">
                                <Globe className="w-8 h-8 text-gray-400" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. Analytics */}
            <section className="py-24">
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <h2 className="text-3xl font-bold mb-4">{t('analytics.title')}</h2>
                    <p className="text-gray-500 mb-12">{t('analytics.subtitle')}</p>

                    <div className="flex justify-center mt-12">
                        <div className="relative max-w-4xl w-full">
                            <Image
                                src="/nexi_analytics_cards.png"
                                alt="Nexi Analytics"
                                width={1000}
                                height={500}
                                className="w-full h-auto drop-shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. Testimonials Section (New) */}
            <section className="py-24 bg-blue-50 dark:bg-blue-900/10">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-16 text-gray-900 dark:text-white max-w-3xl mx-auto">
                        &quot;{t('testimonials.title')}&quot;
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <div className="flex text-yellow-500 mb-4">{'★'.repeat(5)}</div>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 italic">&quot;{t('testimonials.quote1')}&quot;</p>
                            <div className="font-bold text-gray-900 dark:text-white">{t('testimonials.author1')}</div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <div className="flex text-yellow-500 mb-4">{'★'.repeat(5)}</div>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 italic">&quot;{t('testimonials.quote2')}&quot;</p>
                            <div className="font-bold text-gray-900 dark:text-white">{t('testimonials.author2')}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 9. CTA */}
            <section className="py-32 bg-nexa-dark text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('ctaSection.title')}</h2>
                    <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">{t('ctaSection.subtitle')}</p>
                    <Button href="/contact" variant="white" className="px-10 py-5 text-xl shadow-2xl hover:scale-105 transition-transform">
                        {t('ctaSection.btn')}
                    </Button>
                </div>
            </section>
        </div>
    );
}
