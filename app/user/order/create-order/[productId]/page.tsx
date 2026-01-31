"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import api from "@/services/api";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { toast } from "sonner";
import { DeliveryAddressInput } from "@/schemas/user/address.schema";
import AddressForm from "@/components/public/AddressForm";


const OrderPage = () => {
    const { productId } = useParams() as { productId: string };
    const router = useRouter();

    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [quantity, setQuantity] = useState(1);

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

    const totalAmount = quantity * (product?.price || 0);

    const onSubmit = async (data: DeliveryAddressInput) => {
        if (quantity < 1 || quantity > product.stock) {
            toast.error("Invalid quantity");
            return;
        }

        setSubmitting(true);
        try {
            const res = await api.post("/orders/create-order", {
                deliveryAddress: data,
                items: [{ productId: product._id, quantity }],
            });

            toast.success("Order placed successfully!");
            router.push(`/user/order/my-orders`);
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Order failed");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;
    if (!product) return <div className="min-h-screen flex items-center justify-center text-gray-500">Product not found</div>;

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

                {/* Product Info */}
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                    <div className="w-full flex justify-center">
                        <div className="w-full max-w-sm aspect-square border border-gray-200 rounded-xl p-4 overflow-hidden flex items-center justify-center">
                            <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                        <p className="text-xl font-bold text-[#02483D]">Rs. {product.price}</p>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{product.description}</p>

                        <div className="flex items-center gap-4">
                            <label className="font-medium text-gray-800">Quantity:</label>
                            <input
                                type="number"
                                min={1}
                                max={product.stock}
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className="w-20 border border-gray-300 rounded-lg px-3 py-1 outline-none text-gray-700"
                            />
                            <span className="text-gray-600">Available: {product.stock}</span>
                        </div>

                        <div className="text-lg font-semibold">Total: Rs. {totalAmount}</div>
                    </div>
                </motion.div>

                {/* Delivery Address Form */}
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="bg-white border border-gray-200 rounded-xl p-6 shadow-md space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900">Delivery Address</h2>

                    <AddressForm onSubmit={onSubmit} isSubmitting={submitting} />
                </motion.div>

            </div>
            <Footer />
        </>
    );
};

export default OrderPage;
