"use client";

import { ProductInput } from "@/schemas/admin/product.schema";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const ProductList = ({ products, isLoading = false }: { products: any[]; isLoading: boolean }) => {
    const router = useRouter();
    const handleClick = (productId: string) => router.push(`/admin/product/${productId}`);

    return (
        <div className="max-w-7xl mx-auto">

            {isLoading ? (
                <div className="text-gray-500 text-center py-12">Loading products...</div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {products.map((product: any) => (
                        <motion.div
                            key={product._id}
                            onClick={() => handleClick(product._id)}
                            whileHover={{ scale: 1.04, boxShadow: "0 10px 25px rgba(0,0,0,0.15)" }}
                            className={`relative cursor-pointer bg-white rounded-2xl overflow-hidden shadow transition-all duration-300 flex flex-col`}
                        >
                            {/* Product Image */}
                            <div className="w-full h-44 bg-gray-100 flex items-center justify-center">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            </div>

                            {/* Product Info */}
                            <div className="p-4 flex flex-col flex-1 justify-between space-y-1">
                                <h3 className="text-gray-900 font-semibold text-lg truncate">{product.name}</h3>
                                <p className="text-gray-700 font-medium text-sm truncate">{product.category?.name}</p>
                                <p className="text-gray-700 text-sm">Price: {product.price} PKR</p>
                                <p className="text-gray-700 text-sm">Stock: {product.stock}</p>
                            </div>

                            {/* Inactive Badge */}
                            {!product.isActive && (
                                <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                                    Inactive
                                </span>
                            )}
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;
