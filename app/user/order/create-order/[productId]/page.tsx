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
import useAuthRedirect from "@/utils/useAuthRedirect";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { sendEmailToAdmin } from "@/utils/emailClient";
import { Minus, Plus } from "lucide-react";


const OrderPage = () => {
    useAuthRedirect(); // Redirect unauthenticated users to signin page

    const userData = useSelector((state: RootState) => state.auth.userData);

    // Data to send email to admin after order placement
    const emailData = {
        name: userData?.fullname as string,
        email: userData?.email as string,
        subject: "New Order Received – Ancart",
        message: `A new order has been placed on Ancart.

            You can review the order details by visiting the admin panel:
            https://ancart.vercel.app/admin/order`
    };

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
            await api.post("/orders/create-order", {
                deliveryAddress: data,
                items: [{ productId: product._id, quantity }],
            });

            toast.success("Order placed successfully!");
            router.push(`/user/order/my-orders`);

            // Notify admin
            await sendEmailToAdmin(emailData);
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Order failed");
        } finally {
            setSubmitting(false);
        }
    };

    const isOutOfStock = product?.stock === 0 || loading;

    if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;
    if (!product) return <div className="min-h-screen flex items-center justify-center text-gray-500">Product not found</div>;

    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">

                {/* Product Info */}
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                    <div className="w-full flex justify-center">
                        <div className="w-full max-w-sm aspect-square border border-gray-200 rounded-xl p-4 overflow-hidden flex items-center justify-center">
                            <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                        <p className="text-xl font-bold text-[#02483D]">
                            Rs. {Number(product.price).toLocaleString()}
                        </p>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{product.description}</p>

                        <div className="flex items-center gap-4">
                            <label className="font-medium text-gray-800">Quantity:</label>

                            {/* Quantity controls */}
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                                <button
                                    onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                                    disabled={quantity === 1 || isOutOfStock}
                                    className="px-3 py-2 bg-white disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    <Minus size={18} className="text-gray-600" />
                                </button>

                                <span className="w-8 text-center text-gray-800 font-semibold">{quantity}</span>

                                <button
                                    onClick={() => setQuantity((prev) => Math.min(prev + 1, product.stock))}
                                    disabled={quantity === product.stock || isOutOfStock}
                                    className="px-3 py-2 bg-white disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    <Plus size={18} className="text-gray-600" />
                                </button>
                            </div>
                            <span className="text-gray-600">Available: {product.stock}</span>
                        </div>

                        <div className="text-lg font-semibold">
                            Total: Rs. {Number(totalAmount || 0).toLocaleString()}
                        </div>
                    </div>
                </motion.div>

                {/* Delivery Address Form */}
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-xl p-6 shadow-md space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900">Delivery Address</h2>

                    <AddressForm onSubmit={onSubmit} isSubmitting={submitting} />
                </motion.div>

            </div>
            <Footer />
        </>
    );
};

export default OrderPage;
