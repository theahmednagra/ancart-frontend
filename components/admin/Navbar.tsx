"use client";

import { User, ExternalLink, Search } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import SearchDropdown from "./SearchDropdown";
import MobileSearch from "./MobileSearchDropdown";

const Navbar = () => {
    const [showMobileSearch, setShowMobileSearch] = useState(false);

    const router = useRouter();
    const pathname = usePathname();

    const user = useSelector((state: RootState) => state.auth.userData);
    const authLoading = useSelector((state: RootState) => state.auth.authLoading);

    // derive search type
    const searchType = useMemo<"orders" | "products" | null>(() => {
        if (pathname.startsWith("/admin/order")) return "orders";
        if (pathname.startsWith("/admin/product")) return "products";
        return null;
    }, [pathname]);

    const showSearchBar = !!searchType;

    const isAdmin = user?.role === "ADMIN";

    return (
        <header
            className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10"
        >
            <div className="max-w-7xl mx-auto px-4 h-16 flex md:grid md:grid-cols-3 items-center">

                {/* LEFT - Logo */}
                <div className="flex items-center md:justify-start flex-1 md:flex-none">
                    <div
                        onClick={() => router.push("/admin")}
                        className="text-2xl font-bold cursor-pointer text-white hover:text-white/90 transition"
                        style={{ fontFamily: "Encode Sans, sans-serif" }}
                    >
                        ancart
                    </div>
                </div>

                {/* CENTER - Desktop Search */}
                <div className="hidden md:flex justify-center">
                    <div className="w-full max-w-xl">
                        {showSearchBar && searchType && (
                            <SearchDropdown type={searchType} />
                        )}
                    </div>
                </div>

                {/* RIGHT - Actions */}
                <div className="flex items-center justify-end gap-6 flex-1 md:flex-none">

                    {/* Mobile Search Button */}
                    {showSearchBar && searchType && (
                        <button
                            className="md:hidden text-white hover:text-gray-200 transition"
                            onClick={() => setShowMobileSearch(true)}
                        >
                            <Search className="w-6 h-6" />
                        </button>
                    )}

                    {!authLoading && (
                        <>
                            {!user ? (
                                <button
                                    onClick={() => router.push("/auth/signin")}
                                    className="font-medium text-white/80 hover:text-white transition"
                                >
                                    Login
                                </button>
                            ) : (
                                <div className="flex items-center gap-6">
                                    <button
                                        onClick={() => router.push("/admin/profile")}
                                        className="text-white/80 hover:text-white transition"
                                    >
                                        <User className="w-6 h-6" />
                                    </button>

                                    {isAdmin && (
                                        <button
                                            onClick={() => router.push("/")}
                                            className="text-white/80 hover:text-white transition"
                                        >
                                            <ExternalLink className="w-6 h-6" />
                                        </button>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Search Overlay */}
            {showMobileSearch && searchType && (
                <MobileSearch
                    type={searchType}
                    onClose={() => setShowMobileSearch(false)}
                />
            )}
        </header>
    );
};

export default Navbar;