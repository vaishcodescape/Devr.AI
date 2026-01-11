import React, { useState, useEffect } from 'react';
import { Menu, X} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Handle smooth scroll on page load with hash
    useEffect(() => {
        if (isHomePage && location.hash) {
            const hash = location.hash.substring(1); // Remove the # symbol
            setTimeout(() => {
                const element = document.getElementById(hash);
                if (element) {
                    const offset = 80; // Account for fixed navbar height
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }
    }, [location.hash, isHomePage]);

    // Smooth scroll handler
    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        
        // Close mobile menu if open
        setIsOpen(false);

        // Extract hash from href
        const hash = href.includes('#') ? href.split('#')[1] : null;
        
        if (!hash) {
            // If no hash, just navigate normally
            navigate(href);
            return;
        }

        if (isHomePage) {
            // If we're on the home page, scroll to the element
            const element = document.getElementById(hash);
            if (element) {
                const offset = 80; // Account for fixed navbar height
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        } else {
            // If we're on a different page, navigate to home first, then scroll
            navigate('/');
            // Wait for navigation to complete, then scroll
            setTimeout(() => {
                const element = document.getElementById(hash);
                if (element) {
                    const offset = 80;
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }
    };

    const navLinks = [
        { name: 'Features', href: isHomePage ? '#features' : '/#features' },
        { name: 'How It Works', href: isHomePage ? '#how-it-works' : '/#how-it-works' },
        { name: 'Integrations', href: isHomePage ? '#integrations' : '/#integrations' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-dark/90 backdrop-blur-sm py-3' : 'py-5'
                }`}
        >
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center"
                    >
                        <Link to="/" className="flex items-center">
                            <span 
                                className="text-2xl font-bold gradient-text"
                                style={{
                                    background: 'linear-gradient(to right, #4ade80, #3b82f6, #22d3ee, #2563eb, #10b981)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}
                            >
                                Devr.AI
                            </span>
                        </Link>
                    </motion.div>

                    <motion.nav
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="hidden md:flex items-center space-x-4"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleSmoothScroll(e, link.href)}
                                className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href={isHomePage ? "#waitlist" : "/#waitlist"}
                            onClick={(e) => handleSmoothScroll(e, isHomePage ? "#waitlist" : "/#waitlist")}
                            className="text-sm font-medium px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white transition-colors"
                        >
                            Join Waitlist
                        </a>
                    </motion.nav>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-gray-300 hover:text-white"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                    opacity: isOpen ? 1 : 0,
                    height: isOpen ? 'auto' : 0,
                }}
                className="md:hidden overflow-hidden"
            >
                <div className="container mx-auto px-6 py-4 bg-dark-lighter">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleSmoothScroll(e, link.href)}
                            className="block py-3 text-gray-300 hover:text-white"
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href={isHomePage ? "#waitlist" : "/#waitlist"}
                        onClick={(e) => handleSmoothScroll(e, isHomePage ? "#waitlist" : "/#waitlist")}
                        className="block py-3 text-primary hover:text-primary-hover font-medium"
                    >
                        Join Waitlist
                    </a>
                </div>
            </motion.div>
        </header>
    );
};

export default Navbar;