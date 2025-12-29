"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

import NewsletterForm from "./NewsletterForm";

const Footer = () => {
    const t = useTranslations("Footer");
    const pathname = usePathname();

    // Hide newsletter on success page and contact page
    const showNewsletter = !pathname?.includes('/agency-offer/success') && !pathname?.includes('/contact');

    return (
        <footer className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-16 relative overflow-hidden transition-colors duration-300">
            {/* Background Gradient - Adjusted for both themes */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-white dark:from-gray-900 dark:via-gray-900 dark:to-black z-0 opacity-80 dark:opacity-100"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-primary"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Newsletter Section */}
                {showNewsletter && (
                    <div className="mb-16 rounded-3xl p-8 md:p-12 bg-white dark:bg-gradient-to-r dark:from-primary/20 dark:to-purple-600/20 border border-gray-200 dark:border-white/10 shadow-lg dark:shadow-none">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                            <div className="text-center md:text-left max-w-xl">
                                <h3 className="text-3xl font-bold font-heading text-gray-900 dark:text-white mb-4">
                                    {t('newsletterTitle')}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-lg">
                                    {t('newsletterDesc')}
                                </p>
                            </div>
                            <div className="w-full md:w-auto">
                                <NewsletterForm />
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-gray-200 dark:border-gray-800 pt-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="text-2xl font-bold font-heading text-gray-900 dark:text-white">
                            Nexa-Sphere
                        </Link>
                        <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {t('companyDesc')}
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-6">
                            {t('servicesTitle')}
                        </h4>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/services" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                                    {t('consulting')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                                    {t('automation')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                                    {t('chatbots')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-6">
                            {t('companyTitle')}
                        </h4>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                                    {t('about')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                                    {t('blog')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                                    {t('contact')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-6">
                            {t('connectTitle')}
                        </h4>
                        <ul className="space-y-4">
                            <li>
                                <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                                    {t('linkedin')}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                                    {t('twitter')}
                                </a>
                            </li>
                            <li>
                                <a href="mailto:hello@nexa-sphere.com" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                                    {t('contactEmail')}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-16 border-t border-gray-200 dark:border-gray-800 pt-8 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                        {t('copyright', { year: new Date().getFullYear() })}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
