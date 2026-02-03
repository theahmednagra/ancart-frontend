"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Navbar from "@/components/admin/Navbar";
import Footer from "@/components/admin/Footer";
import LogoutButton from "@/components/public/LogoutButton";
import { motion } from "framer-motion";

const ProfilePage = () => {
    const user = useSelector((state: RootState) => state.auth.userData);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-400 bg-zinc-950">
                User not logged in
            </div>
        );
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen w-full px-4 py-16 bg-zinc-900/99">
                <div className="max-w-3xl mx-auto space-y-10">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="bg-zinc-900 rounded-xl shadow-md p-8 flex flex-col gap-6 border border-zinc-800"
                >
                    <h1 className="text-3xl font-bold text-white">My Profile</h1>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 font-medium">Full Name:</span>
                            <span className="text-white font-semibold">{user.fullname}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 font-medium">Email:</span>
                            <span className="text-white font-semibold">{user.email}</span>
                        </div>
                    </div>

                    {user.role === "ADMIN" && (
                        <div className="pt-5 border-t border-zinc-700">
                            <p className="text-sm text-gray-400 text-center">Logged in as an administrator</p>
                        </div>
                    )}

                    <div className="pt-4 border-t border-zinc-700 text-center">
                        <LogoutButton />
                    </div>
                </motion.div>
            </div>
            </div>

            <Footer />
        </>
    );
};

export default ProfilePage;
