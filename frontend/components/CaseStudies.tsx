import React from "react";
import Section from "./Section";
import Card from "./Card";

const caseStudies = [
    {
        title: "AI Market Dominator",
        client: "VallartaVows.com",
        result: "50+ Weddings Booked/Year",
        description: "Vallarta Vows transformed from a local planner into a destination wedding powerhouse. By implementing our Full Sales Agent Bot, they now handle inquiries 24/7 in English and Spanish. The AI qualifies couples, checks availability, and even handles initial vendor coordination, allowing the founders to focus purely on creative design.",
        tags: ["Market Dominator", "Sales Bot", "Automation"],
    },
    {
        title: "AI Growth Accelerator",
        client: "OrientalHealingPV.com",
        result: "Full Calendar in 90 Days",
        description: "Starting as a boutique wellness studio, Oriental Healing PV needed consistent clients. We deployed the Growth Accelerator package: a high-conversion site paired with a Smart Sales Funnel. The automated lead nurturing system turned curious visitors into booked appointments, filling their therapist schedules months in advance.",
        tags: ["Growth Accelerator", "Lead Gen", "Smart Funnel"],
    },
];

const CaseStudies = () => {
    return (
        <Section background="gray">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-gray-900 dark:text-white">
                    Proven Results
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                    California&apos;s leading logistics firm reduced dispatch times by 40% using our custom route optimization algorithms. AI.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {caseStudies.map((study, index) => (
                    <Card key={index} className="flex flex-col h-full hover:shadow-xl transition-shadow duration-300 border-t-4 border-primary">
                        <div className="mb-4">
                            <h3 className="text-xl font-bold font-heading text-gray-900 dark:text-white mb-1">
                                {study.title}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Client: {study.client}
                            </p>
                        </div>

                        <div className="mb-6">
                            <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-bold px-3 py-1 rounded-full text-sm">
                                🚀 {study.result}
                            </span>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                            {study.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-auto">
                            {study.tags.map((tag) => (
                                <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </Card>
                ))}
            </div>
        </Section>
    );
};

export default CaseStudies;
