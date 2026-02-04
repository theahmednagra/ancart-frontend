"use client";

import Footer from "@/components/admin/Footer";
import Navbar from "@/components/admin/Navbar";
import useAdminRedirect from "@/utils/useAdminRedirect";
import { useRouter } from "next/navigation";
import { Package, Layers, ShoppingBag } from "lucide-react";

const Page = () => {
  useAdminRedirect();
  const router = useRouter();

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-zinc-900/99">
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">

          {/* HEADER */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">
              Admin Dashboard
            </h1>
            <p className="text-gray-400 max-w-xl">
              Manage your store, monitor operations, and keep everything running smoothly from one place.
            </p>
          </div>

          {/* MAIN ACTIONS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* PRODUCTS */}
            <button
              onClick={() => router.push("/admin/product")}
              className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-left hover:border-emerald-500/60 hover:shadow-xl transition"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                <Package className="text-emerald-400" size={22} />
              </div>
              <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition">
                Manage Products
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                Add, update, activate or manage stock of products.
              </p>
            </button>

            {/* CATEGORIES */}
            <button
              onClick={() => router.push("/admin/category")}
              className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-left hover:border-emerald-500/60 hover:shadow-xl transition"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                <Layers className="text-emerald-400" size={22} />
              </div>
              <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition">
                Manage Categories
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                Organize products into categories for better browsing.
              </p>
            </button>

            {/* ORDERS */}
            <button
              onClick={() => router.push("/admin/order")}
              className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-left hover:border-emerald-500/60 hover:shadow-xl transition"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-8">
                <ShoppingBag className="text-emerald-400" size={22} />
              </div>
              <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition">
                Manage Orders
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                View, update, cancel and track customer orders.
              </p>
            </button>

          </div>

          {/* FOOT NOTE */}
          <div className="pt-6 mt-18 border-t border-zinc-800">
            <p className="text-sm text-gray-500 text-center">
              You are logged in as an administrator. All actions are audited.
            </p>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default Page;
