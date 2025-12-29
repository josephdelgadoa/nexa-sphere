"use client";

import React, { useRef } from "react";
import Button from "../Button";
import { motion, useScroll, useTransform } from "framer-motion";

interface HeroProps {
    title: string;
    subtitle: string;
    cta: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, cta }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={ref} className="relative h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/nexasphere_hero_bg.png"
                    alt="NexaSphere Enterprise AI Background"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent/20" />
            </div>

            <motion.div
                style={{ y, opacity }}
                className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-primary dark:text-blue-300 text-sm font-semibold mb-6 tracking-wide uppercase border border-blue-200 dark:border-blue-800 backdrop-blur-sm">
                        Reshaping Enterprise Intelligence
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold font-heading mb-8 text-white tracking-tight leading-[1.1] drop-shadow-sm">
                        {/* We handle title explicitly to allow HTML if needed, but for now string is fine.
                            However, if title implies breaks, we might need dangerouslySetInnerHTML or just rendering.
                            Let's assume simple string for now or parse standard react node if needed.
                            Actually the prop type is string.
                        */}
                        {title}
                        {/* If specific coloring needed, we might need to pass parts or format it in parent */}
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
                        {subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button href="/services" variant="white" className="px-8 py-4 text-lg shadow-lg hover:-translate-y-1 transition-all duration-300">
                            {cta}
                        </Button>
                        <Button href="/contact" variant="primary" className="px-8 py-4 text-lg hover:-translate-y-1 transition-all duration-300">
                            Book Strategy Session
                        </Button>
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
            >
                <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center p-1">
                    <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full" />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;

