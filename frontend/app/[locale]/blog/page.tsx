import React from "react";
import Section from "@/components/Section";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Link from "next/link";
import { getSortedPostsData } from "@/lib/blog";
import { useTranslations } from "next-intl";

import BlogHero from "@/components/BlogHero";
import Image from "next/image";

export default function BlogPage() {
    const t = useTranslations("BlogPage");
    const posts = getSortedPostsData();

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
            <BlogHero
                title={t('title')}
                subtitle={t('subtitle')}
            />

            <Section background="none" className="py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {posts.map((post) => (
                        <Card key={post.slug} className="flex flex-col h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-gray-900 border-none overflow-hidden group">
                            <div className="relative h-56 w-full overflow-hidden">
                                {post.coverImage ? (
                                    <img
                                        src={post.coverImage}
                                        alt={post.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-800 text-4xl">
                                        📰
                                    </div>
                                )}
                                <div className="absolute top-4 left-4">
                                    <span className="text-xs font-bold text-white bg-blue-600/90 backdrop-blur-sm px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4 space-x-2">
                                    <span>{post.date}</span>
                                    <span>•</span>
                                    <span>{t('readTime')}</span>
                                </div>
                                <h2 className="text-2xl font-bold font-heading mb-3 text-gray-900 dark:text-white leading-tight">
                                    <Link href={`/blog/${post.slug}`} className="hover:text-blue-500 transition-colors">
                                        {post.title}
                                    </Link>
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow text-sm leading-relaxed line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <Link href={`/blog/${post.slug}`} className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 inline-flex items-center mt-auto group-hover:underline">
                                    {t('readArticle')}
                                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </Card>
                    ))}
                </div>
            </Section>
        </div>
    );
}
