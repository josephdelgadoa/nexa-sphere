"use client";

import React from 'react';

interface PlaceholderViewProps {
    title: string;
    icon: string;
}

export default function PlaceholderView({ title, icon }: PlaceholderViewProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
            <div className="w-24 h-24 bg-gray-50 dark:bg-gray-700/50 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl filter grayscale opacity-50">{icon}</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {title} Coming Soon
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
                This module is currently under development. Please check back later for updates on your marketing campaigns.
            </p>
            <button className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-medium hover:opacity-90 transition-opacity">
                Notify me when ready
            </button>
        </div>
    );
}
