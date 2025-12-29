"use client";

import React, { useState } from "react";
import Button from "../Button";
import { getContactSuggestion } from "@/services/ai";

interface ContactHelperProps {
    onSuggestion: (suggestion: string) => void;
}

const ContactHelper: React.FC<ContactHelperProps> = ({ onSuggestion }) => {
    const [topic, setTopic] = useState("");
    const [keyPoints, setKeyPoints] = useState("");
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleGenerate = async () => {
        if (!topic || !keyPoints) return;
        setLoading(true);
        try {
            const result = await getContactSuggestion(topic, keyPoints);
            onSuggestion(result.suggestion);
            setIsOpen(false);
        } catch (error) {
            console.error("Failed to get suggestion", error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) {
        return (
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="text-sm text-primary hover:underline flex items-center gap-1 mb-4"
            >
                ✨ Use AI to draft your message
            </button>
        );
    }

    return (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
            <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-3">AI Message Drafter</h4>
            <div className="space-y-3">
                <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        What is this regarding?
                    </label>
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g., Project Inquiry, Partnership"
                        className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 text-sm"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Key points to include
                    </label>
                    <textarea
                        value={keyPoints}
                        onChange={(e) => setKeyPoints(e.target.value)}
                        placeholder="e.g., Need automation for HR, budget $50k, timeline 3 months"
                        className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 text-sm"
                        rows={2}
                    />
                </div>
                <div className="flex gap-2">
                    <Button
                        onClick={handleGenerate}
                        variant="primary"
                        className="text-xs py-2 px-4"
                        type="button"
                    >
                        {loading ? "Generating..." : "Draft Message"}
                    </Button>
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="text-xs text-gray-500 hover:text-gray-700"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactHelper;
