"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard"; // Use your existing ProductCard
import { Product } from "@/types/product";

interface Props {
    products: Product[];
    isLoading?: boolean;
}

const ProductList = ({ products, isLoading = false }: Props) => {
    const router = useRouter();

    const handleClick = (productId: string) => router.push(`/admin/product/${productId}`);

    if (isLoading) {
        return <div className="text-gray-400 text-center py-12">Loading products...</div>;
    }

    if (!products.length) {
        return <div className="text-gray-400 text-center py-12">No products found</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        >
            {products.map(product => (
                <div key={product._id} onClick={() => handleClick(product._id)}>
                    <ProductCard product={product} />
                    {!product.isActive && (
                        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                            Inactive
                        </span>
                    )}
                </div>
            ))}
        </motion.div>
    );
};

export default ProductList;
