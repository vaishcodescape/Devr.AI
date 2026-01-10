import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import Button from '../ui/Button';

const Hero: React.FC = () => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
            {/* Simplified Background - Modern & Clean */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Base gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark to-gray-900"></div>

                {/* Subtle accent gradients */}
                <div className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full bg-green-600/10 blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-green-500/5 blur-[100px] translate-x-1/3 translate-y-1/3"></div>

                {/* Grid pattern for texture */}
                <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>

                {/* Top gradient fade */}
                <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-green-500/5 to-transparent"></div>
            </div>

            {/* Bottom fade for smooth transition */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-dark pointer-events-none"></div>

            <div className="container mx-auto px-6 z-10">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="max-w-6xl mx-auto text-center"
                >
                    {/* Badge */}
                    <motion.div variants={item} className="mb-8">
                        <span className="inline-block px-6 py-3 rounded-full bg-green-500/10 text-green-400 text-base font-semibold border border-green-500/20">
                            Developer Experience Reimagined
                        </span>
                    </motion.div>

                    {/* Hero Heading - Larger, Bolder */}
                    <motion.h1
                        variants={item}
                        className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-8 tracking-tight"
                    >
                        AI-Powered <span className="gradient-text">Developer Relations</span> Assistant
                    </motion.h1>

                    {/* Description - Better spacing and readability */}
                    <motion.p
                        variants={item}
                        className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed"
                    >
                        Devr.AI revolutionizes open-source community management by automating engagement,
                        streamlining onboarding, and delivering real-time project updates across Discord,
                        Slack, GitHub, CLI, Web Widget, and more.
                        <br />
                        <span className="text-primary font-semibold mt-2 inline-block">Personalized, multi-platform, and analytics-driven.</span>
                    </motion.p>

                    {/* CTAs - Enhanced styling */}
                    <motion.div
                        variants={item}
                        className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
                    >
                        <Button
                            variant="primary"
                            href="#waitlist"
                            startIcon={<Users size={22} />}
                        >
                            Join the Waitlist
                        </Button>
                        <Button
                            variant="secondary"
                            href="#features"
                        >
                            Explore Features
                        </Button>
                    </motion.div>

                    {/* Dashboard Preview - Enhanced presentation */}
                    <motion.div
                        variants={item}
                        className="max-w-6xl mx-auto"
                    >
                        <div className="relative rounded-2xl overflow-hidden border border-gray-700 shadow-2xl elevation-xl interactive-lift">
                            {/* Subtle glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-green-500/5 via-transparent to-transparent pointer-events-none"></div>

                            {/* Bottom fade */}
                            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-dark via-dark/50 to-transparent z-10"></div>

                            <img
                                src="/dashboard_preview.png"
                                alt="Devr.AI Dashboard Preview"
                                className="w-full h-auto"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;