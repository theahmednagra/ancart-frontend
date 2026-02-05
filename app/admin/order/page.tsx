"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import Navbar from "@/components/admin/Navbar";
import Footer from "@/components/admin/Footer";
import { motion } from "framer-motion";
import { toast } from "sonner";
import useAuthRedirect from "@/utils/useAuthRedirect";

const MyOrdersPage = () => {
    useAuthRedirect(); // Redirect unauthenticated users

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

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-[calc(100vh-64px)] flex items-center justify-center text-gray-400 bg-zinc-900">
                    Loading orders...
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen w-full px-4 py-10 bg-zinc-900/99 text-white">
                <div className="min-h-screen max-w-6xl mx-auto space-y-6">
                    <h1 className="text-3xl font-bold text-white">All Orders</h1>

                    {orders.length === 0 ? (
                        <p className="text-gray-400">No orders yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {orders.map(order => (
                                <motion.div
                                    key={order._id}
                                    whileHover={{ scale: 1.01 }}
                                    onClick={() => router.push(`/admin/order/${order._id}`)}
                                    className="cursor-pointer bg-zinc-800 border border-zinc-700 rounded-xl p-5 flex justify-between items-start hover:shadow-lg transition"
                                >
                                    {/* Left info */}
                                    <div className="space-y-2">
                                        <p className="font-semibold text-white">Order #{order._id.slice(-6)}</p>
                                        <p className="text-sm text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>

                                        <div className="space-y-1 mt-2">
                                            <h2 className="font-semibold text-gray-200">Item(s)</h2>
                                            {order.items.map((item: any) => (
                                                <div key={item._id} className="flex justify-between text-sm text-gray-300">
                                                    <span>{item.product.name} × {item.quantity}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right info */}
                                    <div className="text-center space-y-2 shrink-0">
                                        <p className="font-bold text-white">Rs. {order.totalAmount}</p>
                                        <span className={`text-xs px-3 py-1 rounded-full border font-semibold ${order.status === "CANCELLED" ? "border-red-500 text-red-400" : order.status === "PENDING" ? "border-gray-200 text-gray-200" : "border-green-500 text-green-400"} `}>
                                            {order.status}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default MyOrdersPage;
