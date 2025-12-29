"use client";

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Section from '@/components/Section';
import Header from '@/components/Header';
import Button from '@/components/Button';
import PricingTier from '@/components/PricingTier';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function NexaCleanProPage() {
    const t = useTranslations('NexaCleanPro');
    const locale = useLocale();
    const [isLoading, setIsLoading] = React.useState<string | null>(null);

    const handleBuy = async (packageId: string) => {
        setIsLoading(packageId);
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bundleId: packageId, locale }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error('Checkout error:', data.error);
                alert(`Checkout failed: ${data.error}. Please contact support or try again later.`);
                setIsLoading(null);
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('An unexpected error occurred. Please try again.');
            setIsLoading(null);
        }
    };

    const modules = ['booking', 'quote', 'followup', 'retention', 'upsell', 'campaigns', 'social', 'analytics', 'chatbot'] as const;
    const taglines = [0, 1, 2, 3, 4] as const;

    // Feature data structure mapping to translations
    const featuresList = modules.map(key => ({
        key,
        icon: getIcon(key)
    }));

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20" style={{ background: 'linear-gradient(to bottom, #003A77, #005FAD, #19C7D8)' }}>
                {/* Background Decorations - Adjusted to be more subtle or white-ish to blend with new gradient */}
                <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse delay-700"></div>

                <div className="w-full max-w-[1200px] mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <motion.div
                            className="w-full lg:w-1/2 text-left"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-white font-semibold text-sm mb-6 tracking-wide uppercase backdrop-blur-sm border border-white/20">
                                {t('heroBadge')}
                            </span>
                            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-md leading-tight">
                                {t('title')}
                            </h1>
                            <p className="text-xl md:text-2xl text-blue-50 max-w-xl mb-4 font-light leading-relaxed">
                                {t('subtitle')}
                            </p>
                            <p className="text-lg text-blue-100/80 max-w-lg mb-10">
                                {t('notNormalWebsite')}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-start">
                                <Button
                                    onClick={() => handleBuy('nexaclean_core')}
                                    variant="primary"

                                    className="text-lg px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 border-none shadow-xl transform hover:scale-105 transition-all"
                                >
                                    {isLoading === 'nexaclean_core' ? 'Processing...' : t('cta')}
                                </Button>
                                <Button href="#features" variant="outline" className="text-lg px-8 py-4 text-white border-white hover:bg-white/10">
                                    {t('learnMore')}
                                </Button>
                            </div>
                        </motion.div>

                        <motion.div
                            className="w-full lg:w-1/2 flex justify-center items-center"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            {/* Floating effect or just a nice shadow */}
                            <div className="relative max-w-lg">
                                {/* Glow removed */}
                                <Image
                                    src="/nexaclean-pro-dark-01.png"
                                    alt="NexaClean Pro Dashboard"
                                    width={600}
                                    height={450}
                                    className="relative w-full h-auto transform hover:scale-[1.02] transition-transform duration-500"
                                    priority
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Modules Grid */}
            <Section id="features" className="bg-white dark:bg-nexa-dark">
                <Header
                    title={t('title')}
                    subtitle={t('description')}
                    alignment="center"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                    {featuresList.map((feature, idx) => (
                        <motion.div
                            key={feature.key}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow group"
                        >
                            <div className="w-14 h-14 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform text-blue-500">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                                {t(`modules.${feature.key}.title`)}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {t(`modules.${feature.key}.desc`)}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* Pricing Section */}
            <Section className="bg-gray-50 dark:bg-gray-900/50">
                <Header
                    title={t('pricing.title')}
                    subtitle={t('pricing.subtitle')}
                    alignment="center"
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">
                    {/* Core System */}
                    <PricingTier
                        name={t('pricing.core.name')}
                        price={t('pricing.core.price')}
                        description={t('modules.booking.desc')}
                        features={[
                            t('pricing.core.features.0'),
                            t('pricing.core.features.1'),
                            t('pricing.core.features.2'),
                            t('pricing.core.features.3'),
                            t('pricing.core.features.4'),
                        ]}
                        ctaText={isLoading === 'nexaclean_core' ? 'Processing...' : t('cta')}
                        onCtaClick={() => handleBuy('nexaclean_core')}
                        isPopular={false}
                    />

                    {/* Full System */}
                    <PricingTier
                        name={t('pricing.full.name')}
                        price={t('pricing.full.price')}
                        description={t('notNormalWebsite')}
                        features={[
                            t('pricing.full.features.0'),
                            t('pricing.full.features.1'),
                            t('pricing.full.features.2'),
                            t('pricing.full.features.3'),
                            t('pricing.full.features.4'),
                            t('pricing.full.features.5'),
                            t('pricing.full.features.6'),
                            t('pricing.full.features.7'),
                            t('pricing.full.features.8'),
                            t('pricing.full.features.9'),
                        ]}
                        ctaText={isLoading === 'nexaclean_full' ? 'Processing...' : t('cta')}
                        onCtaClick={() => handleBuy('nexaclean_full')}
                        isPopular={true}
                        badge={t('pricing.subtitle')}
                    />
                </div>

                {/* Maintenance Add-ons */}
                <div className="mt-16 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
                        <div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{t('pricing.maintenance.name')}</h4>
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">{t('pricing.maintenance.price')}</div>
                            <ul className="space-y-2 mb-4">
                                <li className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                                    <span className="text-green-500">✓</span> {t('pricing.maintenance.features.0')}
                                </li>
                                <li className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                                    <span className="text-green-500">✓</span> {t('pricing.maintenance.features.1')}
                                </li>
                                <li className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                                    <span className="text-green-500">✓</span> {t('pricing.maintenance.features.2')}
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700/50 flex flex-col justify-between relative overflow-hidden">
                        <div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{t('pricing.maintenanceSocial.name')}</h4>
                            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">{t('pricing.maintenanceSocial.price')}</div>
                            <ul className="space-y-2 mb-4">
                                <li className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                                    <span className="text-green-500">✓</span> {t('pricing.maintenanceSocial.features.0')}
                                </li>
                                <li className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                                    <span className="text-green-500">✓</span> {t('pricing.maintenanceSocial.features.1')}
                                </li>
                                <li className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                                    <span className="text-green-500">✓</span> {t('pricing.maintenanceSocial.features.2')}
                                </li>
                            </ul>
                        </div>
                        <div className="absolute top-0 right-0 p-2">
                            <span className="text-xs font-bold bg-white dark:bg-gray-800 text-purple-600 px-2 py-1 rounded shadow-sm">POPULAR</span>
                        </div>
                    </div>

                </div>
            </Section>

            {/* Who Is This For Section */}
            <Section className="bg-gray-50 dark:bg-gray-900/50 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        {t('whoIsFor.title')}
                    </h2>
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center">
                                <span className="font-medium text-gray-700 dark:text-gray-300">{t(`whoIsFor.list.${i}`)}</span>
                            </div>
                        ))}
                    </div>
                    <p className="mt-10 text-xl font-bold text-gray-900 dark:text-white">
                        {t('whoIsFor.tagline')}
                    </p>
                </div>
            </Section>
            {/* Taglines Carousel / Grid */}
            <Section className="bg-white dark:bg-nexa-dark py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {taglines.map((idx) => (
                            <div key={idx} className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800 text-center hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-default">
                                <p className="text-lg font-medium text-gray-800 dark:text-gray-200">&quot;{t(`taglines.${idx}`)}&quot;</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-16 text-center">
                        <h2 className="text-3xl font-bold mb-6">
                            {t('pricing.subtitle')}
                        </h2>
                        <Button href="/contact" variant="primary" className="px-12 py-4 text-lg">
                            {t('pricing.subtitle')}
                        </Button>
                    </div>
                </div>
            </Section>
        </div>
    );
}

function getIcon(key: string) {
    switch (key) {
        case 'booking': return '📅';
        case 'quote': return '💰';
        case 'followup': return '🔄';
        case 'retention': return '🤝';
        case 'upsell': return '⭐';
        case 'campaigns': return '📧';
        case 'social': return '📱';
        case 'analytics': return '📊';
        case 'chatbot': return '🤖';
        default: return '✨';
    }
}
