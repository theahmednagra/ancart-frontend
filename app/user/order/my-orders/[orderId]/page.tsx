"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/services/api";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { toast } from "sonner";
import ConfirmationModal from "@/components/public/ConfirmationModal";
import useAuthRedirect from "@/utils/useAuthRedirect";
import Loader from "@/components/public/Loader";

const OrderDetailPage = () => {
    useAuthRedirect();

    const { orderId } = useParams() as { orderId: string };
    const router = useRouter();

    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [cancelling, setCancelling] = useState(false);
    const [processing, setProcessing] = useState(false);

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

    const handleCancelOrder = async () => {
        try {
            setCancelling(true);
            await api.patch(`/orders/cancel-order/${orderId}`);
            toast.success("Order cancelled");
            router.push("/user/order/my-orders");
        } catch {
            toast.error("Failed to cancel order");
        } finally {
            setCancelling(false);
            setShowCancelModal(false);
        }
    };

    const handlePayNow = async () => {
        try {
            setProcessing(true);
            const res = await api.post(`/payment/create/${orderId}`);
            const checkoutUrl = res.data.checkoutUrl;
            checkoutUrl && window.location.replace(checkoutUrl);
        } catch {
            toast.error("Failed to create payment");
        }
    };

    if (loading) return <Loader />;

    if (!order)
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center text-zinc-500">
                    Order not found
                </div>
                <Footer />
            </>
        );

    return (
        <>
            <Navbar />

            <div className="min-h-screen w-full px-4 py-10 bg-white">
                <div className="max-w-5xl mx-auto space-y-6">

                    <div className="pb-4">
                        <h1 className="text-3xl font-bold tracking-tight text-[#02483D]">Order Details</h1>
                        <p className="text-zinc-500 text-xs font-mono mt-1 uppercase tracking-wider">Order ID: {order.orderId}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="border border-zinc-200 rounded-xl p-6 bg-white shadow-sm">
                            <h2 className="text-xs font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-200/50 pb-4 mb-5">Account & Payment</h2>
                            <div className="text-sm space-y-1">
                                <p className="text-[#02483D] font-semibold">{order?.user?.fullname}</p>
                                <p className="text-zinc-600">{order?.user?.email}</p>
                                <p className={`italic ${order?.orderData.paymentMethod === "COD" ? "text-amber-600" : "text-blue-600"}`}>
                                    {order?.orderData.paymentMethod === "COD" ? "Cash On Delivery" : "Card Payment"}
                                </p>
                            </div>
                        </div>

                        <div className="border border-zinc-200 rounded-xl p-6 bg-white shadow-sm">
                            <h2 className="text-xs font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-200/50 pb-4 mb-5">Shipping Address</h2>
                            <div className="text-zinc-700 text-sm space-y-1">
                                <p className="font-semibold">{order.orderData.fullName}</p>
                                <p className="text-zinc-600">{order.orderData.phone}</p>
                                <p className="italic">{order.orderData.addressLine}, {order.orderData.city}</p>
                            </div>
                        </div>
                    </div>

                    <div className="border border-zinc-200 rounded-xl p-6 space-y-5 bg-white shadow-sm">
                        <h2 className="text-xs font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-200/50 pb-4 mb-5">Package Items</h2>

                        <div className="divide-y divide-zinc-200/50">
                            {order.items.map((item: any) => (
                                <div key={item._id} className="flex justify-between items-center py-3 first:pt-0 last:pb-0">
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={item.product?.image || "/placeholder.png"}
                                            alt=""
                                            className="w-14 h-14 rounded-sm object-cover shrink-0"
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-zinc-800">
                                                {item.product?.name}
                                            </span>
                                            <span className="text-xs text-zinc-500 mt-1">
                                                Quantity: <span className="text-zinc-700 font-bold">{item.quantity}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-zinc-700 font-mono text-sm">Rs. {Number(item.price).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between items-center pt-5 border-t border-zinc-200">
                            <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Total Bill</span>
                            <span className="font-semibold text-[#02483D]">
                                Rs. {Number(order.totalAmount).toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <div className="border border-zinc-200 rounded-xl p-6 bg-white shadow-sm">
                        <h2 className="text-xs font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-200/50 pb-4 mb-5">Order Status</h2>

                        <div className="flex items-center justify-between text-sm">
                            <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Current State</span>
                            <p className={`text-sm font-semibold ${order.status === "CANCELLED" ? "text-red-500" :
                                order.status === "DELIVERED" ? "text-green-600" :
                                    "text-[#02483D]"
                                }`}>
                                {order.status}
                            </p>
                        </div>

                        {order.status === "CANCELLED" && order.cancelReason && (
                            <div className="text-center text-sm mt-3">
                                <p className="text-red-500 italic">{order.cancelReason}</p>
                            </div>
                        )}
                    </div>

                    {order.orderData.paymentMethod === "CARD" && order.status === "PENDING" && (
                        <div className="border border-zinc-200 rounded-xl p-6 bg-white shadow-sm">
                            <div className="flex items-center justify-between border-b border-zinc-200/50 pb-4 mb-5">
                                <h2 className="text-xs font-black text-zinc-500 uppercase tracking-widest">Payment Action</h2>
                            </div>
                            <p className="text-zinc-400 text-xs mb-5 leading-relaxed italic">
                                Complete your payment securely to confirm your order and begin processing without any delays.
                            </p>
                            <button
                                disabled={processing}
                                onClick={handlePayNow}
                                className="px-4 py-3 font-semibold tracking-wide text-xs uppercase w-full bg-[#02483D] text-white rounded-lg hover:opacity-90 transition disabled:opacity-90"
                            >
                                {processing ? "Processing..." : "Pay Now"}
                            </button>
                        </div>
                    )}

                    {order.status !== "PAID" && order.status !== "CANCELLED" && order.status !== "DELIVERED" && order.status !== "SHIPPED" && (
                        !(order.status === "CONFIRMED" && order.orderData.paymentMethod === "CARD") && (
                            <div className="border border-red-200 rounded-xl p-6 bg-red-50">
                                <div className="flex items-center justify-between border-b border-zinc-200/50 pb-4 mb-5">
                                    <h2 className="text-xs font-black text-zinc-500 uppercase tracking-widest">Order Cancellation</h2>
                                </div>
                                <p className="text-zinc-400 text-xs mb-5 leading-relaxed italic">
                                    You can cancel this order before processing or shipping, but this action cannot be undone.
                                </p>
                                <button
                                    onClick={() => setShowCancelModal(true)}
                                    className="px-4 py-3 font-semibold tracking-wide text-xs uppercase w-full bg-red-500 text-white rounded-lg hover:opacity-90 transition"
                                >
                                    Cancel Order
                                </button>
                            </div>
                        )
                    )}
                </div>
            </div>

            <ConfirmationModal
                open={showCancelModal}
                title="Cancel Order"
                description="Are you sure you want to cancel this order? This action cannot be undone."
                confirmText="Yes, Cancel"
                loading={cancelling}
                onClose={() => setShowCancelModal(false)}
                onConfirm={handleCancelOrder}
            />

            <Footer />
        </>
    );
};

export default OrderDetailPage;