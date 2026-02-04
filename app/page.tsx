"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/public/Navbar";
import CategoryBar from "@/components/public/CategoryBar";
import ProductsListSection from "@/components/public/ProductsListSection";
import api from "@/services/api";
import { toast } from "sonner";
import Footer from "@/components/public/Footer";
import HeroSection from "@/components/public/HeroSection";

const HomePage = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/user/categories/get-public-categories");
        setCategories(res.data.categories || []);
      } catch (err) {
        toast.error("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <Navbar />
      <CategoryBar categories={categories} isLoading={loading} />
      <HeroSection />
      <main id="categories-section" className="max-w-7xl mx-auto px-4 py-10 space-y-16">
        {categories.map(category => (
          <ProductsListSection key={category._id} category={category} showName={true} showViewAll={true} />
        ))}
      </main>

      <Footer />
    </>
  );
};

export default HomePage;
