"use client";

import { Github, Linkedin, Instagram } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
    return (
        <footer className="bg-black text-white py-12 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Admin Info */}
                <div className="space-y-3">
                    <h3 className="text-lg font-semibold tracking-tight">ancart Admin</h3>
                    <p className="text-white/60 text-sm max-w-xs">
                        Administrative control panel for managing products, orders, users, and platform operations efficiently.
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                        <motion.a whileHover={{ scale: 1.1 }} href="#" className="text-white/60 hover:text-white transition">
                            <Github className="w-5 h-5" />
                        </motion.a>
                        <motion.a whileHover={{ scale: 1.1 }} href="#" className="text-white/60 hover:text-white transition">
                            <Linkedin className="w-5 h-5" />
                        </motion.a>
                        <motion.a whileHover={{ scale: 1.1 }} href="#" className="text-white/60 hover:text-white transition">
                            <Instagram className="w-5 h-5" />
                        </motion.a>
                    </div>
                </div>

                {/* Admin Modules */}
                <div className="space-y-3">
                    <h4 className="font-medium">Admin Modules</h4>
                    <ul className="space-y-1 text-white/60 text-sm">
                        <li><a className="hover:text-white transition" href="#">Dashboard Overview</a></li>
                        <li><a className="hover:text-white transition" href="#">Product Management</a></li>
                        <li><a className="hover:text-white transition" href="#">Order Processing</a></li>
                        <li><a className="hover:text-white transition" href="#">User Management</a></li>
                    </ul>
                </div>

                {/* System & Support */}
                <div className="space-y-3">
                    <h4 className="font-medium">System</h4>
                    <ul className="space-y-1 text-white/60 text-sm">
                        <li><a className="hover:text-white transition" href="#">Admin Guidelines</a></li>
                        <li><a className="hover:text-white transition" href="#">Security & Access</a></li>
                        <li><a className="hover:text-white transition" href="#">System Logs</a></li>
                        <li><a className="hover:text-white transition" href="#">Support & Contact</a></li>
                    </ul>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 mt-10 pt-6 text-center text-white/40 text-sm">
                © 2026 ancart Admin Panel. Internal use only.
            </div>
        </footer>
    );
};

export default Footer;

