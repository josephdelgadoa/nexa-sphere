import React from "react";
import Section from "../Section";
import Button from "../Button";

import { useTranslations } from 'next-intl';

const AISection = () => {
    const t = useTranslations('AISection');

    return (
        <Section background="dark" className="relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                <div className="order-2 lg:order-1">
                    <div className="relative rounded-xl overflow-hidden border border-gray-700 shadow-2xl bg-gray-900/50 backdrop-blur-sm">
                        {/* Mock UI of AI Interface */}
                        <div className="p-4 border-b border-gray-700 flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <div className="ml-4 text-xs text-gray-400 font-mono">{t('assistantName')}</div>
                        </div>
                        <div className="p-6 space-y-4 font-mono text-sm">
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">AI</div>
                                <div className="flex-1 bg-gray-800 rounded-lg p-3 text-gray-300">
                                    {t('assistantGreeting')}
                                </div>
                            </div>
                            <div className="flex gap-4 flex-row-reverse">
                                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white">You</div>
                                <div className="flex-1 bg-primary/10 rounded-lg p-3 text-white">
                                    {t('userQuery')}
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">AI</div>
                                <div className="flex-1 bg-gray-800 rounded-lg p-3 text-gray-300">
                                    <p className="mb-2" dangerouslySetInnerHTML={{ __html: t.raw('aiResponse') }}></p>
                                    <div className="flex gap-2 mt-2">
                                        <span className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded text-xs border border-blue-800">{t('tagResponseTime')}</span>
                                        <span className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded text-xs border border-blue-800">{t('tagAvailability')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="order-1 lg:order-2">
                    <div className="inline-block mb-4 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-800">
                        <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
                            {t('poweredBy')}
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6 text-white">
                        {t('title')}
                    </h2>
                    <p className="text-lg text-gray-400 mb-8">
                        {t('subtitle')}
                        <br />
                        {t('subtitle2')}
                    </p>

                    <ul className="space-y-4 mb-10">
                        {[
                            t('feature1'),
                            t('feature2'),
                            t('feature3'),
                        ].map((item, i) => (
                            <li key={i} className="flex items-start">
                                <svg className="w-6 h-6 text-accent mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-gray-300">{item}</span>
                            </li>
                        ))}
                    </ul>

                    <Button variant="secondary">
                        {t('cta')}
                    </Button>
                </div>
            </div>
        </Section>
    );
};

export default AISection;
