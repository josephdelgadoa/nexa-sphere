"use client";

import React, { useState } from "react";
import Section from "@/components/Section";
import Button from "@/components/Button";
import CTA from "@/components/home/CTA";
import CaseStudies from "@/components/CaseStudies";
import { useTranslations } from "next-intl";
import { Check, Zap, Globe, MessageSquare, Mail, BarChart3, Rocket, Star, TrendingUp } from "lucide-react";

export default function ServicesPage() {
    const t = useTranslations('ServicesBundles');

    const bundles = ['starter', 'growth', 'dominator'] as const;

    const getBundleIcon = (key: string) => {
        switch (key) {
            case 'starter': return <Rocket className="w-6 h-6" />;
            case 'growth': return <TrendingUp className="w-6 h-6" />;
            case 'dominator': return <Star className="w-6 h-6" />;
            default: return <Zap className="w-6 h-6" />;
        }
    };

    const getBundleStyles = (key: string) => {
        switch (key) {
            case 'starter':
                return {
                    border: 'border-green-200 dark:border-green-900',
                    badge: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
                    iconBg: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
                    hover: 'hover:border-green-300 dark:hover:border-green-700 hover:shadow-green-100 dark:hover:shadow-green-900/10'
                };
            case 'growth':
                return {
                    border: 'border-blue-200 dark:border-blue-900',
                    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
                    iconBg: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
                    hover: 'hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-blue-100 dark:hover:shadow-blue-900/10'
                };
            case 'dominator':
                return {
                    border: 'border-purple-200 dark:border-purple-900',
                    badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
                    iconBg: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
                    hover: 'hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-purple-100 dark:hover:shadow-purple-900/10'
                };
            default: return {};
        }
    };

    const [loadingBundle, setLoadingBundle] = useState<string | null>(null);
    const [maintenanceSelected, setMaintenanceSelected] = useState<Record<string, boolean>>({});

    const toggleMaintenance = (bundleId: string) => {
        setMaintenanceSelected(prev => ({
            ...prev,
            [bundleId]: !prev[bundleId]
        }));
    };

    const getMaintenancePrice = (key: string) => {
        switch (key) {
            case 'starter': return "$100/mo";
            case 'growth': return "$300/mo";
            case 'dominator': return "$500/mo";
            default: return "";
        }
    };

    const handleCheckout = async (bundleId: string) => {
        try {
            setLoadingBundle(bundleId);
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bundleId,
                    includeMaintenance: maintenanceSelected[bundleId] || false
                }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error('Checkout error:', data.error);
                setLoadingBundle(null);
            }
        } catch (error) {
            console.error('Checkout error:', error);
            setLoadingBundle(null);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-black">
            {/* Hero Section */}
            <Section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/20 dark:to-black" />
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 dark:opacity-10" />
                </div>

                <div className="text-center max-w-4xl mx-auto relative z-10 px-4">
                    <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 text-gray-900 dark:text-white tracking-tight">
                        {t('title')}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 font-medium">
                        {t('subtitle')}
                    </p>
                </div>
            </Section>

            {/* Bundles Grid */}
            <Section className="py-12 bg-gray-50 dark:bg-black/50">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 z-10 relative">
                    {bundles.map((bundleKey) => {
                        const styles = getBundleStyles(bundleKey);
                        const bundleData = t.raw(`bundles.${bundleKey}`);
                        const isMaintenanceSelected = maintenanceSelected[bundleKey] || false;

                        return (
                            <div
                                key={bundleKey}
                                className={`relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg transition-all duration-300 border-2 flex flex-col ${styles.border} ${styles.hover}`}
                            >
                                <div className="p-8 flex-grow flex flex-col">
                                    {/* Header */}
                                    <div className="mb-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className={`inline-block py-1 px-3 rounded-full text-xs font-bold uppercase tracking-wider ${styles.badge}`}>
                                                {bundleData.badge}
                                            </span>
                                            <div className={`p-2 rounded-xl ${styles.iconBg}`}>
                                                {getBundleIcon(bundleKey)}
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                            {bundleData.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {bundleData.goal}
                                        </p>
                                    </div>

                                    {/* Price */}
                                    <div className="mb-8">
                                        <div className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
                                            {bundleData.price}
                                        </div>
                                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            One-time payment
                                        </div>
                                    </div>

                                    {/* Short Features List */}
                                    <div className="space-y-4 mb-8 flex-grow">
                                        {bundleData.shortFeatures.map((feature: string, i: number) => (
                                            <div key={i} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                                                <Check className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0" />
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Maintenance Checkbox */}
                                    <div
                                        className="mb-6 flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                        onClick={() => toggleMaintenance(bundleKey)}
                                    >
                                        <div className={`w-5 h-5 rounded border mr-3 flex items-center justify-center transition-colors ${isMaintenanceSelected
                                            ? 'bg-blue-600 border-blue-600'
                                            : 'border-gray-400 dark:border-gray-600'
                                            }`}>
                                            {isMaintenanceSelected && <Check className="w-3.5 h-3.5 text-white" />}
                                        </div>
                                        <div className="text-sm">
                                            <span className="font-medium text-gray-900 dark:text-gray-200">
                                                Add Maintenance
                                            </span>
                                            <span className="text-gray-500 dark:text-gray-400 ml-1">
                                                (+ {getMaintenancePrice(bundleKey)})
                                            </span>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={() => handleCheckout(bundleKey)}
                                        variant="primary"
                                        disabled={loadingBundle === bundleKey}
                                        className="w-full justify-center py-4 text-base shadow-lg hover:shadow-xl transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                                        href={undefined}
                                    >
                                        {loadingBundle === bundleKey ? (
                                            <span className="flex items-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Processing...
                                            </span>
                                        ) : t('cta')}
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Section>

            {/* Comparison Table Section */}
            <Section className="py-20 bg-white dark:bg-black relative">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-gray-900 dark:text-white">
                            {t('comparison.title')}
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            {t('comparison.subtitle')}
                        </p>
                    </div>

                    <div className="relative rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl">
                        {/* Decorative background glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-24 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />

                        <div className="overflow-x-auto pt-4">
                            <table className="w-full text-left border-collapse min-w-[900px]">
                                <thead>
                                    <tr>
                                        <th className="p-6 border-b border-gray-200 dark:border-gray-800 text-lg font-bold text-gray-900 dark:text-gray-100 min-w-[250px]">
                                            <span className="text-gray-400 dark:text-gray-500 uppercase text-xs tracking-widest font-medium">Features</span>
                                        </th>

                                        {/* Starter Header */}
                                        <th className="p-6 border-b border-green-100 dark:border-green-900/50 bg-green-50/30 dark:bg-green-900/10 min-w-[220px] relative group transition-colors">
                                            <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">{t('comparison.headers.1')}</div>
                                            <div className="text-sm font-medium text-green-600 dark:text-green-400">Essential</div>
                                        </th>

                                        {/* Growth Header (Highlighted) */}
                                        <th className="p-6 border-b border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-900/20 min-w-[220px] relative">
                                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-cyan-400" />
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-lg tracking-wider">
                                                Most Popular
                                            </div>
                                            <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">{t('comparison.headers.2')}</div>
                                            <div className="text-sm font-medium text-blue-600 dark:text-blue-400">Recommended</div>
                                        </th>

                                        {/* Dominator Header */}
                                        <th className="p-6 border-b border-purple-100 dark:border-purple-900/50 bg-purple-50/30 dark:bg-purple-900/10 min-w-[220px]">
                                            <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">{t('comparison.headers.3')}</div>
                                            <div className="text-sm font-medium text-purple-600 dark:text-purple-400">Enterprise</div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {t.raw('comparison.rows').map((row: any, index: number) => {
                                        // Helper to render cell content nicely
                                        const renderCell = (content: string, themeColor: string) => {
                                            if (content === '—') {
                                                return <span className="text-gray-300 dark:text-gray-700 font-light">—</span>;
                                            }
                                            // Check if it's a negative or "No" value? Assuming not for now based on JSON
                                            return (
                                                <span className={`font-semibold ${themeColor}`}>
                                                    {content}
                                                </span>
                                            );
                                        };

                                        return (
                                            <tr key={index} className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors border-b border-gray-100 dark:border-gray-800/50 last:border-0">
                                                <td className="p-6 font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                                    {row.name}
                                                </td>

                                                {/* Starter Cell */}
                                                <td className="p-6 text-gray-600 dark:text-gray-300 bg-green-50/10 dark:bg-green-900/5 group-hover:bg-green-50/20 dark:group-hover:bg-green-900/10 transition-colors">
                                                    {renderCell(row.starter, 'text-gray-900 dark:text-gray-100')}
                                                </td>

                                                {/* Growth Cell (Highlighted) */}
                                                <td className="p-6 text-gray-600 dark:text-gray-300 bg-blue-50/20 dark:bg-blue-900/10 border-x border-blue-100/50 dark:border-blue-900/20 group-hover:bg-blue-50/30 dark:group-hover:bg-blue-900/20 transition-colors relative">
                                                    <div className="relative z-10">
                                                        {renderCell(row.growth, 'text-blue-900 dark:text-blue-100')}
                                                    </div>
                                                </td>

                                                {/* Dominator Cell */}
                                                <td className="p-6 text-gray-600 dark:text-gray-300 bg-purple-50/10 dark:bg-purple-900/5 group-hover:bg-purple-50/20 dark:group-hover:bg-purple-900/10 transition-colors">
                                                    {renderCell(row.dominator, 'text-gray-900 dark:text-gray-100')}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                            Need a custom package? We specialize in tailoring AI solutions for enterprise needs.
                        </p>
                        <Button href="/contact" variant="secondary">
                            Contact Sales
                        </Button>
                    </div>
                </div>
            </Section>

            <CaseStudies />
            <CTA />
        </div>
    );
}
