"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ProductsListSection = ({ category, showName = true, showViewAll = true }: { category: any; showName: boolean; showViewAll: boolean }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get(`/user/products/get-products-by-category/${category._id}`);
        setProducts(res.data.products || []);
      } catch {
        toast.error(`Failed to load ${category.name}`);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category._id, category.name]);

  if (loading) {
    return <div className="h-56 bg-gray-100 rounded-2xl animate-pulse" />;
  }

  if (!products.length) return null;

  return (
    <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="space-y-6">
      {showName && (
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold text-[#02483D] tracking-tight">{category.name}</h2>
          {showViewAll && (
            <button
              onClick={() => router.push(`/user/category/${category?._id}`)}
              className="text-sm font-medium text-gray-600 hover:text-[#02483D] transition"
            >
              View all
            </button>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </motion.section>
  );
};

export default ProductsListSection;
