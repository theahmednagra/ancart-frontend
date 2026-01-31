"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const CartPage = () => {
    const router = useRouter();
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [cartItems, setCartItems] = useState<any[]>([]);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const res = await api.get("/cart/get-cart");
            setItems(res.data.data.items || []);
        } catch {
            toast.error("Failed to load cart");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const updateQuantity = async (productId: string, quantity: number, stock: number) => {
        if (quantity < 1 || quantity > stock) return;
        setUpdatingId(productId);
        try {
            await api.patch("/cart/update-quantity", { productId, quantity });
            await fetchCart(); // refresh cart from backend
        } catch {
            toast.error("Failed to update quantity");
        } finally {
            setUpdatingId(null);
        }
    };

    const removeItem = async (productId: string) => {
        setUpdatingId(productId);
        try {
            await api.delete(`/cart/remove-from-cart/${productId}`);
            await fetchCart();
            toast.success("Item removed");
        } catch {
            toast.error("Failed to remove item");
        } finally {
            setUpdatingId(null);
        }
    };

    const getCurrentQty = (productId: string) =>
        items.find(i => i.product._id === productId)?.quantity || 1;

    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return (
        <>
            <Navbar />

            <div className="min-h-screen max-w-7xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold text-[#02483D] mb-8">Your Cart</h1>

                {loading ? (
                    <div className="flex justify-center py-20 text-gray-500">Loading cart...</div>
                ) : items.length === 0 ? (
                    <div className="text-center py-20 space-y-4">
                        <p className="text-gray-600 text-lg">Your cart is empty</p>
                        <button onClick={() => router.push("/")} className="px-6 py-3 bg-[#02483D] text-white rounded-lg font-medium hover:opacity-90 transition">
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        {/* CART ITEMS */}
                        <div className="lg:col-span-2 space-y-6">
                            {items.map(item => (
                                <motion.div key={item.product._id} layout className="flex gap-4 border border-gray-200 rounded-xl p-4 bg-white">
                                    <div className="w-24 h-24 rounded-lg border border-gray-100 overflow-hidden flex items-center justify-center">
                                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain" />
                                    </div>

                                    <div className="flex-1 flex flex-col gap-2">
                                        <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                                        <p className="text-sm text-gray-500">Rs. {item.product.price}</p>

                                        {/* QUANTITY INPUT */}
                                        <div className="flex items-center gap-3 mt-2">
                                            <button
                                                disabled={updatingId === item.product._id || item.quantity <= 1}
                                                onClick={() => updateQuantity(item.product._id, item.quantity - 1, item.product.stock)}
                                                className="w-8 h-8 rounded-md border flex items-center justify-center disabled:opacity-40"
                                            >
                                                <Minus size={14} />
                                            </button>

                                            <input
                                                type="number"
                                                min={1}
                                                max={item.product.stock}
                                                value={item.quantity}
                                                onChange={e => {
                                                    const value = Number(e.target.value);
                                                    if (Number.isNaN(value)) return;
                                                    updateQuantity(item.product._id, value, item.product.stock);
                                                }}
                                                className="w-14 text-center border rounded-md py-1 outline-none"
                                            />

                                            <button
                                                disabled={updatingId === item.product._id || item.quantity >= item.product.stock}
                                                onClick={() => updateQuantity(item.product._id, item.quantity + 1, item.product.stock)}
                                                className="w-8 h-8 rounded-md border flex items-center justify-center disabled:opacity-40"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>

                                    </div>

                                    <div className="flex flex-col justify-between items-end">
                                        <p className="font-semibold text-gray-900">Rs. {item.product.price * item.quantity}</p>
                                        <button
                                            disabled={updatingId === item.product._id}
                                            onClick={() => removeItem(item.product._id)}
                                            className="text-red-500 hover:text-red-600 transition"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* SUMMARY */}
                        <div className="border border-gray-200 rounded-xl p-6 bg-white space-y-4">
                            <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>

                            <div className="flex justify-between text-gray-700">
                                <span>Subtotal</span>
                                <span>Rs. {subtotal}</span>
                            </div>

                            <div className="flex justify-between font-semibold text-lg text-gray-900">
                                <span>Total</span>
                                <span>Rs. {subtotal}</span>
                            </div>

                            <button
                                onClick={() => router.push("/user/cart/checkout")}
                                className="w-full mt-4 py-3 bg-[#02483D] text-white rounded-lg font-medium hover:opacity-90 transition"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
};

export default CartPage;
