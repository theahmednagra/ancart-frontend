"use client";

import AddProductForm from '@/components/admin/ProductForm';
import ProductList from '@/components/admin/ProductList';
import { ProductInput } from '@/schemas/admin/product.schema';
import api from '@/services/api';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const AddProjectPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<ProductInput[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);

            try {
                const res = await api.get("/admin/products/get-all-products");
                setProducts(res.data.products);

            } catch (err) {
                toast.error(err instanceof Error ? err.message : "Something went wrong");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleProductAdded = (newProduct: ProductInput) => {
        setProducts(prev => [newProduct, ...prev]);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">

            {/* Main Content */}
            <main className="flex-1 p-2 space-y-10">

                {/* Forms Section */}
                <section className="max-w-7xl mx-auto">
                    <AddProductForm 
                        onProductAdded={handleProductAdded}
                    />
                </section>

                {/* Lists Section */}
                <section className="max-w-7xl mx-auto">

                    <div className="">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Products</h2>
                        <ProductList products={products} isLoading={isLoading} />
                    </div>

                </section>

            </main>
        </div>
    );
};

export default AddProjectPage;
