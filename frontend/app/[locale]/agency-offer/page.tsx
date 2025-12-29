"use client";

import React from "react";
import Section from "@/components/Section";
import Button from "@/components/Button";
import PricingTier from "@/components/PricingTier";
import FAQAccordion from "@/components/FAQAccordion";
import { useTranslations, useLocale } from "next-intl";

export default function AgencyOfferPage() {
    const t = useTranslations('AgencyOfferPage');
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
                window.location.assign(data.url);
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

    const packages = [
        {
            key: 'agency_ignite',
            isPopular: false
        },
        {
            key: 'agency_growth',
            isPopular: true
        },
        {
            key: 'agency_dominator',
            isPopular: false
        },
        {
            key: 'agency_elite',
            isPopular: false
        }
    ];

    const faqItems = Array.from({ length: 12 }, (_, i) => ({
        question: t(`faq.q${i + 1}`),
        answer: t(`faq.a${i + 1}`)
    }));

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            {/* Hero Section */}
            <Section className="relative pt-40 pb-32 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/ai_concierge_bg.png"
                        alt="Agency Offer Hero Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-[2px]" />
                </div>

                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 dark:opacity-10 z-0" />

                <div className="text-center max-w-4xl mx-auto mb-16 relative z-10 px-4">
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 tracking-wide uppercase backdrop-blur-sm border border-primary/20">
                        Limited Time Offer
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight text-gray-900 dark:text-white drop-shadow-sm">
                        {t('title')}
                    </h1>
                    <p className="text-xl md:text-2xl text-primary font-semibold mb-6">
                        {t('subtitle')}
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-200 max-w-2xl mx-auto font-medium">
                        {t('description')}
                    </p>
                </div>

                {/* Pricing Grid */}
                <div id="pricing" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 scroll-mt-24">
                    {packages.map((pkg) => (
                        <PricingTier
                            key={pkg.key}
                            name={t(`packages.${pkg.key}.name`)}
                            price={t(`packages.${pkg.key}.price`)}
                            description={t(`packages.${pkg.key}.description`)}
                            features={[
                                t(`packages.${pkg.key}.f1`),
                                t(`packages.${pkg.key}.f2`),
                                t(`packages.${pkg.key}.f3`),
                                t(`packages.${pkg.key}.f4`)
                            ]}
                            ctaText={isLoading === pkg.key ? 'Processing...' : t('cta')}
                            badge={t(`packages.${pkg.key}.badge`)}
                            isPopular={pkg.isPopular}
                            onCtaClick={() => handleBuy(pkg.key)}
                        />
                    ))}
                </div>
            </Section>

            {/* FAQ Section */}
            <Section className="bg-white dark:bg-black">
                <FAQAccordion
                    items={faqItems}
                    title={t('faqTitle')}
                    subtitle={t('faqSubtitle')}
                />
            </Section>

            {/* Final CTA */}
            <Section className="bg-gray-50 dark:bg-gray-900 text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold font-heading mb-6">
                        {t('subtitle')}
                    </h2>
                    <Button href="#pricing" variant="primary">
                        {t('cta')}
                    </Button>
                </div>
            </Section>
        </div>
    );
}
