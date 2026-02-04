"use client";

import { ShoppingCart, User, LayoutDashboard, Search } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { motion } from "framer-motion";
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
    <motion.header
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 bg-[#02483D]/90 backdrop-blur border-b border-gray-500"
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-6">

        {/* Logo */}
        <div
          onClick={() => router.push("/")}
          className="text-2xl font-bold text-white tracking-tight cursor-pointer"
        >
          ancart
        </div>

        {/* Desktop Search */}
        {showSearchBar && (
          <div className="flex-1 hidden md:flex justify-center">
            <SearchDropdown />
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-6">

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
            <div className="flex items-center gap-6">
              <button
                onClick={() => router.push("/user/profile")}
                className="text-white hover:text-gray-200 transition"
              >
                <User className="w-6 h-6" />
              </button>

              <button
                onClick={() => router.push("/user/cart")}
                className="relative"
              >
                <ShoppingCart className="w-6 h-6 text-white hover:text-gray-200 transition" />
              </button>

              {isAdmin && (
                <button
                  onClick={() => router.push("/admin")}
                  className="text-white hover:text-gray-200 transition"
                >
                  <LayoutDashboard className="w-6 h-6" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <MobileSearch onClose={() => setShowMobileSearch(false)} />
      )}
    </motion.header>
  );
};

export default Navbar;
