"use client";

import { useRouter } from "next/navigation";

const ProductCard = ({ product }: { product: any }) => {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(`/user/product/${product._id}`)}
            className="bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-lg transition cursor-pointer relative group"
        >
            {product.stock <= 5 && (
                <div className="text-xs z-10 shadow px-1.5 py-0.5 rounded-full text-neutral-600 bg-gray-50 opacity-90 absolute right-2 top-2">Almost sold out</div>
            )}

            {/* Product Image */}
            <div className="aspect-square mb-4 flex flex-col items-center justify-center">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 rounded-xl group-hover:scale-105" />
            </div>

            {/* Product Info */}
            <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">{product.name}</h3>

            <div className="block lg:flex items-center justify-between">
                <p className="mt-2 text-base font-bold text-[#02483D]">
                    Rs. {Number(product.price || 0).toLocaleString()}
                </p>
            </div>
        </div>
    );
};

export default ProductCard;
