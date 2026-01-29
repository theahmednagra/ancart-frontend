"use client";

import UpdateCategoryForm from "@/components/admin/UpdateCategoryForm";
import { ProductInput } from "@/schemas/admin/product.schema";
import ProductList from "@/components/admin/ProductList";
import api from "@/services/api";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const AdminCategoryPage = () => {
    const params = useParams();
    const categoryId = params.categoryId as string;

    const [isLoading, setIsLoading] = useState(false);
    const [category, setCategory] = useState<any>(null);
    const [products, setProducts] = useState<ProductInput[]>([]);

    // Fetch category and products on page load
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [catRes, prodRes] = await Promise.all([
                    api.get(`/admin/categories/get-category-by-id/${categoryId}`),
                    api.get(`/admin/products/get-products-by-category/${categoryId}`),
                ]);

                setCategory(catRes.data.category);
                setProducts(prodRes.data.products);
            } catch (err) {
                toast.error(err instanceof Error ? err.message : "Something went wrong");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [categoryId]);

    // Update category in state without page reload
    const handleCategoryUpdate = (updatedCategory: any) => {
        setCategory(updatedCategory);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

            {isLoading ? (
                <div className="text-gray-500 text-center py-20 text-lg font-medium">
                    Loading category...
                </div>
            ) : category ? (
                <div className="space-y-12">

                    {/* -----------------------
                        Category Header + Form
                    ------------------------ */}
                    <div className="flex flex-col lg:flex-row gap-8 items-start">

                        {/* Category Info Card */}
                        <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 flex flex-col md:flex-row md:items-center md:gap-8 gap-4 w-full">

                            {/* Category Image */}
                            <div className="w-40 h-40 md:w-48 md:h-48 rounded-xl overflow-hidden bg-gray-100 shrink-0 mx-auto md:mx-0">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Category Text Info */}
                            <div className="flex-1 flex flex-col items-center md:items-start justify-center text-center md:text-left space-y-2">
                                <h1 className="text-2xl font-semibold text-gray-900 truncate">{category.name}</h1>

                                {!category.isActive && (
                                    <span className="inline-block bg-red-500 text-white text-sm font-semibold px-4 py-1 rounded-full shadow">
                                        Inactive
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Update Category Form */}
                        <div className="w-full lg:w-1/2">
                            <UpdateCategoryForm
                                categoryId={categoryId}
                                onUpdate={handleCategoryUpdate} // handle live update
                            />
                        </div>
                    </div>

                    {/* -----------------------
                        Products in Category
                    ------------------------ */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-6">Products in this Category</h2>
                        {products.length === 0 ? (
                            <p className="text-gray-500">No products found in this category.</p>
                        ) : (
                            <ProductList products={products} isLoading={isLoading} />
                        )}
                    </div>

                </div>
            ) : (
                <div className="text-center text-gray-500 text-lg font-medium">
                    Category not found.
                </div>
            )}
        </div>
    );
};

export default AdminCategoryPage;
