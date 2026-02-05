"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { motion } from "framer-motion";
import { toast } from "sonner";
import useAuthRedirect from "@/utils/useAuthRedirect";

const MyOrdersPage = () => {
    useAuthRedirect(); // Redirect unauthenticated users to signin page

    const router = useRouter();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await api.get("/orders/get-user-orders");
                setOrders(res.data.data);
            } catch {
                toast.error("Failed to load orders");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading orders...</div>;

    return (
        <>
            <Navbar />

            <div className="min-h-screen max-w-6xl mx-auto px-4 py-10 space-y-6">
                <h1 className="text-3xl font-bold text-[#02483D]">My Orders</h1>

                {orders.length === 0 ? (
                    <p className="text-gray-600">You haven’t placed any orders yet.</p>
                ) : (
                    <div className="space-y-4">
                        {orders.map(order => (
                            <motion.div
                                key={order._id}
                                whileHover={{ scale: 1.01 }}
                                onClick={() => router.push(`/user/order/my-orders/${order._id}`)}
                                className="cursor-pointer border rounded-xl p-5 flex justify-between items-start hover:shadow-md transition"
                            >
                                <div className="space-y-1">
                                    <p className="font-semibold text-gray-900">Order #{order._id.slice(-6)}</p>
                                    <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>

                                    <div className="space-y-1 mt-2">
                                        <h2 className="font-semibold text-gray-600">Item(s)</h2>
                                        {order.items.map((item: any) => (
                                            <div key={item._id} className="flex justify-between text-sm text-gray-600">
                                                <span>{item.product.name} × {item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="text-center space-y-1">
                                    <p className="font-bold text-[#02483D]">
                                        Rs. {Number(order.totalAmount || 0).toLocaleString()}
                                    </p>

                                    <span className={`text-xs px-3 py-1 rounded-full border ${order.status === "CANCELLED" ? "border-red-400 text-red-500" : order.status === "PENDING" ? "border-gray-800 text-gray-800" : "border-green-500 text-green-600"}`}>
                                        {order.status}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
};

export default MyOrdersPage;
