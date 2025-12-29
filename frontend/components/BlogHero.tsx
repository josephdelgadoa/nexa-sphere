import React from 'react';
import Section from './Section';

interface BlogHeroProps {
    title: string;
    subtitle: string;
}

const BlogHero: React.FC<BlogHeroProps> = ({ title, subtitle }) => {
    return (
        <div className="relative pt-32 pb-20 overflow-hidden">
            {/* Background with futuristic gradient */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-black opacity-90"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-blue-500/20 blur-[120px] rounded-full mix-blend-screen"></div>
                <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-purple-500/20 blur-[120px] rounded-full mix-blend-screen"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 mb-6 tracking-tight font-heading">
                    {title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    {subtitle}
                </p>
            </div>
        </div>
    );
};

export default BlogHero;
