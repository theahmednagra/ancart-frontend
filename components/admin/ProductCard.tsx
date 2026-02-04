"use client";

import { useRouter } from "next/navigation";

const ProductCard = ({ product }: { product: any }) => {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(`/admin/products/${product._id}`)}
            className="bg-zinc-900/80 rounded-2xl overflow-hidden border border-white/10 cursor-pointer hover:border-white/20 hover:shadow-xl transition-all"
        >
            {/* Product Image */}
            <div className="aspect-square bg-white p-4 overflow-hidden flex items-center justify-center">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
            </div>

            {/* Product Info */}
            <div className="p-4">
                <h3 className="text-sm font-medium text-white leading-snug line-clamp-2">
                    {product.name}
                </h3>

                <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-emerald-400">
                        Rs. {product.price}
                    </p>

                    <span className="text-xs text-white/50">
                        Stock: {product.stock}
                    </span>
                </div>
                {product.stock <= 5 && (
                    <p className="text-xs text-amber-400">
                        Low inventory
                    </p>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
