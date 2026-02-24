"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/services/api";
import Navbar from "@/components/admin/Navbar";
import Footer from "@/components/admin/Footer";
import { toast } from "sonner";
import useAuthRedirect from "@/utils/useAuthRedirect";
import UpdateOrderStatusForm from "@/components/admin/UpdateOrderStatusForm";
import AdminCancelOrderForm from "@/components/admin/AdminCancelOrderForm";
import Loader from "@/components/admin/Loader";

const OrderDetailPage = () => {
    useAuthRedirect(); // Redirect unauthenticated users

    const { orderId } = useParams() as { orderId: string };
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await api.get("/admin/orders/get-all-orders");
                const found = res.data.data.find((o: any) => o._id === orderId);
                setOrder(found);
            } catch {
                toast.error("Failed to load order");
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [orderId]);

    if (loading) return <Loader />;

    if (!order)
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center text-gray-400 bg-zinc-900">
                    Order not found
                </div>
                <Footer />
            </>
        );

    return (
        <>
            <Navbar />

            <div className="min-h-screen w-full px-4 py-10 bg-zinc-900/99 text-white">
                <div className="min-h-screen max-w-5xl mx-auto space-y-6">

                    <h1 className="text-2xl font-bold text-white">Order Details</h1>

                    {/* Delivery Address */}
                    <div className="border border-zinc-700 rounded-xl p-5 bg-zinc-800">
                        <h2 className="font-semibold text-white mb-2">Delivery Address</h2>
                        <p className="text-gray-300">{order.deliveryAddress.fullName}</p>
                        <p className="text-gray-300">{order.deliveryAddress.phone}</p>
                        <p className="text-gray-300">
                            {order.deliveryAddress.addressLine}, {order.deliveryAddress.city}
                        </p>
                    </div>

                    {/* Items */}
                    <div className="border border-zinc-700 rounded-xl p-5 space-y-4 bg-zinc-800">
                        <h2 className="font-semibold text-white">Items</h2>

                        {order.items.map((item: any) => (
                            <div key={item._id} className="flex justify-between items-center text-sm text-gray-300">
                                <div className="flex items-center space-x-2">
                                    {/* Product Image */}
                                    <img
                                        src={item.product?.image || "/placeholder.png"}
                                        alt={item.product?.name || item.name}
                                        className="w-12 h-12 rounded object-cover shrink-0"
                                    />
                                    {/* Product Name × Quantity */}
                                    <span>
                                        {item.product?.name || item.name} × {item.quantity}
                                    </span>
                                </div>
                                {/* Price */}
                                <span>Rs. {Number(item.price).toLocaleString()}</span>
                            </div>
                        ))}

                        <div className="flex justify-between font-bold pt-3 border-t border-zinc-700 text-gray-100">
                            <span>Total</span>
                            <span>Rs. {Number(order.totalAmount).toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="border border-zinc-700 rounded-xl p-5 bg-zinc-800">
                        <h2 className="font-semibold text-white mb-2">Current Status</h2>
                        <p className={`text-gray-300 ${order.status === "CANCELLED" ? "text-red-400" : ""}`}>
                            {order.status}
                        </p>
                        {order.status === "CANCELLED" && order.cancelReason && (
                            <>
                                <p className="text-gray-300">Cancelled By: <strong>{order?.cancelledBy?.email}</strong></p>
                                <p className="text-gray-300">Cancellation Reason: {order.cancelReason}</p>
                            </>
                        )}
                    </div>

                    {/* Admin Forms */}
                    <div className="space-y-4">
                        {/* Update Status */}
                        {order.status !== "CANCELLED" && order.status !== "DELIVERED" && (
                            <UpdateOrderStatusForm
                                orderId={orderId}
                                currentStatus={order.status}
                                onUpdate={(newStatus) =>
                                    setOrder((prev: any) => ({ ...prev, status: newStatus }))
                                }
                            />
                        )}

                        {/* Cancel Order */}
                        {order.status !== "CANCELLED" && order.status !== "DELIVERED" && (
                            <AdminCancelOrderForm
                                orderId={orderId}
                                onCancel={(data) =>
                                    setOrder((prev: any) => ({
                                        ...prev,
                                        status: "CANCELLED",
                                        cancelReason: data.reason,
                                        cancelledAt: new Date(),
                                    }))
                                }
                            />
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default OrderDetailPage;
