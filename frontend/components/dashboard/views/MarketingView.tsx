"use client";

import React, { useState } from 'react';
import Button from '@/components/Button';

export default function MarketingView() {
    const [activeCampaign, setActiveCampaign] = useState<'craigslist' | 'social_media' | 'craigslist_nexaclean'>('craigslist');

    // Craigslist Data
    const tiers = [
        {
            name: "Express Offer: Social Ignite",
            price: "$120",
            description: "Perfect for a quick boost and increasing your engagement.",
            features: [
                "1 High-Converting Ad Reel",
                "Professional Script + Copy + Hashtags",
                "Optimized for TikTok, IG & FB",
                "⚡ 48-Hour Delivery"
            ],
            color: "blue"
        },
        {
            name: "Best Value: Growth Accelerator",
            price: "$350",
            description: "Ideal for brands wanting consistent presence and real growth.",
            features: [
                "3 High-Converting Reels",
                "Professional Branding adapted to your style",
                "Sales-optimized Call to Actions",
                "🎙️ Professional Voice-over (Male/Female)"
            ],
            color: "purple"
        },
        {
            name: "For Big Players: Market Dominator",
            price: "$1,500",
            description: "Complete monthly growth system for businesses wanting to scale fast.",
            features: [
                "12 Professional Videos (1 every 2–3 days)",
                "High-Converting Landing Pages",
                "SEO Optimization for Ranking",
                "⚙️ Marketing Automations (Funnels, Nurturing)"
            ],
            color: "yellow"
        }
    ];

    const craigslistAdCopy = [
        {
            title: "🔥 LIMITED TIME: Unstoppable AI Offers to Scale Your Business",
            platform: "Craigslist > Services > Small Biz Ads",
            body: `Scale your business with our tailored growth packages. Select the perfect tier to launch, grow, or dominate your market.

🚀 **EXPRESS OFFER: Social Ignite - Only $120**
Need a quick boost? Get 1 High-Converting Ad Reel with professional script & copy. Optimized for TikTok/IG. 
⚡ 48-Hour Delivery.

💎 **BEST VALUE: Growth Accelerator - $350**
Ideal for consistent presence.
• 3 High-Converting Reels
• Custom Branding
• Sales-Optimized CTAs
• Pro Voice-over

👑 **MARKET DOMINATOR - $1,500**
The complete system for big players.
• 12 Pro Videos (Fresh content every 2-3 days)
• High-Converting Landing Pages
• SEO Optimization
• Full Marketing Automations

Don't let your competitors win. 
👉 **Reply "GROWTH" to get started instantly.**`
        },
        {
            title: "🎬 Professional Video Marketing Packages - Starting at $120",
            platform: "Craigslist > Creative Services",
            body: `Are your social media channels dead? We wake them up.

Nexa-Sphere provides high-end AI-enhanced video production for local businesses.

**Social Ignite ($120):** One killer ad reel to test the waters.
**Growth Accelerator ($350):** Three premium reels with voiceovers.
**Market Dominator ($1,500):** Full service agency replacement. We handle video, SEO, and funnels.

Stop posting boring images. Video is king.

**Visit NexaSphere.com or Reply to this ad.**`
        }
    ];

    const craigslistPrompts = [
        "A cinematic, high-energy shot of a glowing smartphone screen displaying a viral video with 'likes' and 'hearts' floating out in 3D. Purple and blue neon lighting. High tech, futuristic style.",
        "A split screen comparison: Left side black and white, boring office. Right side vibrant, colorful, futuristic office with upward trending graphs and happy team. Text overlay 'Unstoppable Growth'.",
        "A golden trophy cup with the text 'Market Dominator' etched on it, sitting on a sleek modern desk with blurred city skyline in background. Premium photography, depth of field."
    ];

    // Craigslist NexaClean Pro Data (B2B)
    const nexaCleanAds = [
        {
            title: "🚀 Turn-Key Cleaning Business System - Install < 48hrs",
            platform: "Craigslist > Services > Small Biz Ads",
            body: `Are you running a cleaning business on sticky notes and text messages? 

Stop losing leads. Start scaling.

Get the **NexaClean Pro System** installed in your business in LESS THAN 48 HOURS.

✅ **What you get:**
- AI Receptionist (Answers calls 24/7)
- Instant Auto-Quotes (Stop driving to estimates)
- Automated Scheduling & Payments
- Professional Website Upgrade

**Why NexaClean Pro?**
We don't just sell software; we install a "Growth Engine" into your business. 
Over 500+ Cleaning Owners have doubled their bookings in 30 days.

🏆 **WINNER SPECIAL:**
First 10 replies this week get FREE setup ($500 value).

👉 **Get Started Here:** http://localhost:3000/en/products/nexaclean-pro
(Or reply to this ad with "CLEAN" for a demo)`
        },
        {
            title: "Make $10k/mo Extra With Your Cleaning Biz (Automated)",
            platform: "Craigslist > Small Biz Ads",
            body: `Attention House Cleaning Business Owners:

Your admin work is killing your profits.
While you're playing phone tag, your competitor is closing deals instantly.

**NexaClean Pro** automates the busy work.
- Missed call? AI texts them back and books the job.
- Need a quote? System sends it instantly based on zip code.
- Payment? Collected automatically before you arrive.

🔥 **Installation Guarantee:**
We get you live and running in under 48 HOURS. No tech skills needed.

Don't let another lead slip away.

**Check the demo:** http://localhost:3000/en/products/nexaclean-pro`
        }
    ];

    const nexaCleanPrompts = [
        "A photo of a happy cleaning business owner holding a tablet showing 'New Booking: $350', high quality, professional lighting, realistic 8k.",
        "A split screen graphic: Left side is chaotic papers flying everywhere (red tint), Right side is a sleek futuristic dashboard with green 'All Systems Go' lights (blue tint). Text 'Chaos vs Control'.",
        "A futuristic 3D delivery box opening up to reveal a glowing organized schedule and stacks of gold coins, symbolizing the 'Turn-Key System'. Vaporwave aesthetic."
    ];

    // Social Media Data (NexaClean Pro)
    const socialMediaAds = [
        {
            platform: "Facebook / Instagram (Reels)",
            title: "Transformation Reel (Before/After)",
            body: `(Hook: Visual of a dirty, chaotic kitchen transforming into a pristine space in 2 seconds)
            
Does your cleaning business feel as chaotic as this 'Before'? 🤯

Stop drowning in scheduling and lost leads. 
Introducing **NexaClean Pro** — The AI System that cleans up your business while you clean clean homes.

✅ Auto-Booking
✅ Instant Quotes
✅ 24/7 AI Receptionist

👉 Click 'Learn More' to see the full demo. #CleaningBusiness #BusinessGrowth #AI`
        },
        {
            platform: "TikTok",
            title: "ASMR Cleaning + Business Growth",
            body: `(Visual: Satisfying ASMR cleaning footage. Overlay text appears in beat with music)

Scrubbing floors is hard work. 🧼
Managing clients shouldn't be. 📱

Get a website that works as hard as you do.
**NexaClean Pro**: 
Booking. Quotes. Payments. Done.

Link in bio to transform your business. 🚀 #CleanTok #SmallBizTip #Automation`
        },
        {
            platform: "YouTube (Shorts)",
            title: "The 'Old Way' vs 'New Way'",
            body: `(Split screen: 'Old Way' = Person stressed with paper piles. 'New Way' = Person relaxing, phone dings with 'New Booking ($250)')

Stop chasing payments. Let the system do it.
NexaClean Pro automates your entire cleaning agency.

From Lead -> Paid in 3 clicks.
Watch the full breakdown on our channel.

#CleaningService #Entrepreneur #SaaS`
        }
    ];

    const socialMediaPrompts = [
        "Hyper-realistic close-up of a sponge wiping a dirty surface, revealing a glowing digital interface underneath with booking stats. Metaphor for 'Cleaning up your business'.",
        "A futuristic glass tablet floating in a modern clean living room, displaying 'NexaClean Pro' dashboard with green checkmarks. Bright, airy, professional lighting.",
        "3D character of a happy cleaning business owner high-fiving a robot assistant. Fun, pixar-style, vibrant colors."
    ];

    return (
        <div className="space-y-8">
            {/* Campaign Selector Tabs */}
            <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                <button
                    onClick={() => setActiveCampaign('craigslist')}
                    className={`px-4 py-2 font-medium text-sm transition-colors relative ${activeCampaign === 'craigslist'
                        ? 'text-primary'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                        }`}
                >
                    Craigslist (SMB)
                    {activeCampaign === 'craigslist' && (
                        <div className="absolute bottom-[-9px] left-0 right-0 h-0.5 bg-primary" />
                    )}
                </button>
                <button
                    onClick={() => setActiveCampaign('social_media')}
                    className={`px-4 py-2 font-medium text-sm transition-colors relative ${activeCampaign === 'social_media'
                        ? 'text-primary'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                        }`}
                >
                    Social Media (NexaClean Pro)
                    {activeCampaign === 'social_media' && (
                        <div className="absolute bottom-[-9px] left-0 right-0 h-0.5 bg-primary" />
                    )}
                </button>
                <button
                    onClick={() => setActiveCampaign('craigslist_nexaclean')}
                    className={`px-4 py-2 font-medium text-sm transition-colors relative ${activeCampaign === 'craigslist_nexaclean'
                        ? 'text-primary'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                        }`}
                >
                    Craigslist (NexaClean Pro)
                    {activeCampaign === 'craigslist_nexaclean' && (
                        <div className="absolute bottom-[-9px] left-0 right-0 h-0.5 bg-primary" />
                    )}
                </button>
            </div>

            {/* Campaign Header */}
            <div className={`rounded-2xl p-8 text-white shadow-xl relative overflow-hidden bg-gradient-to-r ${activeCampaign === 'craigslist' ? 'from-blue-900 via-indigo-900 to-purple-900' :
                    activeCampaign === 'social_media' ? 'from-emerald-800 via-teal-800 to-cyan-800' :
                        'from-orange-700 via-red-800 to-pink-900' // New gradient for Craigslist NexaClean
                }`}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 blur-3xl" />
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-4">
                        <span className={`w-2 h-2 rounded-full animate-pulse ${activeCampaign === 'craigslist' ? 'bg-yellow-400' :
                                activeCampaign === 'social_media' ? 'bg-emerald-400' :
                                    'bg-orange-400'
                            }`} />
                        {activeCampaign === 'craigslist' ? 'Limited Time Offer' :
                            activeCampaign === 'social_media' ? 'Viral Strategy' :
                                'B2B Growth Engine'}
                    </div>
                    <h2 className="text-3xl font-bold font-heading mb-2">
                        {activeCampaign === 'craigslist' ? 'Unstoppable AI Offers' :
                            activeCampaign === 'social_media' ? 'NexaClean Pro Social Launch' :
                                'Dominate the Cleaning Market'}
                    </h2>
                    <p className="text-indigo-100 max-w-2xl">
                        {activeCampaign === 'craigslist'
                            ? 'Scale your business with our tailored growth packages. Launch, grow, or dominate.'
                            : activeCampaign === 'social_media'
                                ? 'Promote the ultimate Operating System for cleaning businesses across all major social platforms.'
                                : 'High-converting classified ads to sell NexaClean Pro systems to business owners.'}
                    </p>
                </div>
            </div>

            {/* Content Display */}
            {activeCampaign === 'craigslist' ? (
                <>
                    {/* Craigslist Pricing Tiers */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {tiers.map((tier, idx) => (
                            <div key={idx} className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border-2 ${tier.color === 'yellow' ? 'border-yellow-400 dark:border-yellow-500/50' :
                                tier.color === 'purple' ? 'border-purple-400 dark:border-purple-500/50' :
                                    'border-gray-100 dark:border-gray-700'
                                } relative flex flex-col`}>
                                {tier.color === 'purple' && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                        Best Value
                                    </div>
                                )}
                                {tier.color === 'yellow' && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                        For Big Players
                                    </div>
                                )}

                                <div className="mb-4">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-2">{tier.name}</h3>
                                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{tier.price}</div>
                                </div>

                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{tier.description}</p>

                                <ul className="space-y-3 mb-8 flex-1">
                                    {tier.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                            <span className="text-green-500 mt-0.5">✓</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button variant={tier.color === 'yellow' ? 'primary' : 'outline'} className="w-full justify-center">
                                    Copy Details
                                </Button>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Craigslist Ad Content */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <span>📢</span> Craigslist Ad Copy
                            </h3>
                            {craigslistAdCopy.map((ad, idx) => (
                                <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
                                    <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-3 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Variation {idx + 1}</span>
                                        <span className="text-xs text-gray-400 font-mono">{ad.platform}</span>
                                    </div>
                                    <div className="p-6">
                                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{ad.title}</h4>
                                        <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                                            <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                                {ad.body}
                                            </pre>
                                        </div>
                                        <div className="mt-4 flex justify-end">
                                            <Button variant="outline" className="text-xs h-8">Copy Text</Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Craigslist Visuals */}
                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-white shadow-lg">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <span>🎨</span> AI Visual Prompts
                                </h3>
                                <div className="space-y-4">
                                    {craigslistPrompts.map((prompt, idx) => (
                                        <div key={idx} className="bg-black/30 p-4 rounded-lg border border-white/10 group hover:bg-black/50 transition-colors cursor-pointer">
                                            <div className="flex gap-4">
                                                <div className="text-xs text-purple-400 font-mono mt-1">/imagine</div>
                                                <p className="text-sm text-gray-300 font-mono leading-relaxed">{prompt}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : activeCampaign === 'craigslist_nexaclean' ? (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* NexaClean Craigslist Ad Content */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <span>📢</span> B2B Classified Ads (High Conversion)
                            </h3>
                            {nexaCleanAds.map((ad, idx) => (
                                <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
                                    <div className="bg-orange-50 dark:bg-orange-900/20 px-6 py-3 border-b border-orange-100 dark:border-orange-900/30 flex justify-between items-center">
                                        <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">Winner Template #{idx + 1}</span>
                                        <span className="text-xs text-gray-400 font-mono">{ad.platform}</span>
                                    </div>
                                    <div className="p-6">
                                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{ad.title}</h4>
                                        <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                                            <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                                {ad.body}
                                            </pre>
                                        </div>
                                        <div className="mt-4 flex justify-end">
                                            <Button variant="outline" className="text-xs h-8">Copy Text</Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Visuals */}
                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-orange-900 to-red-900 rounded-xl p-6 text-white shadow-lg">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <span>🎨</span> Attention-Grabbing Visuals
                                </h3>
                                <div className="space-y-4">
                                    {nexaCleanPrompts.map((prompt, idx) => (
                                        <div key={idx} className="bg-black/30 p-4 rounded-lg border border-white/10 group hover:bg-black/50 transition-colors cursor-pointer">
                                            <div className="flex gap-4">
                                                <div className="text-xs text-orange-400 font-mono mt-1">/imagine</div>
                                                <p className="text-sm text-gray-100 font-mono leading-relaxed">{prompt}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Strategy Box */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span>🎯</span> B2B Strategy
                                </h3>
                                <ul className="space-y-4">
                                    <li className="flex gap-3">
                                        <span className="text-2xl">⚡</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Speed to Lead</h4>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">Emphasize the "Installation in &lt; 48hrs". Business owners need speed.</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-2xl">💰</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">ROI Focus</h4>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">Mention "Doubling Revenue" or "Making $10k/mo extra". They buy results, not tools.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {/* Social Media Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <span>📱</span> Platform Strategies & Copy
                            </h3>
                            {socialMediaAds.map((ad, idx) => (
                                <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
                                    <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-3 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            {ad.platform}
                                        </span>
                                        <span className="text-xs text-blue-500 font-medium bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded">
                                            {idx === 1 ? 'Viral Potential' : 'Conversion'}
                                        </span>
                                    </div>
                                    <div className="p-6">
                                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{ad.title}</h4>
                                        <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                                            <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                                {ad.body}
                                            </pre>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-6">
                            {/* Strategy Box */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span>🎯</span> Pro Strategy
                                </h3>
                                <ul className="space-y-4">
                                    <li className="flex gap-3">
                                        <span className="text-2xl">⚡</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Visual Proof</h4>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">Nothing sells better than a before/after transformation. Use fast-paced editing.</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-2xl">🎧</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">ASMR Appeal</h4>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">CleanTok is huge. Use satisfying sounds (sprays, scrubs) to keep retention high.</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-2xl">🥺</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Pain Points</h4>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">Don't sell the app. Sell the <u>time saved</u> and the <u>stress removed</u>.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Visual Prompts */}
                            <div className="bg-gradient-to-br from-emerald-900 to-teal-900 rounded-xl p-6 text-white shadow-lg">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <span>🎨</span> Midjourney / DALL-E Prompts
                                </h3>
                                <div className="space-y-4">
                                    {socialMediaPrompts.map((prompt, idx) => (
                                        <div key={idx} className="bg-black/30 p-4 rounded-lg border border-white/10 group hover:bg-black/50 transition-colors cursor-pointer">
                                            <div className="flex gap-4">
                                                <div className="text-xs text-emerald-400 font-mono mt-1">/imagine</div>
                                                <p className="text-sm text-gray-100 font-mono leading-relaxed">{prompt}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
