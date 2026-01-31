"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const CategoryBar = ({ categories, isLoading }: { categories: any[]; isLoading: boolean }) => {
    const router = useRouter();

    if (isLoading) {
        return <div className="h-12 bg-gray-100 animate-pulse" />;
    }

    return (
        <div className="bg-white border-b border-gray-200">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-4 py-3 flex gap-4 justify-center overflow-x-auto scrollbar-hide">
                {categories.map(cat => (
                    <button
                        key={cat._id}
                        onClick={() => router.push(`user/category/${cat._id}`)}
                        className="px-4 py-1.5 rounded-full bg-gray-100 text-sm font-medium text-gray-700 hover:bg-[#02483D] hover:text-white transition duration-200 whitespace-nowrap"
                    >
                        {cat.name}
                    </button>
                ))}
            </motion.div>
        </div>
    );
};

export default CategoryBar;
