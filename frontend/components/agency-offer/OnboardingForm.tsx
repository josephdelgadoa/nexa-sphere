"use client";

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Button from '@/components/Button';

export default function OnboardingForm() {
    const t = useTranslations('AgencyOnboarding');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    // Form fields
    const [businessName, setBusinessName] = useState('');
    const [businessOwner, setBusinessOwner] = useState('');
    const [businessCategory, setBusinessCategory] = useState('');
    const [businessPhone, setBusinessPhone] = useState('');
    const [website, setWebsite] = useState('');
    const [socialLinks, setSocialLinks] = useState('');
    const [offerDetails, setOfferDetails] = useState('');
    const [needContentCreation, setNeedContentCreation] = useState(false);

    // Files
    const [logo, setLogo] = useState<File | null>(null);
    const [productImages, setProductImages] = useState<FileList | null>(null);
    const [otherImages, setOtherImages] = useState<FileList | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        const formData = new FormData();
        formData.append('businessName', businessName);
        formData.append('businessOwner', businessOwner);
        formData.append('businessCategory', businessCategory);
        formData.append('businessPhone', businessPhone);
        formData.append('website', website);
        formData.append('socialLinks', socialLinks);
        formData.append('offerDetails', offerDetails);
        formData.append('needContentCreation', needContentCreation ? 'true' : 'false');

        if (logo) formData.append('logo', logo);
        if (productImages) {
            Array.from(productImages).forEach(file => {
                formData.append('productImages', file);
            });
        }
        if (otherImages) {
            Array.from(otherImages).forEach(file => {
                formData.append('otherImages', file);
            });
        }

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";
            // Use fetch directly for multipart form date
            const response = await fetch(`${API_URL}/agency-onboarding`, {
                method: 'POST',
                body: formData, // No Content-Type header needed, browser sets it
            });

            if (response.ok) {
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-green-50 dark:bg-green-900/20 p-8 rounded-xl text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                    <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('successTitle')}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t('successMessage')}</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('businessName')}
                    </label>
                    <input
                        type="text"
                        id="businessName"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        required
                        placeholder={t('businessNamePlaceholder')}
                    />
                </div>
                <div>
                    <label htmlFor="businessOwner" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('businessOwner')}
                    </label>
                    <input
                        type="text"
                        id="businessOwner"
                        value={businessOwner}
                        onChange={(e) => setBusinessOwner(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        required
                        placeholder={t('businessOwnerPlaceholder')}
                    />
                </div>
                <div>
                    <label htmlFor="businessCategory" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('businessCategory')}
                    </label>
                    <input
                        type="text"
                        id="businessCategory"
                        value={businessCategory}
                        onChange={(e) => setBusinessCategory(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        required
                        placeholder={t('businessCategoryPlaceholder')}
                    />
                </div>
                <div>
                    <label htmlFor="businessPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('businessPhone')}
                    </label>
                    <input
                        type="tel"
                        id="businessPhone"
                        value={businessPhone}
                        onChange={(e) => setBusinessPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        required
                        placeholder={t('businessPhonePlaceholder')}
                    />
                </div>
            </div>

            <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('website')}
                </label>
                <input
                    type="url"
                    id="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder={t('websitePlaceholder')}
                />
            </div>

            <div>
                <label htmlFor="socialLinks" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('socialLinks')}
                </label>
                <textarea
                    id="socialLinks"
                    value={socialLinks}
                    onChange={(e) => setSocialLinks(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder={t('socialLinksPlaceholder')}
                />
            </div>

            <div>
                <label htmlFor="offerDetails" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('offerDetails')}
                </label>
                <textarea
                    id="offerDetails"
                    value={offerDetails}
                    onChange={(e) => setOfferDetails(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    required
                    placeholder={t('offerDetailsPlaceholder')}
                />
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('files')}</h4>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t('logo')}
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setLogo(e.target.files ? e.target.files[0] : null)}
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-primary/10 file:text-primary
                                hover:file:bg-primary/20"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t('productImages')}
                        </label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => setProductImages(e.target.files)}
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-primary/10 file:text-primary
                                hover:file:bg-primary/20"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t('otherImages')}
                        </label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => setOtherImages(e.target.files)}
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-primary/10 file:text-primary
                                hover:file:bg-primary/20"
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            id="needContentCreation"
                            type="checkbox"
                            checked={needContentCreation}
                            onChange={(e) => setNeedContentCreation(e.target.checked)}
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <label htmlFor="needContentCreation" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            {t('needContentCreation')}
                        </label>
                    </div>
                </div>
            </div>

            {status === 'error' && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
                    {t('errorMessage')}
                </div>
            )}

            <Button
                type="submit"
                variant="primary"
                className="w-full flex justify-center py-3"
                disabled={status === 'loading'}
            >
                {status === 'loading' ? t('submitting') : t('submit')}
            </Button>
        </form>
    );
}
