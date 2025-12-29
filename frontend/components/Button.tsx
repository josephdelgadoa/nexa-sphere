import React from "react";
import Link from "next/link";

interface ButtonProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "ghost" | "outline" | "white";
    href?: string;
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = "primary",
    href,
    onClick,
    className = "",
    type = "button",
    disabled,
}) => {
    const baseStyles =
        "inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variants = {
        primary:
            "bg-[#0a60ff] text-white hover:bg-[#004886] shadow-md hover:shadow-lg focus:ring-[#0a60ff]",
        secondary:
            "bg-secondary text-white hover:bg-purple-700 shadow-lg hover:shadow-xl focus:ring-secondary",
        ghost:
            "bg-transparent text-primary hover:bg-blue-50 focus:ring-primary",
        outline:
            "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary",
        white:
            "bg-white text-[#1B1C1D] hover:bg-gray-100 shadow-lg hover:shadow-xl focus:ring-white",
    };

    const combinedStyles = `${baseStyles} ${variants[variant]} ${className} ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`;

    if (href && !disabled) {
        return (
            <Link href={href} className={combinedStyles}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} onClick={onClick} className={combinedStyles} disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;
