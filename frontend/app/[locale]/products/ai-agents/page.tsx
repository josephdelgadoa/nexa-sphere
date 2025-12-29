"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import Section from '@/components/Section';
import Header from '@/components/Header';
import Button from '@/components/Button';
import { motion } from 'framer-motion';
import { Bot, Zap, Globe, Lock, BarChart3, MessageSquareText, Layers, Brain, Rocket } from 'lucide-react';
import Image from 'next/image';

export default function AiAgentsPage() {
    const t = useTranslations('AiAgents');

    const features = [
        { key: 'context', icon: <Brain className="w-8 h-8" /> },
        { key: 'availability', icon: <Zap className="w-8 h-8" /> },
        { key: 'multimodal', icon: <Layers className="w-8 h-8" /> },
        { key: 'omnichannel', icon: <Globe className="w-8 h-8" /> },
        { key: 'security', icon: <Lock className="w-8 h-8" /> },
        { key: 'analytics', icon: <BarChart3 className="w-8 h-8" /> },
    ];

    const steps = [
        { key: 'step1', icon: <Layers className="w-6 h-6 text-blue-600" /> },
        { key: 'step2', icon: <Bot className="w-6 h-6 text-purple-600" /> },
        { key: 'step3', icon: <Rocket className="w-6 h-6 text-cyan-600" /> },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-black">
            {/* Hero Section */}
            <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/ai_agents_hero_background.png"
                        alt="AI Neural Network Background"
                        fill
                        className="object-cover opacity-40 dark:opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/50 to-white dark:from-black/30 dark:via-black/50 dark:to-black"></div>
                </div>

                <div className="w-full max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-300 font-mono text-sm mb-8 tracking-wider uppercase backdrop-blur-sm">
                            {t('heroBadge')}
                        </span>

                        {/* Normalized Font Size */}
                        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-gray-900 dark:text-white tracking-tight lead-tight">
                            {t.rich('title', {
                                highlight: (chunks) => <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">{chunks}</span>
                            })}
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
                            {t('subtitle')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <Button
                                href="/contact"
                                variant="primary"
                                className="text-lg px-8 py-4 bg-gray-900 text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 border-none shadow-xl transform hover:scale-105 transition-all font-bold"
                            >
                                {t('cta')}
                            </Button>
                            <Button href="#features" variant="outline" className="text-lg px-8 py-4 text-gray-900 dark:text-white border-gray-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/5 backdrop-blur-sm">
                                {t('learnMore')}
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Why 2026 Section - LIGHT THEME */}
            <Section className="bg-white dark:bg-gray-50 border-y border-gray-100 relative overflow-hidden">
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
                        {t('whyTitle')}
                    </h2>
                    <p className="text-2xl md:text-3xl text-gray-600 font-light italic">
                        &quot;{t('whySubtitle')}&quot;
                    </p>
                </div>
            </Section>

            {/* Benefits Grid - DARK THEME for Contrast */}
            <Section id="features" className="bg-gray-900 dark:bg-black text-white">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={feature.key}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-blue-500/50 hover:bg-gray-800 group transition-all duration-300"
                        >
                            <div className="w-14 h-14 bg-gray-900 rounded-xl flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 group-hover:text-white transition-all duration-300 shadow-lg shadow-blue-900/10">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">
                                {t(`features.${feature.key}.title`)}
                            </h3>
                            <p className="text-gray-400 leading-relaxed">
                                {t(`features.${feature.key}.desc`)}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* How It Works (Process) - LIGHT THEME */}
            <Section className="bg-gray-50 dark:bg-white border-t border-gray-200">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('process.title')}</h2>
                </div>

                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-cyan-200 -z-10"></div>

                        {steps.map((step, idx) => (
                            <motion.div
                                key={step.key}
                                className="text-center relative"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.2 }}
                            >
                                <div className="w-24 h-24 mx-auto bg-white rounded-full border-4 border-gray-100 flex items-center justify-center mb-6 shadow-xl relative z-10">
                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                                        {step.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{t(`process.${step.key}`)}</h3>
                                <p className="text-gray-600 text-sm">{t(`process.${step.key}Desc`)}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* CTA */}
            <Section className="py-24 bg-black relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/20"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
                        Ready to automate your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">business intelligence?</span>
                    </h2>
                    <Button href="/contact" variant="primary" className="px-10 py-5 text-xl font-bold bg-white text-black hover:bg-gray-100 border-none transition-transform hover:scale-105">
                        {t('cta')}
                    </Button>
                </div>
            </Section>
        </div>
    );
}
