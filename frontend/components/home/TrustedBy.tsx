import React from "react";

import { useTranslations } from 'next-intl';

const TrustedBy = () => {
    const t = useTranslations('TrustedBy');
    const companies = [
        "TechCorp", "InnovateX", "FutureScale", "DataFlow", "CloudNine"
    ];

    return (
        <div className="py-10 border-y border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
            <div className="container mx-auto px-4 text-center">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-6 uppercase tracking-widest">
                    {t('title')}
                </p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {companies.map((company) => (
                        <span key={company} className="text-xl md:text-2xl font-bold font-heading text-gray-400 dark:text-gray-500">
                            {company}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrustedBy;
