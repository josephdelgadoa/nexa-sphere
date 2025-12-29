"use client";

import React from 'react';
import Button from '@/components/Button';

export default function SocialMediaView() {
    const platforms = [
        {
            name: "YouTube",
            icon: (
                <svg className="w-8 h-8 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
            ),
            color: "border-red-500",
            bg: "bg-red-50 dark:bg-red-900/10",
            stats: [
                { label: "Subscribers", value: "---" },
                { label: "Avg. Views", value: "---" },
                { label: "Watch Time", value: "---" }
            ],
            connected: false
        },
        {
            name: "Facebook",
            icon: (
                <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            ),
            color: "border-blue-500",
            bg: "bg-blue-50 dark:bg-blue-900/10",
            stats: [
                { label: "Followers", value: "---" },
                { label: "Page Reach", value: "---" },
                { label: "Engagement", value: "---" }
            ],
            connected: false
        },
        {
            name: "Instagram",
            icon: (
                <svg className="w-8 h-8 text-pink-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            ),
            color: "border-pink-500",
            bg: "bg-pink-50 dark:bg-pink-900/10",
            stats: [
                { label: "Followers", value: "---" },
                { label: "Reach", value: "---" },
                { label: "Interactions", value: "---" }
            ],
            connected: false
        },
        {
            name: "TikTok",
            icon: (
                <svg className="w-8 h-8 text-black dark:text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.16c0 3.13-2.58 6.06-5.83 6.09-2.72.01-5.06-2.02-5.4-4.82-.41-2.91 1.56-5.8 4.67-6.22.42-.05.85-.05 1.28-.02v1.2a6.45 6.45 0 0 0-3.23 6.01c-.13 1.96 1.18 3.59 2.97 3.65 1.93.07 3.52-1.39 3.58-3.32V1.17c-1.11-.02-2.23-.03-3.35-.01-.06-.5-.96-.45-1.1-.42z" />
                </svg>
            ),
            color: "border-stone-800",
            bg: "bg-stone-50 dark:bg-stone-900/10",
            stats: [
                { label: "Followers", value: "---" },
                { label: "Video Views", value: "---" },
                { label: "Likes", value: "---" }
            ],
            connected: false
        }
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Social Media Mastery</h2>
                    <p className="text-gray-600 dark:text-gray-400">Manage and track your growth across all major platforms.</p>
                </div>
                <Button variant="primary" className="shadow-lg">
                    + Create New Post
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {platforms.map((platform) => (
                    <div
                        key={platform.name}
                        className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border-t-4 ${platform.color} flex flex-col h-full`}
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-3 rounded-lg ${platform.bg}`}>
                                {platform.icon}
                            </div>
                            <div className={`px-2 py-1 rounded text-xs font-semibold ${platform.connected ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                {platform.connected ? 'Active' : 'Not Connected'}
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{platform.name}</h3>

                        <div className="space-y-4 mb-8 flex-1">
                            {platform.stats.map((stat) => (
                                <div key={stat.label} className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2 last:border-0 last:pb-0">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</span>
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{stat.value}</span>
                                </div>
                            ))}
                        </div>

                        <Button
                            variant={platform.connected ? 'outline' : 'primary'}
                            className={`w-full justify-center ${!platform.connected && 'opacity-90 hover:opacity-100'}`}
                        >
                            {platform.connected ? 'Manage' : 'Connect Account'}
                        </Button>
                    </div>
                ))}
            </div>

            {/* Placeholder for Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Ready to go viral?</h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
                    Connect your accounts to start auto-posting AI-generated content and tracking your viral metrics in real-time.
                </p>
                <div className="flex justify-center gap-4">
                    <Button variant="outline">View Content Calendar</Button>
                    <Button variant="primary">Generate AI Content</Button>
                </div>
            </div>
        </div>
    );
}
