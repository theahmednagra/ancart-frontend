"use client";

import { useState } from "react";
import api from "@/services/api";
import { toast } from "sonner";

type Props = {
    productId: string;
    stock: number;
};

const AddToCartButton = ({ productId, stock }: Props) => {
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);

    const handleAddToCart = async () => {
        if (quantity < 1) return toast.error("Invalid quantity");
        if (quantity > stock) return toast.error("Quantity exceeds stock");

        try {
            setLoading(true);
            await api.post("/cart/add-to-cart", { productId, quantity });
            toast.success("Added to cart");
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to add to cart");
        } finally {
            setLoading(false);
        }
    };

    const isOutOfStock = stock === 0 || loading;

    return (
        <div className="flex gap-2 w-full">
            <input
                type="number"
                min={1}
                max={stock}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                disabled={isOutOfStock}
                className={`w-15 text-center rounded-lg border border-gray-300 px-2 py-3 focus:outline-none disabled:bg-gray-100 disabled:text-gray-400`}
            />
            <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`flex-1 py-3 w-30 px-4 rounded-lg font-medium transition-transform text-white ${isOutOfStock ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-[#02483D] hover:scale-105 active:scale-95"}`}
            >
                {loading ? "Adding..." : "Add to Cart"}
            </button>
        </div>
    );
};

export default AddToCartButton;
