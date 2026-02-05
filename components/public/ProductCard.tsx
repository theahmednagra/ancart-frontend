"use client";

import { useRouter } from "next/navigation";

const ProductCard = ({ product }: { product: any }) => {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(`/user/product/${product._id}`)}
            className="bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-lg transition cursor-pointer"
        >

            {/* Product Image */}
            <div className="aspect-square bg-gray-100 rounded-xl mb-4 overflow-hidden flex items-center justify-center">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
            </div>

            {/* Product Info */}
            <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">{product.name}</h3>
            <p className="mt-2 text-base font-bold text-[#02483D]">
                Rs. {Number(product.price || 0).toLocaleString()}
            </p>

            {product.stock <= 5 && (
                <p className="text-xs text-red-500 mt-1">Limited stock</p>
            )}
        </div>
    );
};

export default ProductCard;
