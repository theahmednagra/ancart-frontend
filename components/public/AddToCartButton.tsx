"use client";

import { useState } from "react";
import api from "@/services/api";
import { toast } from "sonner";
import { Plus, Minus } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

type Props = {
  productId: string;
  stock: number;
};

const AddToCartButton = ({ productId, stock }: Props) => {
  const userData = useSelector((state: RootState) => state.auth.userData);

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    if (!userData) return toast.info("You need to sign in to perform this action.");

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

  const isOutOfStock = stock === 0;

  return (
    <div className="flex gap-2 w-full border border-[#02483D] bg-[#02483D] rounded-lg shadow-sm overflow-hidden">
      {/* Quantity controls */}
      <div className="flex items-center bg-white rounded-lg overflow-hidden">
        <button
          onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
          disabled={quantity === 1 || isOutOfStock || loading}
          className="px-3 py-2 bg-white disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Minus size={18} className="text-gray-600" />
        </button>

        <span className="w-8 text-center text-gray-800 font-semibold">{quantity}</span>

        <button
          onClick={() => setQuantity((prev) => Math.min(prev + 1, stock))}
          disabled={quantity === stock || isOutOfStock || loading}
          className="px-3 py-2 bg-white disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Plus size={18} className="text-gray-600" />
        </button>
      </div>

      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        disabled={isOutOfStock || loading}
        className={`flex-1 py-3 px-5 rounded-lg font-medium text-white transition-transform ${isOutOfStock ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-[#02483D] hover:scale-104"}`}
      >
        {loading ? "Adding..." : stock === 0 ? "Out of Stock" : "Add to Cart"}
      </button>
    </div>
  );
};

export default AddToCartButton;
