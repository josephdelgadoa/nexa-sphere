"use client";

import React from 'react';
import Button from '@/components/Button';

interface HeaderProps {
    title: string;
    onLogout: () => void;
}

export default function Header({ title, onLogout }: HeaderProps) {
    return (
        <header className="h-20 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-8 sticky top-0 z-40">
            <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white font-heading">
                    {title}
                </h1>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">System Online</span>
                </div>

                <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-2" />

                <Button
                    variant="outline"
                    onClick={onLogout}
                    className="flex items-center gap-2 border-gray-200 text-gray-600 hover:text-red-500 hover:border-red-200 hover:bg-red-50 dark:hover:bg-red-900/10"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                </Button>
            </div>
        </header>
    );
}
