"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQAccordionProps {
    items: FAQItem[];
    title: string;
    subtitle?: string;
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ items, title, subtitle }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="w-full max-w-4xl mx-auto py-16 px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 dark:text-white mb-4">
                    {title}
                </h2>
                {subtitle && (
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        {subtitle}
                    </p>
                )}
            </div>

            <div className="space-y-4">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:border-primary/50"
                    >
                        <button
                            onClick={() => toggleAccordion(index)}
                            className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
                        >
                            <span className="text-lg font-semibold text-gray-900 dark:text-white pr-8">
                                {item.question}
                            </span>
                            <span className={`transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}>
                                <svg
                                    className="w-6 h-6 text-primary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                        </button>

                        <AnimatePresence>
                            {activeIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <div className="px-6 pb-6 text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-4">
                                        {item.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQAccordion;
