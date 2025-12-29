import React from "react";
import Button from "@/components/Button";
import Link from "next/link";
import { getPostData } from "@/lib/blog";
import { Metadata } from "next";
import NewsletterForm from "@/components/NewsletterForm";
import "../blog.css";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostData(slug);

    return {
        title: `${post.title} | Nexa-Sphere Insights`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            publishedTime: post.date,
            authors: ["Nexa-Sphere Team"],
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostData(slug);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        datePublished: post.date,
        description: post.excerpt,
        author: {
            "@type": "Organization",
            name: "Nexa-Sphere",
        },
    };

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 pt-32 pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Main Layout Container: Max 1200px */}
            <div className="w-full max-w-[1200px] mx-auto px-4 lg:px-0 flex flex-col lg:flex-row gap-[30px]">

                {/* LEFT COLUMN: Main Content (Flex-1 to fill remaining space, roughly 900px on large screens) */}
                <main className="flex-1 w-full min-w-0">

                    {/* Navigation */}
                    <Link href="/blog" className="text-primary hover:underline mb-8 inline-block font-medium group">
                        <span className="inline-block transform group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Insights
                    </Link>

                    {/* H1 Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 text-gray-900 dark:text-white leading-tight">
                        {post.title}
                    </h1>

                    {/* Subtitle / Excerpt */}
                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                        {post.excerpt}
                    </p>

                    {/* Author/Date Meta - Keeping it minimal/clean */}
                    <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
                        <div className="font-medium text-gray-900 dark:text-white">
                            By Nexa-Sphere Team
                        </div>
                        <div className="text-gray-400">•</div>
                        <time dateTime={post.date} className="text-gray-500 dark:text-gray-400">
                            {post.formattedDate}
                        </time>
                    </div>

                    {/* Featured Image */}
                    {post.coverImage && (
                        <div className="mb-10 rounded-2xl overflow-hidden shadow-lg">
                            <img
                                src={post.coverImage}
                                alt={post.title}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    )}

                    {/* Content Body */}
                    {/* Using style override to ensure inner content fills the column width if needed, or respecting .geo-article-content typography */}
                    <article className="geo-article-content max-w-none w-full">
                        {/* Answer Capsule (GEO) */}
                        {post.answer_capsule && (
                            <div className="geo-answer-capsule mb-8">
                                <strong>Quick Answer:</strong>
                                {post.answer_capsule}
                            </div>
                        )}

                        <div
                            dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }}
                        />
                    </article>

                    {/* CTA / Rest of Content */}
                    <div className="mt-16 pt-10 border-t border-gray-200 dark:border-gray-800">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 md:p-12 text-center shadow-sm">
                            <h3 className="text-2xl md:text-3xl font-bold font-heading mb-4 text-gray-900 dark:text-white">
                                Ready to transform your business?
                            </h3>
                            <p className="mb-8 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                Leverage the strategies discussed in this article with our expert guidance.
                            </p>
                            <Button href="/contact" variant="primary" className="px-8 py-3 rounded-full shadow-lg">
                                Book a Free Consultation
                            </Button>
                        </div>
                    </div>
                </main>

                {/* RIGHT COLUMN: Sidebar (Fixed 300px) */}
                <aside className="w-full lg:w-[300px] shrink-0 space-y-8">

                    {/* Banner 1 (300x300) */}
                    <div className="w-full h-[300px] bg-gray-100 dark:bg-gray-800 rounded-xl flex flex-col items-center justify-center text-gray-400 border border-gray-200 dark:border-gray-700">
                        <span className="font-semibold mb-2">Advertisement</span>
                        <span className="text-sm">300 x 300</span>
                    </div>

                    {/* Newsletter Signup (Wrapped in dark card for contrast if form is light-styled) */}
                    <div className="p-6 bg-gray-900 rounded-xl shadow-lg relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-primary/30"></div>
                        <h4 className="text-white font-bold text-xl mb-2 relative z-10">Stay Updated</h4>
                        <p className="text-gray-300 text-sm mb-6 relative z-10">Get the latest insights and trends delivered to your inbox.</p>
                        <div className="relative z-10">
                            <NewsletterForm />
                        </div>
                    </div>

                    {/* Banner 2 (300x300) */}
                    <div className="w-full h-[300px] bg-gray-100 dark:bg-gray-800 rounded-xl flex flex-col items-center justify-center text-gray-400 border border-gray-200 dark:border-gray-700">
                        <span className="font-semibold mb-2">Advertisement</span>
                        <span className="text-sm">300 x 300</span>
                    </div>

                    {/* Additional Sidebar Content / Categories could go here */}

                </aside>

            </div>
        </div>
    );
}
