"use client";

import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const HeroSection = () => {
    const router = useRouter();

    // Scroll handler for Browse Categories with offset
    const scrollToCategories = () => {
        const categoriesSection = document.getElementById("categories-section");
        if (categoriesSection) {
            const yOffset = -64; // navbar height
            const y = categoriesSection.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-12">

                {/* Left: Text Content */}
                <div className="flex-1 space-y-4 text-center lg:text-left">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                        Discover Your Next <span className="text-[#02483D]">Favorite Product</span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-gray-700 text-lg sm:text-xl font-medium max-w-md mx-auto lg:mx-0">
                        Shop from thousands of high-quality products across multiple categories. Premium quality meets unbeatable prices.
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                        <button
                            onClick={() => router.push("/user/cart")}
                            className="flex justify-center items-center gap-2 px-6 py-3 bg-[#02483D] text-white font-semibold rounded-lg shadow hover:scale-105 transition"
                        >
                            <ShoppingCart size={18} /> Shop Now
                        </button>
                        <button
                            onClick={scrollToCategories} // Updated scroll handler
                            className="px-6 py-3 border border-[#02483D] text-[#02483D] font-semibold rounded-lg hover:scale-105 transition"
                        >
                            Browse Categories
                        </button>
                    </motion.div>
                </div>

                {/* Right: Hero Image */}
                <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex-1">
                    {/* Use next/image if the image is in public folder */}
                    <Image
                        src="/images/apple-devices.jpg"
                        alt="Hero products"
                        width={600}
                        height={400}
                        className="w-full max-w-lg mx-auto lg:mx-0 rounded-2xl shadow-lg object-cover"
                        priority
                    />
                </motion.div>

            </div>
        </section>
    );
};

export default HeroSection;
