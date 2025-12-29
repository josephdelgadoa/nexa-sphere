import React from 'react';

interface HeaderProps {
    title: string;
    subtitle?: string;
    alignment?: 'left' | 'center' | 'right';
    className?: string;
}

const Header: React.FC<HeaderProps> = ({
    title,
    subtitle,
    alignment = 'left',
    className = ''
}) => {
    const alignmentClasses = {
        left: 'text-left',
        center: 'text-center mx-auto',
        right: 'text-right ml-auto'
    };

    return (
        <div className={`mb-12 ${alignmentClasses[alignment]} ${className}`}>
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 mb-4">
                {title}
            </h2>
            {subtitle && (
                <p className={`text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed ${alignment === 'center' ? 'mx-auto' : ''}`}>
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default Header;
