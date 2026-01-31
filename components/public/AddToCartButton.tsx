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

    return (
        <div className="flex items-center gap-4">
            <input type="number" min={1} max={stock} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="w-20 border rounded px-2 py-1" />
            <button onClick={handleAddToCart} disabled={loading} className="bg-black text-white px-6 py-2 rounded disabled:opacity-50">
                {loading ? "Adding..." : "Add to Cart"}
            </button>
        </div>
    );
};

export default AddToCartButton;
