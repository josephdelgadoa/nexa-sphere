"use client";

import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

interface Submission {
    id: string;
    timestamp: string;
    businessName: string;
    businessOwner: string;
    businessCategory: string;
    businessPhone: string;
    website: string;
    socialLinks: string;
    offerDetails: string;
    needContentCreation: string; // "true" or "false" string from formData
    files: {
        logo: string | null;
        productImages: string[];
        otherImages: string[];
    };
}

export default function CustomersView() {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";
                const response = await fetch(`${API_URL}/agency-onboarding`);
                const data = await response.json();
                setSubmissions(data.reverse()); // Show newest first
            } catch (error) {
                console.error("Error fetching submissions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, []);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";
    const getImageUrl = (filename: string) => `${API_URL.replace('/api', '')}/uploads/${filename}`;

    if (loading) {
        return (
            <div className="w-full h-96 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-500">Loading customer data...</p>
                </div>
            </div>
        );
    }

    if (submissions.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 text-center border border-dashed border-gray-300 dark:border-gray-700">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">👥</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No customers found</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                    New agency onboarding submissions will appear here once they are submitted via the website.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    Recent Submissions <span className="text-gray-400 font-normal ml-2">({submissions.length})</span>
                </h2>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700">
                        Export CSV
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-lg shadow-blue-500/20">
                        + Add Manually
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                {submissions.map((sub) => (
                    <div key={sub.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="bg-gray-50/50 dark:bg-gray-900/30 px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center flex-wrap gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/30">
                                    {sub.businessName.charAt(0)}
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">{sub.businessName}</h2>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <span>ID: #{sub.id.slice(0, 8)}</span>
                                        <span>•</span>
                                        <span>{format(new Date(sub.timestamp), 'PPpp')}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 uppercase tracking-wide">
                                    {sub.businessCategory}
                                </div>
                                <div className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200 uppercase tracking-wide">
                                    Active
                                </div>
                            </div>
                        </div>

                        <div className="p-6 grid grid-cols-1 xl:grid-cols-3 gap-8">
                            <div className="xl:col-span-1 space-y-6 border-r border-gray-100 dark:border-gray-700 pr-0 xl:pr-8">
                                <div>
                                    <h3 className="text-xs font-semibold uppercase text-gray-400 mb-4 tracking-wider">Contact Information</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 text-sm">👤</div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">{sub.businessOwner}</div>
                                                <div className="text-xs text-gray-500">Business Owner</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 text-sm">📞</div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">{sub.businessPhone}</div>
                                                <div className="text-xs text-gray-500">Phone Number</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 text-sm">🌐</div>
                                            <div className="overflow-hidden">
                                                <a href={sub.website} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 hover:text-blue-500 truncate block transition-colors">
                                                    {sub.website}
                                                </a>
                                                <div className="text-xs text-gray-500">Website</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xs font-semibold uppercase text-gray-400 mb-3 tracking-wider">Social Presence</h3>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                                        {sub.socialLinks || "No links provided"}
                                    </p>
                                </div>
                            </div>

                            <div className="xl:col-span-2 space-y-6">
                                <div>
                                    <h3 className="text-xs font-semibold uppercase text-gray-400 mb-3 tracking-wider">Strategic Overview</h3>
                                    <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 p-5 rounded-xl">
                                        <h4 className="text-sm font-bold text-blue-900 dark:text-blue-300 mb-2">Main Offer / Value Proposition</h4>
                                        <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                                            {sub.offerDetails}
                                        </p>
                                    </div>
                                </div>

                                {sub.needContentCreation === 'true' && (
                                    <div className="flex items-center gap-3 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 px-4 py-3 rounded-lg border border-yellow-200 dark:border-yellow-900/30">
                                        <span className="text-xl">🎨</span>
                                        <div>
                                            <div className="font-bold text-sm">Content Creation Required</div>
                                            <div className="text-xs opacity-80">Client requested assistance with asset creation.</div>
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <h3 className="text-xs font-semibold uppercase text-gray-400 mb-4 tracking-wider">Digital Assets Gallery</h3>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {/* Logo */}
                                        <div className="col-span-1">
                                            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 relative group">
                                                {sub.files.logo ? (
                                                    <img src={getImageUrl(sub.files.logo)} alt="Logo" className="w-full h-full object-contain p-4" />
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center h-full text-xs text-gray-400">
                                                        <span>No Logo</span>
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <span className="text-white text-xs font-bold uppercase tracking-wider">Logo</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Product Images */}
                                        {sub.files.productImages.map((filename, idx) => (
                                            <a key={`prod-${idx}`} href={getImageUrl(filename)} target="_blank" rel="noopener noreferrer" className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 relative group block">
                                                <img src={getImageUrl(filename)} alt="Product" className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <span className="text-white text-xs font-bold uppercase tracking-wider">View</span>
                                                </div>
                                            </a>
                                        ))}

                                        {/* Other Images */}
                                        {sub.files.otherImages.map((filename, idx) => (
                                            <a key={`other-${idx}`} href={getImageUrl(filename)} target="_blank" rel="noopener noreferrer" className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 relative group block">
                                                <img src={getImageUrl(filename)} alt="Other" className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <span className="text-white text-xs font-bold uppercase tracking-wider">View</span>
                                                </div>
                                            </a>
                                        ))}
                                    </div>

                                    {!sub.files.logo && sub.files.productImages.length === 0 && sub.files.otherImages.length === 0 && (
                                        <div className="text-sm text-gray-500 italic mt-2">No assets uploaded for this client.</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
