import React from "react";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    glass?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = "", glass = false }) => {
    const baseStyles = "rounded-2xl p-6 transition-all duration-300";
    const glassStyles = glass
        ? "glass dark:glass-dark shadow-lg hover:shadow-xl border border-white/20"
        : "bg-white dark:bg-gray-800 shadow-md hover:shadow-lg border border-gray-100 dark:border-gray-700";

    return (
        <div className={`${baseStyles} ${glassStyles} ${className}`}>
            {children}
        </div>
    );
};

export default Card;
