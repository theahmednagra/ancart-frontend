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
    useAuthRedirect(); // Redirect unauthenticated users to signin page

    const { orderId } = useParams() as { orderId: string };
    const router = useRouter();
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [cancelling, setCancelling] = useState(false);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await api.get("/orders/get-user-orders");
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

    if (loading) return <Loader />;
    if (!order) return <div className="min-h-screen flex items-center justify-center text-gray-500">Order not found</div>;

    return (
        <>
            <Navbar />

            <div className="min-h-screen max-w-5xl mx-auto px-4 py-10 space-y-8">
                <h1 className="text-2xl font-bold text-[#02483D]">Order Details</h1>

                {/* Address */}
                <div className="border rounded-xl p-5">
                    <h2 className="font-semibold mb-2">Delivery Address</h2>
                    <p className="text-gray-600">{order.deliveryAddress.fullName}</p>
                    <p className="text-gray-600">{order.deliveryAddress.phone}</p>
                    <p className="text-gray-600">{order.deliveryAddress.addressLine}, {order.deliveryAddress.city}</p>
                </div>

                {/* Items */}
                <div className="border rounded-xl p-5 space-y-4">
                    <h2 className="font-semibold">Items</h2>

                    {order.items.map((item: any) => (
                        <div key={item._id} className="flex justify-between items-center text-sm">
                            <div className="flex items-center space-x-2">
                                {/* Product Image */}
                                <img
                                    src={item.product.image || "/placeholder.png"}
                                    alt={item.product.name}
                                    className="w-12 h-12 rounded object-cover shrink-0"
                                />
                                {/* Product Name and Quantity */}
                                <span>
                                    {item.product.name} × {item.quantity}
                                </span>
                            </div>
                            {/* Price */}
                            <span>Rs. {Number(item.price || 0).toLocaleString()}</span>
                        </div>
                    ))}

                    {/* Total */}
                    <div className="flex justify-between font-bold pt-3 border-t">
                        <span>Total</span>
                        <span>Rs. {Number(order.totalAmount || 0).toLocaleString()}</span>
                    </div>
                </div>

                {/* Status */}
                <div className="border rounded-xl p-5">
                    <h2 className="font-semibold mb-2">Current Status</h2>
                    <p className={`text-gray-700 ${order.status === "CANCELLED" ? "text-red-500" : ""}`}>
                        {order.status}
                    </p>
                    {order.status === "CANCELLED" && order.cancelReason && (
                        <>
                            <p className="text-gray-700">Cancelled By: <strong>Ancart Admin</strong></p>
                            <p className="text-gray-700">Cancellation Reason: {order.cancelReason}</p>
                        </>
                    )}
                </div>

                {/* Cancel */}
                {order.status !== "CANCELLED" && order.status !== "DELIVERED" && order.status !== "SHIPPED" && (
                    <div className="border rounded-xl p-5">
                        <h2 className="font-semibold mb-4">Cancel Order</h2>
                        <button onClick={() => setShowCancelModal(true)} className="px-4 py-2 w-full bg-red-500 text-white rounded-lg font-medium hover:opacity-90 transition">
                            Cancel Order
                        </button>
                    </div>
                )}
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
