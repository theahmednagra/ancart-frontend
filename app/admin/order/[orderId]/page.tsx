"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/services/api";
import Navbar from "@/components/admin/Navbar";
import Footer from "@/components/admin/Footer";
import { toast } from "sonner";
import UpdateOrderStatusForm from "@/components/admin/UpdateOrderStatusForm";
import AdminCancelOrderForm from "@/components/admin/AdminCancelOrderForm";
import Loader from "@/components/admin/Loader";
import useAdminRedirect from "@/utils/useAdminRedirect";

const OrderDetailPage = () => {
    useAdminRedirect();

    const { orderId } = useParams() as { orderId: string };
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await api.get(`/orders/get-order/${orderId}`);
                setOrder(res?.data?.data);
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
                <div className="min-h-screen flex items-center justify-center text-zinc-500 bg-zinc-900">
                    Order not found
                </div>
                <Footer />
            </>
        );

    const isActionable = order.status !== "CANCELLED" && order.status !== "DELIVERED";

    return (
        <>
            <Navbar />

            <div className="min-h-screen w-full px-4 py-10 bg-zinc-900/99 text-white">
                <div className="max-w-5xl mx-auto space-y-6">

                    <div className="pb-4">
                        <h1 className="text-3xl font-bold text-white tracking-tight">Order Details</h1>
                        <p className="text-zinc-500 text-xs font-mono mt-1 uppercase tracking-wider">Order ID: {order._id}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Account Details */}
                        <div className="border border-zinc-700 rounded-xl p-6 bg-zinc-800 shadow-sm">
                            <h2 className="text-xs font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-700/50 pb-4 mb-5">Customer & Payment</h2>
                            <div className="text-zinc-300 text-sm space-y-1">
                                <p className="text-white font-semibold">{order?.user?.fullname}</p>
                                <p className="text-zinc-400">{order?.user?.email}</p>
                                <p className={`italic ${order?.orderData.paymentMethod === "COD" ? "text-amber-400" : "text-blue-400"}`}>
                                    {order?.orderData.paymentMethod === "COD" ? "Cash On Delivery" : "Card Payment"}
                                </p>
                            </div>
                        </div>

                        {/* Order Details */}
                        <div className="border border-zinc-700 rounded-xl p-6 bg-zinc-800 shadow-sm">
                            <h2 className="text-xs font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-700/50 pb-4 mb-5">Shipping Address</h2>
                            <div className="text-zinc-300 text-sm space-y-1">
                                <p className="font-medium text-white">{order.orderData.fullName}</p>
                                <p>{order.orderData.phone}</p>
                                <p className="italic">{order.orderData.addressLine}, {order.orderData.city}</p>
                            </div>
                        </div>
                    </div>

                    {/* Items */}
                    <div className="border border-zinc-700 rounded-xl p-6 space-y-5 bg-zinc-800 shadow-sm">
                        <h2 className="text-xs font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-700/50 pb-4 mb-5">Package Items</h2>

                        <div className="divide-y divide-zinc-700/50">
                            {order.items.map((item: any) => (
                                <div key={item._id} className="flex justify-between items-center py-3 first:pt-0 last:pb-0">
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={item.product?.image || "/placeholder.png"}
                                            alt=""
                                            className="w-14 h-14 rounded-md object-cover border border-zinc-700 shrink-0"
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-white">
                                                {item.product?.name}
                                            </span>
                                            <span className="text-xs text-zinc-500 mt-1">
                                                Quantity: <span className="text-zinc-300 font-bold">{item.quantity}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-zinc-300 font-mono text-sm">Rs. {Number(item.price).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between items-center pt-5 border-t border-zinc-700">
                            <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Total Bill</span>
                            <span className="font-semibold text-white">
                                Rs. {Number(order.totalAmount).toLocaleString()}
                            </span>
                        </div>
                    </div>

                    {/* Cancellation Log (Visible only if cancelled) */}
                    {order.status === "CANCELLED" && (
                        <div className="border border-red-900/50 rounded-xl p-6 bg-red-900/5">
                            <h2 className="text-xs font-black text-red-500 uppercase tracking-widest border-b border-zinc-700/50 pb-4 mb-5">Cancellation Details</h2>
                            <div className="space-y-2 text-sm">
                                <p className="text-zinc-400">Processed By: <span className="text-zinc-200 font-medium">{order?.cancelledBy?.email || "Admin"}</span></p>
                                <p className="text-zinc-400">Reason: <span className="text-red-400">"{order.cancelReason}"</span></p>
                            </div>
                        </div>
                    )}

                    {/* Admin Actions */}
                    {isActionable && (
                        <div className="grid grid-cols-1 gap-6">
                            <UpdateOrderStatusForm
                                orderId={orderId}
                                currentStatus={order.status}
                                paymentMethod={order.orderData.paymentMethod}
                                onUpdate={(newStatus) =>
                                    setOrder((prev: any) => ({ ...prev, status: newStatus }))
                                }
                            />

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
                        </div>
                    )}

                    {!isActionable && order.status !== "CANCELLED" && (
                        <div className="text-center py-6 border border-dashed border-zinc-700 rounded-xl">
                            <p className="text-zinc-500 text-sm italic">This order has been delivered and is now read-only.</p>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default OrderDetailPage;