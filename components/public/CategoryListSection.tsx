"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import CategoryCard from "./CategoryCard";

type Category = {
    _id: string;
    name: string;
    image: string;
    slug?: string;
};

const CategoryListSection = ({ showHeading = false }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const res = await api.get("/user/categories/get-public-categories");
                setCategories(res.data.categories);
            } catch (err) {
                toast.error("Failed to load categories");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleClick = (categoryId: string) => {
        router.push(`/user/category/${categoryId}`);
    };

    if (loading) return null;
    if (categories.length === 0) return <div className="text-center text-gray-500 py-20">No categories found</div>;

    return (
        <>
            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="max-w-7xl mx-auto space-y-6">
            {showHeading && <h2 className="text-2xl font-bold text-[#02483D] tracking-tight mb-6">Explore other categories</h2>}

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {categories.map(category => (
                        <CategoryCard key={category._id} category={category} onClick={handleClick} />
                    ))}
                </div>
            </motion.section>
        </>
    );
};

export default CategoryListSection;
