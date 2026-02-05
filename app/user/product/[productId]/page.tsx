"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import api from "@/services/api";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { toast } from "sonner";
import ProductsListSection from "@/components/public/ProductsListSection";
import CategoryListSection from "@/components/public/CategoryListSection";
import AddToCartButton from "@/components/public/AddToCartButton";
import useAuthRedirect from "@/utils/useAuthRedirect";

const ProductPage = () => {

    const { productId } = useParams() as { productId: string };
    const router = useRouter();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [placingOrder, setPlacingOrder] = useState(false);

    // Fetch product
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await api.get(`/user/products/get-product-by-id/${productId}`);
                setProduct(res.data.product);
            } catch {
                toast.error("Failed to load product");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    const isOutOfStock = Number(product?.stock) === 0;

    // Order Now handler (ready for production)
    const handleOrderNow = () => {
        if (isOutOfStock) return;
        // Redirect to Order Page (future flow)
        setPlacingOrder(true);
        router.push(`/user/order/create-order/${product._id}`);
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;
    if (!product) return <div className="min-h-screen flex items-center justify-center text-gray-500">Product not found</div>;

    return (
        <>
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">

                {/* Product Info */}
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

                    {/* IMAGE */}
                    <div className="flex justify-center">
                        <div className="w-full max-w-sm aspect-square border border-gray-200 rounded-xl p-4 overflow-hidden flex items-center justify-center">
                            <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                        </div>
                    </div>

                    {/* INFO */}
                    <div className="flex flex-col gap-6">
                        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

                        <div className="flex items-center gap-4">
                            <span className="text-2xl font-bold text-[#02483D]">
                                Rs. {Number(product.price || 0).toLocaleString()}
                            </span>
                            <span className={`px-3 py-1.5 text-xs font-semibold rounded-full border ${!isOutOfStock ? "border-green-500 text-green-600" : "border-red-400 text-red-500"}`}>
                                {!isOutOfStock ? "In Stock" : "Out of Stock"}
                            </span>
                        </div>

                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{product.description}</p>

                        {/* ACTIONS */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl items-stretch">
                            {/* Add to Cart */}
                            <div className="flex-1">
                                <AddToCartButton productId={product._id} stock={product.stock} />
                            </div>

                            {/* Order Now */}
                            <button
                                disabled={isOutOfStock || placingOrder}
                                onClick={handleOrderNow}
                                className={`flex-1 py-3 px-5 rounded-lg font-medium transition-transform border text-center ${isOutOfStock
                                    ? "border-gray-300 text-gray-400 cursor-not-allowed"
                                    : "border-[#02483D] text-[#02483D] hover:scale-105 hover:shadow-sm"
                                    }`}
                            >
                                {placingOrder ? "Loading..." : "Order Now"}
                            </button>
                        </div>

                    </div>

                </motion.div>

                {/* Product Suggestions */}
                <div>
                    <h2 className="text-2xl font-bold text-[#02483D] mb-6">Explore other products</h2>
                    <ProductsListSection category={product?.category} showName={false} showViewAll={false} />
                </div>

                {/* Category Suggestions */}
                <div>
                    <h2 className="text-2xl font-bold text-[#02483D] mb-6">Explore other categories</h2>
                    <CategoryListSection />
                </div>

            </div>

            <Footer />
        </>
    );
};

export default ProductPage;
