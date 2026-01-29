"use client"
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Navbar = () => {
    
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Handle scroll behavior to show/hide navbar
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsVisible(lastScrollY > currentScrollY || currentScrollY < 100);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <header>
            <motion.nav
                initial={{ y: 0 }}
                animate={{ y: isVisible ? 0 : -100 }}
                transition={{ duration: 0.3 }}
                className="backdrop-blur-lg bg-gray-50/80 border-b border-gray-200"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <h2
                            className="text-2xl font-bold bg-linear-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent select-none"
                        >
                            ancart
                        </h2>

                        {/* Right buttons */}
                        <div className="flex items-center gap-4">
                            {/* buttons here */}
                        </div>
                    </div>
                </div>
            </motion.nav>
        </header>
    );
};

export default Navbar;