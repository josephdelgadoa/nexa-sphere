"use client";

import React from 'react';
import LocaleSwitcher from './LocaleSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { Globe, User, HelpCircle } from 'lucide-react';

const TopBar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = React.useTransition();
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const changeLocale = (nextLocale: string) => {
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
        setIsOpen(false);
    };

    return (
        <div className="hidden md:flex fixed top-0 left-0 right-0 bg-[#F4F4F4] text-[#333333] h-10 px-4 sm:px-6 lg:px-8 text-xs font-medium justify-end items-center space-x-6 z-[60] border-b border-gray-200">
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="hover:text-primary hover:underline flex items-center gap-1 transition-colors"
                >
                    <Globe className="w-3 h-3" />
                    Global | {locale === 'en' ? 'US' : locale === 'es' ? 'ES' : locale.toUpperCase()}
                </button>

                {isOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200 py-1 text-gray-700 z-50">
                        <button
                            onClick={() => changeLocale('en')}
                            className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${locale === 'en' ? 'font-bold text-primary' : ''}`}
                        >
                            English (US)
                        </button>
                        <button
                            onClick={() => changeLocale('es')}
                            className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${locale === 'es' ? 'font-bold text-primary' : ''}`}
                        >
                            Español (ES)
                        </button>
                    </div>
                )}
            </div>

            <Link href="/contact" className="hover:text-primary hover:underline flex items-center gap-1 transition-colors">
                <HelpCircle className="w-3 h-3" />
                Support
            </Link>
            <Link href="/login" className="hover:text-primary hover:underline flex items-center gap-1 transition-colors">
                <User className="w-3 h-3" />
                Log In
            </Link>
        </div>
    );
};

export default TopBar;
