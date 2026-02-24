"use client";

import { User, LayoutDashboard, Globe, ExternalLink } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
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
        <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-6">
                <div onClick={() => router.push("/admin")} className="text-2xl font-semibold tracking-tight cursor-pointer text-white hover:text-white/90 transition">
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
                                <button onClick={() => router.push("/")} className="text-white/80 hover:text-white transition">
                                    <ExternalLink className="w-6 h-6" />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;