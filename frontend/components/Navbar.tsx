"use client";

import React, { useState, useEffect } from "react";
import { Link } from '@/i18n/routing'; // Use locale-aware Link
import Button from "./Button";
import { ThemeToggle } from "./ThemeToggle";
import { useTranslations } from 'next-intl';
import LocaleSwitcher from "./LocaleSwitcher";

const Navbar = () => {
    const t = useTranslations('Navbar');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "home", href: "/" },
        {
            name: "products",
            href: "#",
            children: [
                { name: "NexaClean Pro", href: "/products/nexaclean-pro" }
            ]
        },
        { name: "services", href: "/services" },
        { name: "about", href: "/about" },
        { name: "blog", href: "/blog" },
        { name: "contact", href: "/contact" },
    ];

    const handleMouseEnter = (name: string) => {
        setActiveDropdown(name);
    };

    const handleMouseLeave = () => {
        setActiveDropdown(null);
    };

    return (
        <nav
            className={`fixed top-0 md:top-10 left-0 right-0 z-40 transition-all duration-300 h-20 border-b border-gray-200 dark:border-white/5 bg-white dark:bg-[#1B1C1D] shadow-sm`}
        >
            <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
                <Link href="/" className="flex items-center gap-2">
                    <img src="/nexasphere-logo.svg" alt="Nexa-Sphere Logo" className="w-[200px] h-auto object-contain" />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <div
                            key={link.name}
                            className="relative group h-full flex items-center"
                            onMouseEnter={() => link.children && handleMouseEnter(link.name)}
                            onMouseLeave={handleMouseLeave}
                        >
                            {link.children ? (
                                <div
                                    className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
                                >
                                    {t(link.name)}
                                    <svg className={`w-4 h-4 transition-transform ${activeDropdown === link.name ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            ) : (
                                <Link
                                    href={link.href}
                                    className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-1"
                                >
                                    {t(link.name)}
                                </Link>
                            )}

                            {/* Dropdown Menu */}
                            {link.children && (
                                <div className={`absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 transition-all duration-200 transform origin-top-left overflow-hidden ${activeDropdown === link.name ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
                                    }`}>
                                    <div className="py-2">
                                        {link.children.map((child) => (
                                            <Link
                                                key={child.name}
                                                href={child.href}
                                                className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary transition-colors"
                                            >
                                                {child.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    <ThemeToggle />
                    <Button href="/contact" variant="primary" className="px-5 py-2 text-sm">
                        {t('getStarted')}
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {isMobileMenuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-nexa-dark shadow-lg h-screen overflow-y-auto pb-20">
                    <div className="p-4 flex flex-col space-y-2">
                        {navLinks.map((link) => (
                            <div key={link.name}>
                                <div className="flex justify-between items-center">
                                    <Link
                                        href={link.href}
                                        className="text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors py-2 block w-full"
                                        onClick={(e) => {
                                            if (link.children) {
                                                e.preventDefault();
                                                setActiveDropdown(activeDropdown === link.name ? null : link.name);
                                            } else {
                                                setIsMobileMenuOpen(false);
                                            }
                                        }}
                                    >
                                        <div className="flex items-center justify-between w-full">
                                            {t(link.name)}
                                            {link.children && (
                                                <svg className={`w-5 h-5 transition-transform ${activeDropdown === link.name ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            )}
                                        </div>
                                    </Link>
                                </div>

                                {/* Mobile Dropdown */}
                                {link.children && activeDropdown === link.name && (
                                    <div className="pl-4 space-y-2 border-l-2 border-primary/20 ml-2 mb-2">
                                        {link.children.map((child) => (
                                            <Link
                                                key={child.name}
                                                href={child.href}
                                                className="block py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {child.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="pt-4 flex justify-center gap-4 border-t border-gray-100 dark:border-gray-800 mt-4">
                            <ThemeToggle />
                            <LocaleSwitcher />
                        </div>
                        <Button
                            href="/contact"
                            variant="primary"
                            className="w-full text-center mt-4"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {t('getStarted')}
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
