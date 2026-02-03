"use client";

import { Search, ShoppingCart, User, LayoutDashboard } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SearchDropdown from "./SearchDropdown";

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const router = useRouter();

  const user = useSelector((state: RootState) => state.auth.userData);

  useEffect(() => {
    if (user?.role === "ADMIN") {
      setIsAdmin(true);
    }
  }, [user])

  return (
    <motion.header initial={{ y: -18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }} className="sticky top-0 z-50 bg-[#02483D]/90 backdrop-blur border-b border-gray-500">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-6">
        <div
          onClick={() => router.push("/")}
          className="text-2xl font-bold text-white tracking-tight cursor-pointer"
        >
          ancart
        </div>

        <div className="flex items-center gap-4">
          <SearchDropdown />
        </div>

        <div className="flex items-center gap-6">

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
                {/* <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span> */}
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
    </motion.header>
  );
};

export default Navbar;
