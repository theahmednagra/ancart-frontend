"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import LogoutButton from "@/components/public/LogoutButton";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.auth.userData);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                User not logged in
            </div>
        );
    }

    return (
        <>
            <Navbar />

            <div className="max-w-3xl min-h-screen mx-auto px-4 py-16 space-y-10">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="bg-white rounded-xl shadow-md p-8 flex flex-col gap-6"
                >
                    <h1 className="text-3xl font-bold text-[#02483D]">My Profile</h1>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 font-medium">Full Name:</span>
                            <span className="text-gray-900 font-semibold">{user.fullname}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 font-medium">Email:</span>
                            <span className="text-gray-900 font-semibold">{user.email}</span>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200 text-center">
                        <button 
                        onClick={() => router.push("/user/order/my-orders")}
                        className="text-gray-700 font-semibold underline hover:text-gray-900"
                        >
                            View Order History
                        </button>
                    </div>

                    <div className="pt-4 border-t border-gray-200 text-center">
                        <LogoutButton />
                    </div>
                </motion.div>
            </div>

            <Footer />
        </>
    );
};

export default ProfilePage;
