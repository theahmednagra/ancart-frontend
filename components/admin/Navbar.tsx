"use client";

import { Search, ShoppingCart, User, LayoutDashboard } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();
    const user = useSelector((state: RootState) => state.auth.userData);

    useEffect(() => {
        if (user?.role === "ADMIN") setIsAdmin(true);
    }, [user]);

    return (
        <motion.header initial={{ y: -18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }} className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-6">
                <div onClick={() => router.push("/")} className="text-2xl font-semibold tracking-tight cursor-pointer text-white hover:text-white/90 transition">
                    ancart
                </div>

                <div className="flex items-center gap-6">
                    {!user ? (
                        <button onClick={() => router.push("/auth/signin")} className="font-medium text-white/80 hover:text-white transition">
                            Login
                        </button>
                    ) : (
                        <div className="flex items-center gap-6">
                            <button onClick={() => router.push("/admin/profile")} className="text-white/80 hover:text-white transition">
                                <User className="w-6 h-6" />
                            </button>

                            {isAdmin && (
                                <button onClick={() => router.push("/admin")} className="text-white/80 hover:text-white transition">
                                    <LayoutDashboard className="w-6 h-6" />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </motion.header>
    );
};

export default Navbar;