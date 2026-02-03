"use client";

import AddCategoryForm from '@/components/admin/CategoryForm';
import CategoryList from '@/components/admin/CategoryList';
import Footer from '@/components/admin/Footer';
import Navbar from '@/components/admin/Navbar';
import api from '@/services/api';
import { Category } from '@/types/category';
import useAdminRedirect from '@/utils/useAdminRedirect';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const AddCategoryPage = () => {
    // Redirect non-admin users
    useAdminRedirect();

    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoading(true);
            try {
                const res = await api.get("/admin/categories/get-all-categories");
                setCategories(res.data.categories || []);
            } catch (err) {
                toast.error(err instanceof Error ? err.message : "Something went wrong");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryAdded = (newCategory: Category) => {
        setCategories(prev => [newCategory, ...prev]);
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-zinc-900/99 text-white px-4 py-10 flex flex-col">

                {/* Heading */}
                {/* <section className="max-w-7xl w-full mx-auto">
                    <h1 className="text-3xl font-bold mb-2 w-full">Add Category</h1>
                </section> */}

                {/* Main Content */}
                <main className="flex-1 space-y-10">

                    {/* Add Category Form */}
                    <section className="max-w-7xl mx-auto">
                        <AddCategoryForm onCategoryAdded={handleCategoryAdded} />
                    </section>

                    {/* Category List Section */}
                    <section className="max-w-7xl mx-auto">
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold text-white">
                                Categories
                            </h2>
                        </div>

                        <CategoryList categories={categories} isLoading={isLoading} />
                    </section>

                </main>
            </div>

            <Footer />
        </>
    );
};

export default AddCategoryPage;
