"use client";

import React from 'react';
import { usePathname } from 'next/navigation';

interface LayoutWrapperProps {
    children: React.ReactNode;
    navbar: React.ReactNode;
    footer: React.ReactNode;
    faqAssistant: React.ReactNode;
    topBar?: React.ReactNode;
}

export default function LayoutWrapper({ children, navbar, footer, faqAssistant, topBar }: LayoutWrapperProps) {
    const pathname = usePathname();

    // Check if the current path is part of the dashboard or login
    const isDashboardOrLogin =
        pathname?.includes('/dashboard') ||
        pathname?.includes('/login');

    if (isDashboardOrLogin) {
        return <>{children}</>;
    }

    return (
        <>
            {topBar}
            {navbar}
            <main className="flex-grow pt-20 md:pt-[120px]">
                {children}
            </main>
            {faqAssistant}
            {footer}
        </>
    );
}
