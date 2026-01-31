"use client";

import { Search, ShoppingCart, User } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const user = useSelector((state: RootState) => state.auth.userData);

  return (
    <motion.header initial={{ y: -18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }} className="sticky top-0 z-50 bg-[#02483D]/90 backdrop-blur border-b border-gray-500">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-6">
        <div
          onClick={() => router.push("/")}
          className="text-2xl font-bold text-white tracking-tight cursor-pointer"
        >
          ancart
        </div>

        <div className="hidden md:flex items-center gap-2 w-90 bg-gray-100 rounded-full px-4 py-2.5 focus-within:bg-white focus-within:ring focus-within:ring-gray-400 transition">
          <Search className="w-4 h-4 text-gray-400" />
          <input placeholder="Search products" className="bg-transparent outline-none text-sm w-full text-gray-700 placeholder:text-gray-400" />
        </div>

        <div className="flex items-center gap-6">
          <button className="relative">
            <ShoppingCart className="w-6 h-6 text-white hover:text-gray-200 transition" />
            <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </button>

          {!user ? (
            <button className="font-medium text-white hover:text-gray-200 transition">
              Login
            </button>
          ) : (
            <button className="text-white hover:text-gray-200 transition">
              <User className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
