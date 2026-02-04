"use client";

import { Github, Linkedin, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/services/api";
import { Category } from "@/types/category";

const Footer = () => {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get("/user/categories/get-public-categories");
                setCategories(res.data.categories?.slice(0, 4) || []);
            } catch (error) {
                console.error("Failed to load footer categories");
            }
        };

        fetchCategories();
    }, []);

    return (
        <footer className="bg-[#02483D] text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* About */}
                <div className="space-y-3">
                    <h3 className="text-lg font-bold">ancart</h3>
                    <p className="text-gray-300 text-sm max-w-xs">
                        Your premium online marketplace. Shop quality products across multiple categories with ease and style.
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                        <motion.a whileHover={{ scale: 1.1 }} target="blank" href="https://github.com/ahmednagradev"><Github className="w-5 h-5 hover:text-gray-200 transition" /></motion.a>
                        <motion.a whileHover={{ scale: 1.1 }} target="blank" href="https://www.linkedin.com/in/muhammad-ahmed-808071291/"><Linkedin className="w-5 h-5 hover:text-gray-200 transition" /></motion.a>
                        <motion.a whileHover={{ scale: 1.1 }} target="blank" href="https://www.instagram.com/theahmednagra"><Instagram className="w-5 h-5 hover:text-gray-200 transition" /></motion.a>
                    </div>
                </div>

                {/* Categories */}
                <div className="space-y-3">
                    <h4 className="font-semibold">Top Categories</h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                        {categories.map(category => (
                            <li
                                key={category._id}
                                className="cursor-pointer hover:text-white transition"
                                onClick={() => router.push(`/user/category/${category._id}`)}
                            >
                                {category.name}
                            </li>
                        ))}
                        {categories.length === 0 && (
                            <li className="text-gray-400">Loading...</li>
                        )}
                    </ul>
                </div>

                {/* Quick Links */}
                <div className="space-y-3">
                    <h4 className="font-semibold">Quick Links</h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                        <li className="cursor-pointer hover:text-white transition" onClick={() => router.push("/user/about")}>About Us</li>
                        <li className="cursor-pointer hover:text-white transition" onClick={() => router.push("/user/contact")}>Contact Us</li>
                        <li className="cursor-pointer hover:text-white transition" onClick={() => router.push("/user/questions")}>Frequently Asked Questions</li>
                        <li className="cursor-pointer hover:text-white transition" onClick={() => router.push("/user/conditions")}>Terms & Conditions</li>
                    </ul>
                </div>

            </div>

            {/* Bottom */}
            <div className="border-t border-gray-500 mt-10 pt-6 text-center text-gray-400 text-sm">
                © 2026 ancart. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
