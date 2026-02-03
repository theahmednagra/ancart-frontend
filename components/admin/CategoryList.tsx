"use client";

import { motion } from "framer-motion";
import CategoryCard from "./CategoryCard";
import { Category } from "@/types/category";

type Props = {
  categories: Category[];
  isLoading: boolean;
};

const CategoryList = ({ categories, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="py-20 flex flex-wrap justify-center gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-36 w-36 bg-zinc-900/70 border border-white/10 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (categories.length === 0) {
    return <div className="text-center text-white/50 py-20">No categories available</div>;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
    >
      {categories.map((category) => (
        <CategoryCard key={category._id} category={category} />
      ))}
    </motion.section>
  );
};

export default CategoryList;
