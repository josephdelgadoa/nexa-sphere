import React from 'react';
import Link from 'next/link';
import OnboardingForm from '@/components/agency-offer/OnboardingForm';
import { useTranslations } from 'next-intl';

export default function SuccessPage() {
    const t = useTranslations('AgencyOnboarding');

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center pt-32 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl w-full space-y-8 bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-3xl shadow-xl">
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
                        <svg className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white font-heading mb-4">
                        {t('title')}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                        {t('description')}
                    </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 sm:p-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold mr-3">1</span>
                        {t('formTitle')}
                    </h3>
                    <OnboardingForm />
                </div>

                <div className="text-center pt-4">
                    <Link
                        href="/"
                        className="text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                        {t('returnHome')}
                    </Link>
                </div>
            </div>
        </div>
    );
}
