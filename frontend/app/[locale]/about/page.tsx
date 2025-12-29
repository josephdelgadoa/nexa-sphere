import React from "react";
import Section from "@/components/Section";
import CTA from "@/components/home/CTA";
import { useTranslations } from "next-intl";

export default function AboutPage() {
    const t = useTranslations("AboutPage");

    const leadership = [
        {
            name: "Joseph Delgado",
            roleKey: "ceo",
            image: "/avatar_joseph.jpeg",
        },
        {
            name: "Eduardo Guada",
            roleKey: "cpo",
            image: "/avatar_eduardo.jpeg",
        },
        {
            name: "Yessie Quispe",
            roleKey: "people",
            image: "/avatar_yessie.jpeg",
        },
        {
            name: "Julio Garces",
            roleKey: "analyst",
            image: "/avatar_julio_professional.png",
        },
    ];

    const reasons = ['r1', 'r2', 'r3'];

    return (
        <div className="flex flex-col min-h-screen">
            <Section className="relative pt-40 pb-32 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/about_hero_bg.png"
                        alt="About Nexa-Sphere Hero Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
                </div>

                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 z-0" />

                <div className="text-center max-w-4xl mx-auto relative z-10 px-4">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-6 tracking-wide uppercase backdrop-blur-sm border border-blue-500/30">
                        {t('heroBadge')}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold font-heading mb-8 text-white tracking-tight leading-tight drop-shadow-lg">
                        {t('heroTitle')}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-light">
                        {t('heroDesc')}
                    </p>
                </div>
            </Section>



            {/* Leadership Team Section */}
            <Section>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold font-heading mb-4 text-gray-900 dark:text-white">
                        {t('leadershipTitle')}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        {t('leadershipDesc')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {leadership.map((member, index) => (
                        <div key={index} className="group relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                            <div className="aspect-[3/4] overflow-hidden relative">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="p-6 text-center relative z-10 -mt-12 bg-white dark:bg-gray-900 mx-4 rounded-2xl shadow-md group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <h3 className="text-xl font-bold font-heading mb-1 text-gray-900 dark:text-white group-hover:text-white">
                                    {member.name}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-white/90 font-medium uppercase tracking-wider">
                                    {t(`roles.${member.roleKey}`)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            <Section background="gray">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold font-heading mb-6 text-gray-900 dark:text-white">
                            {t('missionTitle')}
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                            {t('missionDesc1')}
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            {t('missionDesc2')}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-black p-6 rounded-2xl shadow-sm text-center">
                            <div className="text-4xl font-bold text-primary mb-2">50+</div>
                            <div className="text-sm text-gray-500">{t('stats.projects')}</div>
                        </div>
                        <div className="bg-white dark:bg-black p-6 rounded-2xl shadow-sm text-center">
                            <div className="text-4xl font-bold text-secondary mb-2">98%</div>
                            <div className="text-sm text-gray-500">{t('stats.retention')}</div>
                        </div>
                        <div className="bg-white dark:bg-black p-6 rounded-2xl shadow-sm text-center">
                            <div className="text-4xl font-bold text-accent mb-2">24/7</div>
                            <div className="text-sm text-gray-500">{t('stats.support')}</div>
                        </div>
                        <div className="bg-white dark:bg-black p-6 rounded-2xl shadow-sm text-center">
                            <div className="text-4xl font-bold text-blue-500 mb-2">10x</div>
                            <div className="text-sm text-gray-500">{t('stats.roi')}</div>
                        </div>
                    </div>
                </div>
            </Section>

            <Section>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold font-heading mb-4 text-gray-900 dark:text-white">
                        {t('whyTitle')}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        {t('whyDesc')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reasons.map((key, i) => (
                        <div key={i} className="p-8 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-primary/50 transition-colors duration-300">
                            <h3 className="text-xl font-bold font-heading mb-4 text-gray-900 dark:text-white">
                                {t(`reasons.${key}_title`)}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {t(`reasons.${key}_desc`)}
                            </p>
                        </div>
                    ))}
                </div>
            </Section>

            <CTA />
        </div>
    );
}
