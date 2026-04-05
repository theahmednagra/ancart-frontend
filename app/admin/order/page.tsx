"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import Navbar from "@/components/admin/Navbar";
import Footer from "@/components/admin/Footer";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Loader from "@/components/admin/Loader";
import useAdminRedirect from "@/utils/useAdminRedirect";

const OrdersPage = () => {
    useAdminRedirect();

    const router = useRouter();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await api.get("/admin/orders/get-all-orders");
                setOrders(res.data.data);
            } catch {
                toast.error("Failed to load orders");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="grow w-full bg-zinc-900/99 px-4 py-12">
                <div className="max-w-5xl mx-auto">
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold text-white tracking-tight">Order Management</h1>
                        <p className="text-zinc-400 text-sm mt-1">Review and manage customer transactions</p>
                    </header>

                    {orders.length === 0 ? (
                        <div className="text-center py-20 border border-dashed border-zinc-700 rounded-2xl">
                            <p className="text-zinc-500">No orders found in the system.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order, index) => (
                                <motion.div
                                    key={order._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => router.push(`/admin/order/${order._id}`)}
                                    className="group relative cursor-pointer bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700/50 hover:border-zinc-500 rounded-2xl p-5 flex justify-between items-stretch transition-all duration-300"
                                >
                                    {/* Left Side: Identification & Items */}
                                    <div className="flex flex-col justify-between space-y-4">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] font-semibold text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-700">
                                                    #{order._id.slice(-6).toUpperCase()}
                                                </span>
                                                <span className="text-xs text-zinc-400">
                                                    {new Date(order.createdAt).toLocaleDateString('en-PK', {
                                                        day: '2-digit', month: 'short', year: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-1 mt-2">
                                            {order.items.map((item: any) => (
                                                <div key={item._id} className="flex justify-between text-sm text-gray-300 items-center">
                                                    <div className="flex items-center space-x-2">
                                                        {/* Product Image */}
                                                        <img
                                                            src={item.product.image || "/placeholder.png"}
                                                            alt={item.product.name}
                                                            className="w-12 h-12 rounded-md object-cover shrink-0"
                                                        />
                                                        {/* Product Name & Quantity */}
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-medium">
                                                                {item.product?.name}
                                                            </span>
                                                            <span className="text-xs text-gray-500 font-semibold">
                                                                Qty: {item.quantity}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right info */}
                                    <div className="min-w-35 flex flex-col justify-between items-end text-right self-stretch">
                                        {/* Top Section: Payment & Price */}
                                        <div className="space-y-1">
                                            <p className={`text-[10px] font-semibold uppercase tracking-widest ${order?.orderData.paymentMethod === "COD" ? "text-amber-400" : "text-blue-400"}`}>
                                                {order?.orderData.paymentMethod === "COD" ? "Cash On Delivery" : "Card Payment"}
                                            </p>
                                            <p className="font-semibold text-white">
                                                Rs. {Number(order.totalAmount || 0).toLocaleString()}
                                            </p>
                                        </div>

                                        {/* Bottom Section: Status Badge */}
                                        <div className={`text-[10px] uppercase tracking-wider px-3 py-1 rounded-md border font-semibold 
                                            ${order.status === "CANCELLED"
                                                ? "border-red-500/50 bg-red-500/10 text-red-400"
                                                : order.status === "PENDING"
                                                    ? "border-zinc-600 text-zinc-400"
                                                    // : order.status === "DELIVERED"
                                                    //     ? "border-blue-600/50 bg-blue-500/10 text-blue-400"
                                                    //     : order.status === "SHIPPED"
                                                    //         ? "border-yellow-600/50 bg-yellow-200/10 text-yellow-400"
                                                            : "border-green-600/50 bg-green-500/10 text-green-400"} 
                                                `}>
                                            {order.status}
                                        </div>
                                    </div>

                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};


export default OrdersPage;
