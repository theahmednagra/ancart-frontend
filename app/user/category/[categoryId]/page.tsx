"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/services/api";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { toast } from "sonner";
import ProductsListSection from "@/components/public/ProductsListSection";
import CategoryListSection from "@/components/public/CategoryListSection";

const CategoryPage = () => {
    const { categoryId } = useParams() as { categoryId: string };
    const [category, setCategory] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                setLoading(true);

                // Fetch category info
                const res = await api.get(`/user/categories/get-category-by-id/${categoryId}`);
                setCategory(res.data.category);

            } catch (err) {
                toast.error("Failed to load category data");
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryData();
    }, [categoryId]);

    if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;
    if (!category) return <div className="min-h-screen flex items-center justify-center text-gray-500">Category not found</div>;

    return (
        <div>
            <Navbar />

            {/* Products Section */}
            <main className="max-w-7xl mx-auto px-4 py-10 min-h-screen">
                <ProductsListSection category={category} showName={true} showViewAll={false} />

                <div className="mt-10">
                    <h2 className="text-2xl font-bold text-[#02483D] tracking-tight mb-6">Explore other categories</h2>
                    <CategoryListSection />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CategoryPage;
