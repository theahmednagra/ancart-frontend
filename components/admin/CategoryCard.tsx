"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type CategoryCardProps = {
    category: {
        _id: string;
        name: string;
        image: string;
        slug?: string;
    };
};

const CategoryCard = ({ category }: CategoryCardProps) => {

    const router = useRouter();

    return (
        <motion.div
            whileHover={{ scale: 1.04 }}
            className="cursor-pointer relative bg-zinc-900/80 border border-white/10 rounded-xl overflow-hidden transition-all hover:border-white/20 hover:shadow-xl"
            onClick={() => router.push(`/admin/category/${category._id}`)}
        >
            {/* Category Image */}
            <div className="w-full h-36 p-3 bg-white overflow-hidden flex items-center justify-center">
                <img src={category?.image} alt={category.name} className="w-full h-full object-contain opacity-90" />
            </div>

            {/* Category Name */}
            <div className="p-4 text-center">
                <h3 className="text-white font-medium text-base truncate">
                    {category.name}
                </h3>
            </div>
        </motion.div>
    );
};

export default CategoryCard;
