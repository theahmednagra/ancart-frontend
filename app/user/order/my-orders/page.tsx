"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import useAuthRedirect from "@/utils/useAuthRedirect";
import Loader from "@/components/public/Loader";

const MyOrdersPage = () => {
    useAuthRedirect();

    const router = useRouter();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await api.get("/orders/get-user-orders");
                // Sort by newest first
                const sorted = res.data.data.sort((a: any, b: any) =>
                    new Date(b.createdAt).getTime() - new Date(a.getTime).getTime()
                );
                setOrders(sorted);
            } catch {
                toast.error("Failed to load orders");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <Loader />

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="grow max-w-5xl mx-auto w-full px-4 py-12">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-[#02483D] tracking-tight">My Orders</h1>
                    <p className="text-gray-500 text-sm mt-1">Track and manage your recent purchases</p>
                </header>

                {orders.length === 0 ? (
                    <div className="text-center py-20 bg-white border border-dashed border-gray-300 rounded-2xl">
                        <p className="text-gray-500">You haven’t placed any orders yet.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <AnimatePresence>
                            {orders.map((order, index) => (
                                <motion.div
                                    key={order._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => router.push(`/user/order/my-orders/${order._id}`)}
                                    className="group cursor-pointer bg-white border border-gray-200 hover:border-[#02483D]/30 rounded-2xl p-5 flex justify-between items-stretch transition-all duration-300 hover:shadow-sm"
                                >
                                    {/* Left Side: Order Info & Items */}
                                    <div className="flex flex-col justify-between space-y-5">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded uppercase tracking-wider">
                                                    #{order._id.slice(-6).toUpperCase()}
                                                </span>
                                                <span className="text-xs text-gray-400 font-medium">
                                                    {new Date(order.createdAt).toLocaleDateString('en-PK', {
                                                        day: '2-digit', month: 'short', year: 'numeric'
                                                    })}
                                                </span>
                                            </div>

                                            <div className="space-y-3 mt-4">
                                                {order.items.map((item: any) => (
                                                    <div key={item._id} className="flex items-center space-x-3">
                                                        <img
                                                            src={item.product?.image || "/placeholder.png"}
                                                            alt=""
                                                            className="w-12 h-12 rounded-md object-cover shrink-0"
                                                        />
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-medium text-gray-800">
                                                                {item.product?.name}
                                                            </span>
                                                            <span className="text-xs text-gray-500 font-semibold">
                                                                Qty: {item.quantity}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Side: Price & Status */}
                                    <div className="flex flex-col justify-between items-end text-right min-w-35 self-stretch">
                                        <div className="space-y-1">
                                            <p className={`text-[10px] font-semibold uppercase tracking-widest ${order?.orderData.paymentMethod === "COD" ? "text-amber-500" : "text-blue-500"}`}>
                                                {order?.orderData.paymentMethod === "COD" ? "Cash On Delivery" : "Card Payment"}
                                            </p>
                                            <p className="font-semibold text-gray-900">
                                                Rs. {Number(order.totalAmount || 0).toLocaleString()}
                                            </p>
                                        </div>

                                        <div className={`text-[10px] uppercase tracking-wider px-3 py-1 rounded-md border font-semibold 
                                            ${order.status === "CANCELLED"
                                                ? "border-red-300 bg-red-50 text-red-600"
                                                : order.status === "PENDING"
                                                    ? "border-gray-300 bg-gray-50 text-gray-600"
                                                    // : order.status === "DELIVERED"
                                                    //     ? "border-blue-300 bg-blue-50 text-blue-600"
                                                    //     : order.status === "SHIPPED"
                                                    //         ? "border-yellow-300 bg-yellow-50 text-yellow-600"
                                                            : "border-green-300 bg-green-50 text-green-600"}
                                                `}>
                                            {order.status}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default MyOrdersPage;
