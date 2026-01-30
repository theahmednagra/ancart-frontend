"use client";

import { Github, Linkedin, Instagram } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
    return (
        <footer className="bg-[#02483D] text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* About Section */}
                <div className="space-y-3">
                    <h3 className="text-lg font-bold">ancart</h3>
                    <p className="text-gray-300 text-sm max-w-xs">
                        Your premium online marketplace. Shop quality products across multiple categories with ease and style.
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                        <motion.a whileHover={{ scale: 1.1 }} href="#"><Github className="w-5 h-5 hover:text-gray-200 transition" /></motion.a>
                        <motion.a whileHover={{ scale: 1.1 }} href="#"><Linkedin className="w-5 h-5 hover:text-gray-200 transition" /></motion.a>
                        <motion.a whileHover={{ scale: 1.1 }} href="#"><Instagram className="w-5 h-5 hover:text-gray-200 transition" /></motion.a>
                    </div>
                </div>

                {/* Categories */}
                <div className="space-y-3">
                    <h4 className="font-semibold">Categories</h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                        <li><a className="hover:text-white transition" href="#">Mobiles</a></li>
                        <li><a className="hover:text-white transition" href="#">Laptops</a></li>
                        <li><a className="hover:text-white transition" href="#">Tablets</a></li>
                        <li><a className="hover:text-white transition" href="#">Smart Watches</a></li>
                    </ul>
                </div>

                {/* Quick Links */}
                <div className="space-y-3">
                    <h4 className="font-semibold">Quick Links</h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                        <li><a className="hover:text-white transition" href="#">About Us</a></li>
                        <li><a className="hover:text-white transition" href="#">Contact</a></li>
                        <li><a className="hover:text-white transition" href="#">FAQs</a></li>
                        <li><a className="hover:text-white transition" href="#">Terms & Conditions</a></li>
                    </ul>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-500 mt-10 pt-6 text-center text-gray-400 text-sm">
                &copy; 2026 ancart. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
