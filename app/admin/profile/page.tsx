"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Navbar from "@/components/admin/Navbar";
import Footer from "@/components/admin/Footer";
import LogoutButton from "@/components/admin/LogoutButton";
import { motion } from "framer-motion";
import { LogOut, Package } from "lucide-react";
import { useRouter } from "next/navigation";
import useAdminRedirect from "@/utils/useAdminRedirect";

const ProfilePage = () => {
    useAdminRedirect();

    const user = useSelector((state: RootState) => state.auth.userData);
    const router = useRouter();

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-gray-500">
                Not signed in
            </div>
        );
    }

    return (
        <>
            <Navbar />

            <div className="min-h-[calc(100vh-64px)] bg-zinc-900/99">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-5xl mx-auto px-4 py-10 md:py-14 space-y-10"
                >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-3xl md:text-3xl font-bold text-white">
                                Account
                            </h1>
                            <p className="text-gray-400 text-sm mt-1">
                                Manage your session and access
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-full bg-zinc-800 flex items-center justify-center text-white font-semibold">
                                {user.fullname?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="font-medium text-white">{user.fullname}</p>
                                <p className="text-sm text-gray-400">{user.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Cards */}
                    <div className="grid sm:grid-cols-2 gap-6">

                        {/* Orders */}
                        <div className="p-5 bg-zinc-800 rounded-2xl border border-zinc-700 shadow-sm flex flex-col">

                            <div className="w-11 h-11 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mb-4">
                                <Package size={22} />
                            </div>

                            <p className="font-semibold text-white">Orders</p>
                            <p className="text-sm text-gray-400 mt-1 mb-4">
                                Review, update and manage incoming orders
                            </p>

                            <div className="mt-auto">
                                <button
                                    onClick={() => router.push("/admin/order")}
                                    className="w-full py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-600/90 transition"
                                >
                                    Manage Orders
                                </button>
                            </div>

                        </div>

                        {/* Logout */}
                        <div className="p-5 bg-zinc-800 rounded-2xl border border-zinc-700 shadow-sm flex flex-col">
                            <div className="w-11 h-11 bg-red-500/10 text-red-400 rounded-xl flex items-center justify-center mb-4">
                                <LogOut size={22} />
                            </div>

                            <p className="font-semibold text-white">Sign out</p>
                            <p className="text-sm text-gray-400 mt-1 mb-4">
                                End your admin session securely
                            </p>

                            <div className="mt-auto">
                                <LogoutButton wide />
                            </div>
                        </div>

                    </div>

                    {/* Info / Support */}
                    <div className="bg-linear-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-xl p-6 text-white">
                        <p className="font-semibold text-lg mb-1">
                            Admin panel access
                        </p>
                        <p className="text-gray-400 text-sm max-w-md">
                            You are logged in with elevated privileges. Be mindful while performing critical actions.
                        </p>
                    </div>

                </motion.div>
            </div>

            <Footer />
        </>
    );
};

export default ProfilePage;