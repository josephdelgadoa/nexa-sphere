import React from "react";
import Section from "../Section";
import Card from "../Card";



import { useTranslations } from 'next-intl';

const Testimonials = () => {
    const t = useTranslations('Testimonials');

    const testimonials = [
        {
            id: 1,
            author: "Robin Manoogian",
            roleKey: "role1",
            avatar: "RM",
        },
        {
            id: 2,
            author: "Michael Ross",
            roleKey: "role2",
            avatar: "MR",
        },
        {
            id: 3,
            author: "Elena Rodriguez",
            roleKey: "role3",
            avatar: "ER",
        },
    ];

    return (
        <Section background="gray">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-gray-900 dark:text-white">
                    {t('title')}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                    {t('subtitle')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((item, index) => (
                    <Card key={index} className="flex flex-col h-full">
                        <div className="flex-grow mb-6">
                            <div className="flex text-yellow-400 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 italic">
                                &quot;{t(`quote${item.id}`)}&quot;
                            </p>
                        </div>
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mr-4 text-xl">
                                {item.avatar}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                                    {item.author}
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {t(item.roleKey)}
                                </p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </Section>
    );
};

export default Testimonials;
