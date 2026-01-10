import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const socialLinks = [
        {
            icon: Github,
            href: 'https://github.com/AOSSIE-Org/Devr.AI/',
            label: 'GitHub',
            color: 'hover:text-green-400'
        },
        {
            icon: Twitter,
            href: 'https://x.com/aossie_org?lang=en',
            label: 'Twitter',
            color: 'hover:text-cyan-400'
        },
        {
            icon: Linkedin,
            href: 'https://www.linkedin.com/company/aossie/?originalSubdomain=au',
            label: 'LinkedIn',
            color: 'hover:text-green-400'
        },
    ];

    return (
        <footer className="relative bg-gradient-to-br from-dark via-dark-lighter to-gray-900 py-16 overflow-hidden border-t border-gray-800">
            {/* Enhanced Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-green-500/5 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl translate-x-1/2 translate-y-1/2"></div>
                <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12"
                >
                    {/* Brand Section */}
                    <motion.div variants={itemVariants} className="md:col-span-2">
                        <h3 className="text-3xl font-bold gradient-text mb-4">Devr.AI</h3>
                        <p className="text-gray-400 text-base max-w-md leading-relaxed mb-6">
                            Revolutionizing developer relations with AI-powered community management.
                            Automate engagement, streamline onboarding, and deliver real-time updates.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={`text-gray-400 ${social.color} transition-colors duration-300 p-3 rounded-xl bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-gray-600`}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label={social.label}
                                >
                                    <social.icon size={20} />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Links Section */}
                    <motion.div variants={itemVariants}>
                        <h4 className="font-bold mb-4 text-white text-lg">Quick Links</h4>
                        <ul className="space-y-3">
                            {[
                                { label: 'Features', href: '#features' },
                                { label: 'How It Works', href: '#how-it-works' },
                                { label: 'Integrations', href: '#integrations' },
                                { label: 'Join Waitlist', href: '#waitlist' },
                            ].map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={isHomePage ? link.href : `/${link.href}`}
                                        className="text-gray-400 hover:text-green-400 text-sm transition-colors duration-300 inline-flex items-center gap-2 group"
                                    >
                                        <span className="w-0 h-0.5 bg-gradient-to-r from-green-400 to-cyan-400 group-hover:w-4 transition-all duration-300"></span>
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Legal Section */}
                    <motion.div variants={itemVariants}>
                        <h4 className="font-bold mb-4 text-white text-lg">Legal</h4>
                        <ul className="space-y-3">
                            {[
                                { label: 'Privacy Policy', to: '/privacy-policy' },
                                { label: 'Terms of Service', to: '/terms-of-service' },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.to}
                                        className="text-gray-400 hover:text-cyan-400 text-sm transition-colors duration-300 inline-flex items-center gap-2 group"
                                    >
                                        <span className="w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-green-400 group-hover:w-4 transition-all duration-300"></span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>

                {/* Bottom Bar */}
                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4"
                >
                    <p className="text-gray-500 text-sm">
                        © {currentYear} Devr.AI. All rights reserved.
                    </p>

                    {/* Scroll to Top Button */}
                    <motion.button
                        onClick={scrollToTop}
                        className="flex items-center gap-2 text-gray-400 hover:text-green-400 text-sm transition-colors duration-300 group"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span>Back to top</span>
                        <ArrowUp size={16} className="group-hover:translate-y-[-2px] transition-transform duration-300" />
                    </motion.button>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;