"use client";

import React from 'react';
import Link from 'next/link';

interface SidebarProps {
    activeView: string;
    onViewChange: (view: string) => void;
}

export default function Sidebar({ activeView, onViewChange }: SidebarProps) {
    const menuItems = [
        { id: 'customers', label: 'Customers', icon: '👥' },
        { id: 'sales', label: 'Sales', icon: '📈' },
        { id: 'marketing', label: 'Marketing', icon: '📢' },
        { id: 'sm-marketing', label: 'SM Marketing', icon: '📱' },
        { id: 'email-marketing', label: 'Email Marketing', icon: '📧' },
    ];

    return (
        <aside className="fixed inset-y-0 left-0 w-64 bg-slate-900 border-r border-slate-800 z-50 hidden md:flex flex-col transition-all duration-300">
            {/* Logo Area */}
            <div className="h-20 flex items-center px-8 border-b border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">Nexa-Sphere</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-4">
                    Main Menu
                </div>

                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onViewChange(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${activeView === item.id
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                    >
                        <span className="text-lg">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>

                        {activeView === item.id && (
                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        )}
                    </button>
                ))}
            </nav>

            {/* User Profile Snippet (Bottom) */}
            <div className="p-4 border-t border-slate-800">
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800/50">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
                        AD
                    </div>
                    <div>
                        <div className="text-sm font-medium text-white">Admin User</div>
                        <div className="text-xs text-slate-500">admin@nexa.com</div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
