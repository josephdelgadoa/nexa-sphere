"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Button from '@/components/Button';

export default function LoginPage() {
    const t = useTranslations('Login');
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === 'admin' && password === 'Cupertino05%') {
            localStorage.setItem('isAuthenticated', 'true');
            router.push('/dashboard');
        } else {
            setError(true);
        }
    };

    return (
        <div className="min-h-screen flex bg-white dark:bg-gray-900">
            {/* Left Side - Visual */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-black opacity-90" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80')] bg-cover bg-center mix-blend-overlay opacity-50" />

                <div className="relative w-full flex flex-col justify-between p-12 text-white">
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            {/* Logo Icon (Simple SVG) */}
                            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/50">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span className="text-2xl font-bold tracking-tight">Nexa-Sphere</span>
                        </div>
                    </div>

                    <div className="mb-12">
                        <h1 className="text-4xl font-bold font-heading mb-6 leading-tight">
                            Manage your digital empire <br /> with precision.
                        </h1>
                        <p className="text-gray-300 text-lg max-w-md">
                            Access client data, track marketing campaigns, and oversee your agency operations from one central hub.
                        </p>
                    </div>

                    <div className="text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} Nexa-Sphere Inc.
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold font-heading text-gray-900 dark:text-white">
                            {t('title')}
                        </h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Please enter your credentials to continue.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {t('username')}
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
                                    placeholder="Enter your username"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {t('password')}
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </span>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-sm border border-red-100 dark:border-red-900/50">
                                <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {t('error')}
                            </div>
                        )}

                        <Button type="submit" variant="primary" className="w-full py-3.5 text-base font-semibold shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all">
                            {t('signIn')}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
