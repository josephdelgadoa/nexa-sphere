import React from "react";

const AnimatedIcon = ({ className = "w-full h-full" }: { className?: string }) => {
    return (
        <div className={`${className} relative flex items-center justify-center`}>
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            >
                <defs>
                    <linearGradient id="sphere-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#60A5FA" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Central Pulsing Core */}
                <circle cx="50" cy="50" r="15" fill="url(#sphere-gradient)" filter="url(#glow)">
                    <animate
                        attributeName="r"
                        values="15;18;15"
                        dur="3s"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="opacity"
                        values="0.8;1;0.8"
                        dur="3s"
                        repeatCount="indefinite"
                    />
                </circle>

                {/* Inner Rotating Ring */}
                <g className="origin-center animate-[spin_8s_linear_infinite]">
                    <circle
                        cx="50"
                        cy="50"
                        r="28"
                        stroke="url(#sphere-gradient)"
                        strokeWidth="2"
                        strokeDasharray="40 20"
                        strokeOpacity="0.8"
                        strokeLinecap="round"
                    />
                </g>

                {/* Middle Rotating Ring (Reverse) */}
                <g className="origin-center animate-[spin_12s_linear_infinite_reverse]">
                    <circle
                        cx="50"
                        cy="50"
                        r="38"
                        stroke="#60A5FA"
                        strokeWidth="1.5"
                        strokeDasharray="10 30 10 30"
                        strokeOpacity="0.6"
                        strokeLinecap="round"
                    />
                </g>

                {/* Outer Orbital Particles */}
                <g className="origin-center animate-[spin_20s_linear_infinite]">
                    <circle cx="50" cy="5" r="3" fill="#8B5CF6" filter="url(#glow)" />
                    <circle cx="50" cy="95" r="3" fill="#60A5FA" filter="url(#glow)" />
                    <circle cx="5" cy="50" r="2" fill="#8B5CF6" opacity="0.5" />
                    <circle cx="95" cy="50" r="2" fill="#60A5FA" opacity="0.5" />
                </g>

                {/* Connecting Lines (Neural Network feel) */}
                <path
                    d="M50 35 L50 20 M35 50 L20 50 M65 50 L80 50 M50 65 L50 80"
                    stroke="url(#sphere-gradient)"
                    strokeWidth="1"
                    strokeOpacity="0.4"
                >
                    <animate
                        attributeName="stroke-opacity"
                        values="0.2;0.6;0.2"
                        dur="2s"
                        repeatCount="indefinite"
                    />
                </path>
            </svg>
        </div>
    );
};

export default AnimatedIcon;
