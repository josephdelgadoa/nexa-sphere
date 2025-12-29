import React from 'react';
import Card from './Card';
import Button from './Button';

interface PricingTierProps {
    name: string;
    price: string;
    description?: string;
    features: string[];
    ctaText: string;
    ctaLink?: string;
    onCtaClick?: () => void;
    badge?: string;
    isPopular?: boolean;
}

const PricingTier: React.FC<PricingTierProps> = ({
    name,
    price,
    description,
    features,
    ctaText,
    ctaLink = '/contact',
    onCtaClick,
    badge,
    isPopular = false,
}) => {
    return (
        <Card
            glass={false}
            className={`flex flex-col h-full relative p-8 transition-all duration-300 ${isPopular
                ? 'border-primary ring-2 ring-primary/50 shadow-xl bg-white dark:bg-gray-900'
                : 'border-gray-200 dark:border-gray-800 hover:border-primary/50 bg-white dark:bg-gray-900 shadow-lg'
                }`}
        >
            {badge && (
                <div className="absolute -top-4 right-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    {badge}
                </div>
            )}

            {isPopular && !badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    Most Popular
                </div>
            )}

            <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{name}</h3>
                <div className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                    {price}
                </div>
                {description && <p className="text-sm text-gray-600 dark:text-gray-400 min-h-[40px]">{description}</p>}
            </div>

            <div className="flex-grow mb-8 border-t border-gray-100 dark:border-gray-800 pt-6">
                <ul className="space-y-4">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                            <span className="mr-3 text-green-500 bg-green-100 dark:bg-green-900/30 rounded-full p-0.5 flex-shrink-0">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-auto">
                <Button
                    onClick={onCtaClick}
                    href={onCtaClick ? undefined : ctaLink}
                    className={`w-full py-3 ${isPopular ? 'bg-gradient-to-r from-primary to-secondary text-white border-none hover:shadow-lg' : ''}`}
                    variant={isPopular ? 'primary' : 'secondary'}
                >
                    {ctaText}
                </Button>
            </div>
        </Card>
    );
};

export default PricingTier;
