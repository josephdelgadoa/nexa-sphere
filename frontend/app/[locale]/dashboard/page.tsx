"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import CustomersView from '@/components/dashboard/views/CustomersView';
import SalesView from '@/components/dashboard/views/SalesView';
import MarketingView from '@/components/dashboard/views/MarketingView';
import SocialMediaView from '@/components/dashboard/views/SocialMediaView';
import EmailMarketingView from '@/components/dashboard/views/EmailMarketingView';
import PlaceholderView from '@/components/dashboard/views/PlaceholderView';

export default function DashboardPage() {
    const router = useRouter();
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [activeView, setActiveView] = useState('customers');

    useEffect(() => {
        const checkAuth = () => {
            const isAuthenticated = localStorage.getItem('isAuthenticated');
            if (!isAuthenticated) {
                router.push('/login');
            } else {
                setCheckingAuth(false);
            }
        };
        checkAuth();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        router.push('/login');
    };

    if (checkingAuth) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 justify-center items-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-500">Authenticating...</p>
                </div>
            </div>
        );
    }

    const getViewTitle = () => {
        switch (activeView) {
            case 'customers': return 'Customer Management';
            case 'sales': return 'Sales Performance';
            case 'marketing': return 'Marketing Campaigns';
            case 'sm-marketing': return 'Social Media Marketing';
            case 'email-marketing': return 'Email Marketing';
            default: return 'Dashboard';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
            {/* Sidebar */}
            <Sidebar activeView={activeView} onViewChange={setActiveView} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
                <Header title={getViewTitle()} onLogout={handleLogout} />

                <main className="flex-1 p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        {activeView === 'customers' && <CustomersView />}
                        {activeView === 'sales' && <SalesView />}
                        {activeView === 'marketing' && <MarketingView />}
                        {activeView === 'sm-marketing' && <SocialMediaView />}
                        {activeView === 'email-marketing' && <EmailMarketingView />}
                    </div>
                </main>
            </div>
        </div>
    );
}
