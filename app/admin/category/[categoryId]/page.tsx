"use client";

import UpdateCategoryForm from "@/components/admin/UpdateCategoryForm";
import ProductList from "@/components/admin/ProductList";
import api from "@/services/api";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import useAdminRedirect from "@/utils/useAdminRedirect";
import Navbar from "@/components/admin/Navbar";
import Footer from "@/components/admin/Footer";
import { Product } from "@/types/product";
import Loader from "@/components/admin/Loader";

const AdminCategoryPage = () => {
    // Redirect non-admin users
    useAdminRedirect();

    const params = useParams();
    const categoryId = params.categoryId as string;

    const [isLoading, setIsLoading] = useState(false);
    const [category, setCategory] = useState<any>(null);
    const [products, setProducts] = useState<Product[]>([]);

    // Fetch category and products
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [catRes, prodRes] = await Promise.all([
                    api.get(`/admin/categories/get-category-by-id/${categoryId}`),
                    api.get(`/admin/products/get-products-by-category/${categoryId}`),
                ]);

                setCategory(catRes.data.category);
                setProducts(prodRes.data.products || []);
            } catch (err) {
                toast.error(err instanceof Error ? err.message : "Something went wrong");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [categoryId]);

    const handleCategoryUpdate = (updatedCategory: any) => {
        setCategory(updatedCategory);
    };

    if (isLoading) return <Loader />;

    return (
        <>
            <Navbar />

            <div className="min-h-screen w-full bg-zinc-900/99 text-white py-10 px-4 sm:px-6 lg:px-8">
                <div className="h-full max-w-7xl mx-auto space-y-12">

                    {category ? (
                        <div className="space-y-12">

                            {/* Heading */}
                            {/* <h1 className="text-3xl font-bold mb-10">Update Category</h1> */}

                            {/* Category Header + Form */}
                            <div className="flex flex-col lg:flex-row items-center gap-10">

                                {/* Category Info Card */}
                                <div className="bg-zinc-900/80 border border-zinc-700 rounded-2xl shadow-lg p-10 flex flex-col items-center gap-6 max-w-xl w-full transition hover:shadow-xl">

                                    {/* Category Image */}
                                    <div className="w-50 h-50 md:w-70 md:h-70 rounded-2xl overflow-hidden bg-gray-700 shrink-0 mx-auto md:mx-0 transition-transform">
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Name & Status */}
                                    <div className="flex-1 flex flex-col justify-center text-center md:text-left space-y-2">
                                        <h1 className="text-2xl font-bold text-white truncate">{category.name}</h1>
                                        {!category.isActive && (
                                            <span className="inline-block bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow">
                                                Inactive
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Update Category Form */}
                                <div className="w-full">
                                    <UpdateCategoryForm
                                        categoryId={categoryId}
                                        onUpdate={handleCategoryUpdate}
                                    />
                                </div>

                            </div>

                            {/* Products Section */}
                            <div>
                                <h2 className="text-2xl font-semibold mb-6">Products in this Category</h2>
                                {products.length === 0 ? (
                                    <p className="text-gray-400">No products found in this category.</p>
                                ) : (
                                    <ProductList products={products} />
                                )}
                            </div>

                        </div>
                    ) : (
                        <div className="text-center text-gray-400 text-lg font-medium">
                            Category not found.
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default AdminCategoryPage;
