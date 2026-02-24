"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { DeliveryAddressInput } from "@/schemas/user/address.schema";
import { toast } from "sonner";
import AddressForm from "@/components/public/AddressForm";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import useAuthRedirect from "@/utils/useAuthRedirect";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { sendEmailToAdmin } from "@/utils/emailClient";
import Loader from "@/components/public/Loader";

type CartItem = {
    quantity: number;
    product: {
        _id: string;
        name: string;
        price: number;
        image: string;
    }
};

const CartCheckoutPage = () => {
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

    const router = useRouter();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [cartItemsLoading, setCartItemsLoading] = useState(true);

    useEffect(() => {
        const fetchCart = async () => {
            const res = await api.get("/cart/get-cart");
            setCartItems(res.data.data.items);
            setCartItemsLoading(false);
        };
        fetchCart();
    }, []);

    const totalAmount = cartItems?.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    const handleCreateOrder = async (address: DeliveryAddressInput) => {
        try {
            setLoading(true);

            await api.post("/orders/create-order-from-cart", {
                deliveryAddress: address,
            });

            toast.success("Order placed successfully");
            router.push("/user/order/my-orders");

            // Notify admin
            await sendEmailToAdmin(emailData);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to place order");
        } finally {
            setLoading(false);
        }
    };

    if (cartItemsLoading) return <Loader />;

    return (
        <div>
            <Navbar />

            {!cartItems?.length ? (
                <div className="max-w-6xl py-10 mx-auto min-h-screen">
                    <h1 className="text-3xl font-bold text-[#02483D] mb-8">Order summary</h1>
                    <p className="text-center mt-20 font-medium text-gray-500">Your cart is empty</p>
                </div>

            ) : (

                <div className="min-h-screen max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Cart Summary */}
                    <div>
                        <h1 className="text-3xl font-bold text-[#02483D] mb-8">Order summary</h1>

                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.product._id} className="flex items-center gap-4 border p-4 rounded-lg">
                                    <img src={item.product.image} className="w-20 h-20 object-cover rounded" />
                                    <div className="flex-1">
                                        <p className="font-medium">{item.product.name}</p>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-semibold">Rs {Number(item.product.price * item.quantity).toLocaleString()}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex justify-between text-lg font-semibold border-t pt-4">
                            <span>Total</span>
                            <span>Rs {Number(totalAmount).toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Address Form */}
                    <div>
                        <h2 className="text-xl font-semibold mb-5">Delivery Address</h2>
                        <AddressForm onSubmit={handleCreateOrder} isSubmitting={loading} />
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default CartCheckoutPage;
