"use client";

import React, { useState } from "react";
import { useTranslations } from 'next-intl';
import Section from "../Section";
import Button from "../Button";
import Link from "next/link";
import { servicesList } from "@/lib/constants";



const ServicesOverview = () => {
    const t = useTranslations('ServicesOverview');
    // We need to access ServicesPage translations for the specific service details to ensure consistency
    const tServices = useTranslations('ServicesPage');

    // Display only the first 3 services
    const displayedServices = servicesList.slice(0, 3);

    return (
        <Section id="services" background="gray">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-gray-900 dark:text-white">
                    {t('title')}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                    {t('subtitle')}
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedServices.map((service) => {
                        const title = tServices(`services.${service.id}.title`);
                        return (
                            <div key={service.id} className="group relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:-translate-y-1 flex flex-col h-full">
                                {/* Image Overlay/Header */}
                                <div className="relative h-48 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
                                    <img
                                        src={service.image}
                                        alt={title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                    />
                                    {/* Icon Badge - Floating */}
                                    <div className="absolute -bottom-6 right-6 z-20">
                                        <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center text-2xl shadow-lg border border-gray-100 dark:border-gray-700 group-hover:scale-110 transition-transform duration-300">
                                            {service.icon}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 pt-10 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold font-heading mb-3 text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed line-clamp-3">
                                        {tServices(`services.${service.id}.description`)}
                                    </p>

                                    <div className="mt-auto">
                                        <Button
                                            href="/services"
                                            variant="primary"
                                            className="w-full py-2 text-sm font-semibold rounded-xl"
                                        >
                                            {t('learnMore')}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="mt-12 text-center">
                <Link href="/services" className="inline-flex items-center text-primary font-semibold hover:text-blue-700 transition-colors text-lg">
                    {t('viewAll')}
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
            </div>
        </Section>
    );
};

export default ServicesOverview;
