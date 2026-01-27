"use client"
import AddCategoryForm from '@/components/admin/CategoryForm'
import CategoryList from '@/components/admin/CategoryList';
import AddProductForm from '@/components/admin/ProductForm'
import ProductList from '@/components/admin/ProductList'
import { CategoryInput } from '@/schemas/admin/category.schema';
import { ProductInput } from '@/schemas/admin/product.schema';
import api from '@/services/api';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const AdminPanel = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<ProductInput[]>([]);
    const [categories, setCategories] = useState<CategoryInput[]>([])

    useEffect(() => {
        const fetchProductsAndCategories = async () => {
            setIsLoading(true);

            try {
                const [categoryRes, productRes] = await Promise.all([
                    api.get("/admin/categories/get-all-categories"),
                    api.get("/admin/products/get-all-products"),
                ]);

                setCategories(categoryRes.data.categories);
                setProducts(productRes.data.products);

            } catch (err) {
                toast.error(err instanceof Error ? err.message : "Something went wrong");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProductsAndCategories();
    }, []);


    return (
        <div>
            <AddCategoryForm />
            <AddProductForm />
            <CategoryList categories={categories} isLoading={isLoading} />
            <ProductList products={products} isLoading={isLoading} />
        </div>
    )
}

export default AdminPanel