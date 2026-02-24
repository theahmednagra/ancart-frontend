"use client";

import { ShoppingCart, User, LayoutDashboard, Search } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SearchDropdown from "./SearchDropdown";
import MobileSearch from "./MobileSearchDropdown";

const Navbar = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const user = useSelector((state: RootState) => state.auth.userData);

    useEffect(() => {
        if (user?.role === "ADMIN") setIsAdmin(true);
    }, [user]);

    /**
     * Pages where search bar should be visible
     */
    const showSearchBar =
        pathname === "/" ||
        pathname.startsWith("/user/product") ||
        pathname.startsWith("/user/category");

    return (
        <header
            className="sticky top-0 z-50 bg-[#02483D]/90 backdrop-blur border-b border-gray-500"
        >
            <div className="max-w-7xl mx-auto px-4 h-16 flex md:grid md:grid-cols-3 items-center">

                {/* LEFT - Logo */}
                <div className="flex items-center md:justify-start flex-1 md:flex-none">
                    <div
                        onClick={() => router.push("/")}
                        className="text-2xl font-bold text-white tracking-tight cursor-pointer"
                    >
                        ancart
                    </div>
                </div>

                {/* CENTER - Desktop Search */}
                <div className="hidden md:flex justify-center">
                    <div className="w-full max-w-xl">
                        {showSearchBar && <SearchDropdown />}
                    </div>
                </div>

                {/* RIGHT - Actions */}
                <div className="flex items-center justify-end gap-6 flex-1 md:flex-none">

                    {/* Mobile Search Button */}
                    {showSearchBar && (
                        <button
                            className="md:hidden text-white hover:text-gray-200 transition"
                            onClick={() => setShowMobileSearch(true)}
                        >
                            <Search className="w-6 h-6" />
                        </button>
                    )}

                    {!user ? (
                        <button
                            onClick={() => router.push("/auth/signin")}
                            className="font-medium text-white hover:text-gray-200 transition"
                        >
                            Login
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() => router.push("/user/cart")}
                                className="relative"
                            >
                                <ShoppingCart className="w-6 h-6 text-white hover:text-gray-200 transition" />
                            </button>

                            <button
                                onClick={() => router.push("/user/profile")}
                                className="text-white hover:text-gray-200 transition"
                            >
                                <User className="w-6 h-6" />
                            </button>

                            {isAdmin && (
                                <button
                                    onClick={() => router.push("/admin")}
                                    className="text-white hover:text-gray-200 transition"
                                >
                                    <LayoutDashboard className="w-6 h-6" />
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Search Overlay */}
            {showMobileSearch && (
                <MobileSearch onClose={() => setShowMobileSearch(false)} />
            )}
        </header>
    );
};

export default Navbar;
