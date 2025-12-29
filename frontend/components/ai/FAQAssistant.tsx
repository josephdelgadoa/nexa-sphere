"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { getFAQAnswer } from "@/services/ai";

import AnimatedIcon from "./AnimatedIcon";

const FAQAssistant = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
        { role: "ai", text: "Hi! I'm the Nexa-Sphere AI. Ask me anything about our services." },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    if (pathname === "/") return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input;
        setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
        setInput("");
        setLoading(true);

        try {
            const result = await getFAQAnswer(userMessage);
            setMessages((prev) => [...prev, { role: "ai", text: result.answer }]);
        } catch (error) {
            console.error("Failed to get answer", error);
            setMessages((prev) => [...prev, { role: "ai", text: "Sorry, I'm having trouble connecting right now." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="group w-20 h-20 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center transform hover:scale-110 overflow-hidden bg-black/90 backdrop-blur-sm border border-white/10"
                >
                    <AnimatedIcon className="w-full h-full p-2" />
                </button>
            )}

            {isOpen && (
                <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-80 sm:w-96 border border-gray-200 dark:border-gray-800 flex flex-col h-[600px] overflow-hidden animate-fade-in-up">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-between items-center text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20" />
                        <div className="flex items-center gap-3 relative z-10">
                            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 overflow-hidden">
                                <AnimatedIcon className="w-full h-full" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg leading-tight">Nexa-Sphere AI</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                    <span className="text-xs text-blue-100 font-medium">Online</span>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:text-gray-200 relative z-10">
                            ✕
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-950">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === "user"
                                        ? "bg-primary text-white rounded-br-none"
                                        : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-bl-none"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-bl-none border border-gray-200 dark:border-gray-700">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask a question..."
                                className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                            />
                            <button
                                type="submit"
                                disabled={loading || !input.trim()}
                                className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-50 hover:bg-blue-600 transition-colors"
                            >
                                ➤
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default FAQAssistant;
