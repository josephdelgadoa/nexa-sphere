import React from "react";
import Section from "../Section";
import Button from "../Button";

import { useTranslations } from 'next-intl';

const CTA = () => {
    const t = useTranslations('CTASection');

    return (
        <Section className="relative overflow-hidden py-24">
            <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 -skew-y-2 transform origin-top-left scale-110"></div>

            <div className="relative z-10 text-center max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-gray-900 dark:text-white">
                    {t('title')}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
                    {t('subtitle')}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button href="/contact" variant="primary" className="w-full sm:w-auto text-lg px-10 py-4 shadow-xl shadow-primary/20">
                        {t('primaryBtn')}
                    </Button>
                    <Button href="/services" variant="outline" className="w-full sm:w-auto text-lg px-10 py-4">
                        {t('secondaryBtn')}
                    </Button>
                </div>

                <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                    {t('note')}
                </p>
            </div>
        </Section>
    );
};

export default CTA;
