"use client";

import { Github, Linkedin, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Footer = () => {
    const router = useRouter();

    return (
        <footer className="bg-black text-white py-12 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Admin Info */}
                <div className="space-y-3">
                    <h3 className="text-lg font-semibold tracking-tight">ancart Admin</h3>
                    <p className="text-white/60 text-sm max-w-xs">
                        Administrative control panel for managing products, orders, users, and platform operations efficiently.
                    </p>
                </div>

                {/* Admin Modules */}
                <div className="space-y-3">
                    <h4 className="font-medium">Admin Modules</h4>
                    <ul className="space-y-1 text-white/60 text-sm">
                        <li className="cursor-pointer hover:text-white transition" onClick={() => router.push("/admin/order")}>Order Processing</li>
                        <li className="cursor-pointer hover:text-white transition" onClick={() => router.push("/admin/category")}>Category Management</li>
                        <li className="cursor-pointer hover:text-white transition" onClick={() => router.push("/admin/product")}>Product Management</li>
                    </ul>
                </div>

                {/* System & Support */}
                <div className="space-y-3">
                    <h4 className="font-medium">System</h4>
                    <ul className="space-y-1 text-white/60 text-sm">
                        <li className="cursor-pointer hover:text-white transition" onClick={() => router.push("/admin")}>Dashboard Overview</li>
                        <li className="cursor-pointer hover:text-white transition" onClick={() => router.push("/admin/profile")}>Admin Profile</li>
                        <li className="cursor-pointer hover:text-white transition" onClick={() => router.push("/")}>Client Layer</li>
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

