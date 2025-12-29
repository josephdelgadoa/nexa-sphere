import React, { useState } from 'react';

// Types for our templates
interface EmailTemplate {
    id: string;
    name: string;
    subject: string;
    previewText: string;
    content: (productLink: string) => React.ReactNode;
}

const PRODUCT_LINK = "http://localhost:3000/en/products/nexaclean-pro";

const templates: EmailTemplate[] = [
    {
        id: 'innovation',
        name: 'The Future of Cleaning',
        subject: 'Experience the Future of Clean with NexaClean Pro',
        previewText: 'Revolutionize your home maintenance with AI-driven precision.',
        content: (link) => (
            <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-center rounded-t-lg">
                    <h1 className="text-2xl font-bold text-white mb-2">The Future is Spotless</h1>
                    <p className="text-blue-100">AI-Powered. eco-Friendly. Effortless.</p>
                </div>
                <div className="p-6 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    <p className="mb-4">Hello,</p>
                    <p className="mb-4">
                        Stop spending your weekends fighting grime. Meet <strong>NexaClean Pro</strong>, the intelligent cleaning solution that learns your home and adapts to your lifestyle.
                    </p>
                    <ul className="list-disc list-inside mb-6 space-y-2 ml-4">
                        <li>🚀 <strong>AI Precision:</strong> Maps your home for optimal efficiency.</li>
                        <li>🔋 <strong>Long-lasting Battery:</strong> Cleans up to 3000 sq. ft. on a single charge.</li>
                        <li>📱 <strong>Smart Control:</strong> Manage everything from your phone.</li>
                    </ul>
                    <div className="text-center my-8">
                        <a href={link} className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                            Shop NexaClean Pro
                        </a>
                    </div>
                    <p className="text-sm text-slate-500 text-center">
                        Join thousands of satisfied homeowners who have reclaimed their time.
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 'eco',
        name: 'Eco-Warrior Special',
        subject: 'Clean Home, Green Planet 🌍',
        previewText: 'Sustainable cleaning technology that protects your family and the earth.',
        content: (link) => (
            <div className="space-y-4">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-8 text-center rounded-t-lg">
                    <h1 className="text-2xl font-bold text-white mb-2">Sustainable Brilliance</h1>
                    <p className="text-emerald-100">Protecting your home and our planet.</p>
                </div>
                <div className="p-6 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    <p className="mb-4">Hi there,</p>
                    <p className="mb-4">
                        Did you know you can have a pristine home without harsh chemicals or excessive energy waste?
                    </p>
                    <p className="mb-4">
                        <strong>NexaClean Pro</strong> is designed with sustainability at its core. Our energy-efficient motors and precision water-usage systems ensure that every clean is as green as it is effective.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-emerald-50 dark:bg-emerald-900/30 p-3 rounded text-center">
                            <span className="block text-2xl mb-1">🌱</span>
                            <span className="text-sm font-semibold">Eco-Friendly</span>
                        </div>
                        <div className="bg-emerald-50 dark:bg-emerald-900/30 p-3 rounded text-center">
                            <span className="block text-2xl mb-1">⚡</span>
                            <span className="text-sm font-semibold">Energy Efficient</span>
                        </div>
                    </div>
                    <div className="text-center my-8">
                        <a href={link} className="inline-block bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-emerald-700 transition-colors shadow-lg">
                            Go Green with NexaClean
                        </a>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 'urgency',
        name: 'Limited Time Offer',
        subject: '⚡ Flash Sale: Upgrade Your Cleaning Game Today!',
        previewText: 'Don\'t miss out on the ultimate cleaning upgrade. Limited stock available.',
        content: (link) => (
            <div className="space-y-4">
                <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-8 text-center rounded-t-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-white/20 rounded-full blur-xl animate-pulse"></div>
                    <h1 className="text-3xl font-extrabold text-white mb-2 uppercase tracking-wide">Flash Sale</h1>
                    <p className="text-amber-100 font-medium">Time is ticking on this exclusive offer.</p>
                </div>
                <div className="p-6 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-x border-b border-orange-100 dark:border-orange-900/30 rounded-b-lg">
                    <p className="mb-4 text-lg"><strong>Don't wait.</strong></p>
                    <p className="mb-6">
                        The <strong>NexaClean Pro</strong> is flying off the shelves. We've reserved a special unit just for you, but we can't hold it for long. Experience the pinnacle of automated cleaning technology before it's gone.
                    </p>

                    <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 p-4 rounded-lg mb-6 flex items-center justify-between">
                        <span className="font-mono text-orange-800 dark:text-orange-200">CODE: NEXA20</span>
                        <span className="text-sm font-bold text-orange-600 dark:text-orange-400">20% OFF</span>
                    </div>

                    <div className="text-center my-8">
                        <a href={link} className="inline-block bg-orange-600 text-white font-bold py-4 px-10 rounded-full hover:bg-orange-700 transition-all shadow-orange-500/30 shadow-lg transform hover:scale-105">
                            Claim Your Discount Now
                        </a>
                    </div>
                    <p className="text-xs text-slate-400 text-center mt-4">
                        Offer valid while supplies last. Terms and conditions apply.
                    </p>
                </div>
            </div>
        )
    }
];

export default function EmailMarketingView() {
    const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate>(templates[0]);
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSend = () => {
        setSending(true);
        // Simulate API call
        setTimeout(() => {
            setSending(false);
            setSent(true);
            // Reset "sent" status after 3 seconds
            setTimeout(() => setSent(false), 3000);
        }, 1500);
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Email Campaigns</h2>
                    <p className="text-slate-500 dark:text-slate-400">Promote NexaClean Pro to your audience</p>
                </div>
                {sent && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded shadow animate-pulse">
                        Campaign Sent Successfully! 🚀
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Template Selection & Settings */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Select Template</h3>
                        <div className="space-y-3">
                            {templates.map((template) => (
                                <button
                                    key={template.id}
                                    onClick={() => setSelectedTemplate(template)}
                                    className={`w-full text-left p-4 rounded-lg border transition-all ${selectedTemplate.id === template.id
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-1 ring-blue-500'
                                            : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700'
                                        }`}
                                >
                                    <div className="font-medium text-slate-900 dark:text-white">{template.name}</div>
                                    <div className="text-sm text-slate-500 dark:text-slate-400 mt-1 truncate">{template.subject}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Campaign Settings</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                    Target Audience
                                </label>
                                <select className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 p-2.5">
                                    <option>All Subscribers (12,450)</option>
                                    <option>Tech Enthusiasts (3,200)</option>
                                    <option>Recent Customers (850)</option>
                                    <option>Cart Abandoners (124)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                    Subject Line
                                </label>
                                <input
                                    type="text"
                                    defaultValue={selectedTemplate.subject}
                                    className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                />
                            </div>
                            <button
                                onClick={handleSend}
                                disabled={sending}
                                className={`w-full py-3 px-4 rounded-xl text-white font-medium flex items-center justify-center gap-2 transition-all ${sending
                                        ? 'bg-blue-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30'
                                    }`}
                            >
                                {sending ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <span>🚀</span> Send Campaign
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Preview Window */}
                <div className="lg:col-span-2">
                    <div className="bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 min-h-[600px] flex flex-col">
                        <div className="bg-white dark:bg-black rounded-lg shadow-xl max-w-2xl mx-auto w-full flex-1 overflow-hidden flex flex-col">
                            {/* Fake Email Window Header */}
                            <div className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-3 flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                                </div>
                                <div className="flex-1 text-center text-xs text-slate-500 font-mono">
                                    Preview: {selectedTemplate.subject}
                                </div>
                            </div>

                            {/* Email Content */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar">
                                <div className="max-w-xl mx-auto my-8 font-sans">
                                    {selectedTemplate.content(PRODUCT_LINK)}

                                    {/* Email Footer */}
                                    <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-400">
                                        <p>&copy; 2025 Nexa-Sphere Inc. All rights reserved.</p>
                                        <p className="mt-2">
                                            <a href="#" className="underline">Unsubscribe</a> • <a href="#" className="underline">View in Browser</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
