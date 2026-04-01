"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import LogoutButton from "@/components/public/LogoutButton";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Package, LogOut } from "lucide-react";

const ProfilePage = () => {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.auth.userData);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="w-full max-w-sm bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center">

                    <h2 className="text-xl font-semibold text-gray-800">Not signed in</h2>
                    <p className="text-gray-500 mt-2 mb-6">
                        Login to access your account and orders
                    </p>
                    <button
                        onClick={() => router.push('/auth/signin')}
                        className="w-full bg-[#02483D] text-white py-3 rounded-lg font-medium hover:bg-[#01362d] transition"
                    >
                        Continue
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="min-h-[calc(100vh-64px)] max-w-5xl mx-auto px-4 py-10 md:py-14 space-y-10"
            >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-[#02483D]">
                            Account
                        </h1>
                        <p className="text-gray-600 mt-1 text-sm">
                            Manage your activity and session
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-11 h-11 shadow-sm rounded-full text-[#02483D] flex items-center justify-center bg-gray-100 text-lg font-bold">
                            {user.fullname?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className="font-semibold text-gray-800">{user.fullname}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                    </div>
                </div>

                {/* Cards */}
                <div className="grid sm:grid-cols-2 gap-8">

                    {/* Orders */}
                    <div
                        className="group p-5 bg-white rounded-2xl border border-gray-100 shadow-sm transition flex flex-col"
                    >
                        <div className="w-11 h-11 bg-green-100/80 text-[#02483D] rounded-xl flex items-center justify-center mb-4">
                            <Package size={22} />
                        </div>

                        <p className="font-semibold text-gray-800">Orders</p>
                        <p className="text-sm text-gray-600 mt-1 mb-4">
                            Track and manage purchases
                        </p>

                        <div className="mt-auto">
                            <button
                                onClick={() => router.push("/user/order/my-orders")}
                                className="px-6 py-3 w-full bg-[#02483D]/96 text-white rounded-lg font-medium hover:bg-[#02483D] transition"
                            >
                                Manage Orders
                            </button>
                        </div>
                    </div>

                    {/* Logout */}
                    <div className="group p-5 bg-white rounded-2xl border border-gray-100 shadow-sm transition flex flex-col">
                        <div className="w-11 h-11 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-4">
                            <LogOut size={22} />
                        </div>

                        <p className="font-semibold text-gray-800">Sign out</p>
                        <p className="text-sm text-gray-600 mt-1 mb-4">
                            End your current session
                        </p>

                        <div className="mt-auto">
                            <LogoutButton wide />
                        </div>
                    </div>

                </div>

                {/* Support Card */}
                <div className="bg-[#02483D] rounded-2xl p-6 md:p-8 text-white">
                    <p className="font-semibold text-lg mb-1">
                        Need help?
                    </p>
                    <p className="text-white/80 text-sm max-w-md">
                        We're here if something isn’t working as expected.
                    </p>

                    <button
                        onClick={() => router.push("/user/contact")}
                        className="mt-5 px-5 w-full py-2.5 bg-gray-100 text-[#02483D] rounded-lg font-medium hover:bg-white transition"
                    >
                        Contact Us
                    </button>
                </div>

            </motion.div>
            <Footer />
        </>
    );
};

export default ProfilePage;