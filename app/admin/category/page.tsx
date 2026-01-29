"use client";

import AddCategoryForm from '@/components/admin/CategoryForm';
import CategoryList from '@/components/admin/CategoryList';
import { CategoryInput } from '@/schemas/admin/category.schema';
import api from '@/services/api';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const AddCategoryPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState<CategoryInput[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoading(true);

            try {
                const res = await api.get("/admin/categories/get-all-categories");
                setCategories(res.data.categories);

            } catch (err) {
                toast.error(err instanceof Error ? err.message : "Something went wrong");

            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryAdded = (newCategory: CategoryInput) => {
        setCategories(prev => [newCategory, ...prev]);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">

            {/* Main Content */}
            <main className="flex-1 p-2 space-y-10">

                {/* Forms Section */}
                <section className="max-w-7xl mx-auto">
                    <AddCategoryForm
                        onCategoryAdded={handleCategoryAdded}
                    />
                </section>

                {/* Lists Section */}
                <section className="max-w-7xl mx-auto">

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Categories</h2>
                        <CategoryList categories={categories} isLoading={isLoading} />
                    </div>

                </section>

            </main>
        </div>
    );
};

export default AddCategoryPage;
