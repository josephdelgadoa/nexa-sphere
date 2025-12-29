import React from "react";
import { ArrowRight, CheckCircle2, Bot, Sliders, Box } from "lucide-react";
import Section from "../Section";



import { useTranslations } from 'next-intl';

const Process = () => {
    const t = useTranslations('Process');

    const steps = [
        { number: "01", key: "discovery" },
        { number: "02", key: "strategy" },
        { number: "03", key: "development" },
        { number: "04", key: "deployment" },
    ];

    return (
        <Section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6 text-gray-900 dark:text-white">
                        {t('title')}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                        {t('subtitle')}
                    </p>
                    <div className="space-y-8">
                        {steps.map((step, index) => (
                            <div key={index} className="flex gap-6">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary font-bold font-heading text-xl">
                                    {step.number}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold font-heading mb-2 text-gray-900 dark:text-white">
                                        {t(`${step.key}Title`)}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {t(`${step.key}Desc`)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl blur-3xl transform rotate-3"></div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md border border-gray-100 dark:border-gray-700 h-full relative z-10 transition-transform duration-300 group-hover:-translate-y-1">
                        {/* Abstract visual representation of process */}
                        <div className="aspect-square rounded-lg bg-gray-100 dark:bg-gray-900 flex items-center justify-center overflow-hidden relative">
                            <div className="absolute inset-0 bg-[url('/ai-methodology.jpeg')] bg-cover bg-center"></div>
                            <div className="absolute inset-0 bg-primary/10 backdrop-blur-sm z-10"></div>
                            <div className="relative z-20 text-center p-6">
                                <Box className="w-16 h-16 text-primary mx-auto mb-4" />
                                <h3 className="text-xl font-bold font-heading mb-2 text-gray-900 dark:text-white">Agile Process</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Iterative, data-driven development.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Process;
