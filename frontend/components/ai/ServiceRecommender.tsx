"use client";

import React, { useState } from "react";
import Button from "../Button";
import Card from "../Card";
import { getServiceRecommendation } from "@/services/ai";

const questions = [
    {
        id: "industry",
        text: "What industry is your business in?",
        options: ["Technology", "Healthcare", "Finance", "Retail", "Manufacturing", "Other"],
    },
    {
        id: "goal",
        text: "What is your primary goal with AI?",
        options: ["Automate Tasks", "Improve Customer Support", "Generate Content", "Data Analysis", "Strategic Planning"],
    },
    {
        id: "budget",
        text: "What is your estimated budget range?",
        options: ["<$10k", "$10k-$50k", "$50k-$100k", "$100k+"],
    },
];

const ServiceRecommender = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [recommendation, setRecommendation] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleAnswer = (answer: string) => {
        const currentQuestion = questions[currentStep];
        const newAnswers = { ...answers, [currentQuestion.id]: answer };
        setAnswers(newAnswers);

        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            getRecommendation(newAnswers);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getRecommendation = async (finalAnswers: any) => {
        setLoading(true);
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const result: any = await getServiceRecommendation(finalAnswers);
            setRecommendation(result.recommendation);
        } catch (error) {
            console.error("Failed to get recommendation", error);
            setRecommendation("Sorry, we couldn't generate a recommendation at this time. Please contact us directly.");
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setCurrentStep(0);
        setAnswers({});
        setRecommendation(null);
    };

    return (
        <Card className="max-w-2xl mx-auto p-8 min-h-[400px] flex flex-col justify-center">
            {!recommendation && !loading && (
                <>
                    <div className="mb-8">
                        <div className="flex justify-between text-sm text-gray-500 mb-2">
                            <span>Step {currentStep + 1} of {questions.length}</span>
                            <span>{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold font-heading mb-6 text-center text-gray-900 dark:text-white">
                        {questions[currentStep].text}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {questions[currentStep].options.map((option) => (
                            <button
                                key={option}
                                onClick={() => handleAnswer(option)}
                                className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary hover:bg-primary/5 transition-all text-left font-medium text-gray-700 dark:text-gray-300"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </>
            )}

            {loading && (
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Analyzing your needs...</h3>
                    <p className="text-gray-500">Our AI is finding the perfect solution for you.</p>
                </div>
            )}

            {recommendation && (
                <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                        ✨
                    </div>
                    <h3 className="text-2xl font-bold font-heading mb-4 text-gray-900 dark:text-white">
                        Our Recommendation
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl mb-8 text-left prose dark:prose-invert">
                        <p className="whitespace-pre-wrap">{recommendation}</p>
                    </div>
                    <div className="flex gap-4 justify-center">
                        <Button onClick={reset} variant="outline">
                            Start Over
                        </Button>
                        <Button href="/contact" variant="primary">
                            Book Consultation
                        </Button>
                    </div>
                </div>
            )}
        </Card>
    );
};

export default ServiceRecommender;
