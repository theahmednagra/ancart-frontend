"use client";

import AddProductForm from '@/components/admin/ProductForm';
import ProductList from '@/components/admin/ProductList';
import Footer from '@/components/admin/Footer';
import Navbar from '@/components/admin/Navbar';
import api from '@/services/api';
import useAdminRedirect from '@/utils/useAdminRedirect';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Product } from '@/types/product';

const AddProductPage = () => {
    // Redirect non-admin users
    useAdminRedirect();

    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const res = await api.get("/admin/products/get-all-products");
                setProducts(res.data.products || []);
            } catch (err) {
                toast.error(err instanceof Error ? err.message : "Something went wrong");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleProductAdded = (newProduct: Product) => {
        setProducts(prev => [newProduct, ...prev]);
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-zinc-900/99 text-white flex flex-col px-4 py-10">

                {/* Heading */}
                {/* <section className="max-w-7xl w-full mx-auto">
                    <h1 className="text-3xl font-bold mb-2 w-full">Add Product</h1>
                </section> */}

                {/* Main Content */}
                <main className="flex-1 space-y-10">

                    {/* Add Product Form */}
                    <section className="max-w-7xl mx-auto">
                        <AddProductForm onProductAdded={handleProductAdded} />
                    </section>

                    {/* Product List Section */}
                    <section className="max-w-7xl mx-auto">
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold text-white">
                                Products
                            </h2>
                        </div>

                        <ProductList products={products} isLoading={isLoading} />
                    </section>

                </main>
            </div>

            <Footer />
        </>
    );
};

export default AddProductPage;
