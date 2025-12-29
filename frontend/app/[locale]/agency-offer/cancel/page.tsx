import React from 'react';
import Link from 'next/link';

export default function CancelPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl text-center">
                <div>
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/30">
                        <svg className="h-8 w-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white font-heading">
                        Payment Cancelled
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                        Your payment was cancelled. No charges were made. If you experienced any issues, please contact our support.
                    </p>
                </div>
                <div className="mt-8 flex gap-4">
                    <Link
                        href="/agency-offer"
                        className="w-full flex justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-full shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none transition-all duration-300"
                    >
                        Try Again
                    </Link>
                    <Link
                        href="/contact"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300"
                    >
                        Contact Support
                    </Link>
                </div>
            </div>
        </div>
    );
}
