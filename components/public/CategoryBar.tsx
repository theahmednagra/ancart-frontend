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
            {/* Scrollable container */}
            <div className="overflow-x-auto scrollbar-hide">
                {/* Inner flex container */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-4 py-3 px-4 min-w-max mx-auto"
                    style={{ justifyContent: 'center' }} // Fallback to center if content smaller
                >
                    {categories.map(cat => (
                        <button
                            key={cat._id}
                            onClick={() => router.push(`/user/category/${cat._id}`)}
                            className="px-4 py-1.5 rounded-full bg-gray-100 text-sm font-medium text-gray-700 hover:bg-[#02483D] hover:text-white transition duration-200 whitespace-nowrap"
                        >
                            {cat.name}
                        </button>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default CategoryBar;
