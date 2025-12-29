import React from "react";

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    background?: "white" | "gray" | "dark" | "none";
}

const Section: React.FC<SectionProps> = ({
    children,
    className = "",
    id,
    background = "none",
}) => {
    const backgrounds = {
        white: "bg-white dark:bg-gray-900",
        gray: "bg-gray-50 dark:bg-gray-800",
        dark: "bg-nexa-dark text-white",
        none: "",
    };

    return (
        <section
            id={id}
            className={`py-16 md:py-24 ${backgrounds[background]} ${className}`}
        >
            <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                {children}
            </div>
        </section>
    );
};

export default Section;
