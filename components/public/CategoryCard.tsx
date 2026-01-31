"use client";

import { motion } from "framer-motion";

type CategoryCardProps = {
    category: {
        _id: string;
        name: string;
        image: string;
        slug?: string;
    };
    onClick: (categoryId: string) => void;
};

const CategoryCard = ({ category, onClick }: CategoryCardProps) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer relative bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden transition-transform"
            onClick={() => onClick(category._id)}
        >
            {/* Category Image */}
            <div className="w-full h-36 p-2 overflow-hidden rounded-t-xl">
                <img src={category?.image} alt={category.name} className="w-full h-full object-contain" />
            </div>

            {/* Category Name */}
            <div className="p-4 text-center">
                <h3 className="text-gray-900 font-semibold text-lg truncate">{category.name}</h3>
            </div>

        </motion.div>
    );
};

export default CategoryCard;
