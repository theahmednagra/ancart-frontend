"use client";

import { CategoryInput } from "@/schemas/admin/category.schema";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const CategoryList = ({ categories, isLoading }: { categories: any[]; isLoading: boolean }) => {
  const router = useRouter();
  const handleClick = (categoryId: string) => router.push(`/admin/category/${categoryId}`);

  return (
    <div className="max-w-7xl mx-auto">

      {isLoading ? (
        <div className="text-gray-500 text-center py-12">Loading categories...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories.map((category: any) => (
            <motion.div
              key={category._id}
              onClick={() => handleClick(category._id)}
              whileHover={{ scale: 1.04, boxShadow: "0 10px 25px rgba(0,0,0,0.15)" }}
              className={`relative cursor-pointer bg-white rounded-2xl overflow-hidden shadow transition-all duration-300 flex flex-col items-center`}
            >
              {/* Image */}
              <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
                <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
              </div>

              {/* Name */}
              <div className="p-4 w-full text-center">
                <h3 className="text-gray-900 font-semibold text-lg truncate">{category.name}</h3>
              </div>

              {/* Inactive Badge */}
              {!category.isActive && (
                <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                  Inactive
                </span>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
