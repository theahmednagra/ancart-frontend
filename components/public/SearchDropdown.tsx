"use client";

import { useState, useEffect, useRef } from "react";
import api from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";
import { useDebounce } from "use-debounce"; // small utility library for debouncing
import Link from "next/link";
import { Search, X } from "lucide-react";

type Product = {
    _id: string;
    name: string;
    slug: string;
    price: number;
    category: { name: string; slug: string };
    image?: string;
};

const SearchDropdown = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);

    const [debouncedQuery] = useDebounce(query, 400); // 400ms debounce
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setResults([]);
            setShowDropdown(false);
            return;
        }

        const fetchResults = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await api.get("/user/products/search-products", {
                    params: { q: debouncedQuery, limit: 5 },
                });
                setResults(res.data.data);
                setShowDropdown(true);
            } catch (err: any) {
                setError(err?.response?.data?.message || "Failed to fetch results");
                setShowDropdown(false);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [debouncedQuery]);

    // Close dropdown if click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative w-full max-w-md" ref={containerRef}>
            <div className="hidden md:flex w-full items-center gap-2 bg-gray-100 rounded-full px-4 py-2.5 focus-within:bg-white focus-within:ring focus-within:ring-gray-400 transition relative">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search products"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => debouncedQuery.trim() && setShowDropdown(true)}
                    className="bg-transparent outline-none text-sm w-full text-gray-700 placeholder:text-gray-400"
                />
                {query && (
                    <button
                        onClick={() => {
                            setQuery("");
                            setShowDropdown(false);
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 transition"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            <AnimatePresence>
                {showDropdown && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden"
                    >
                        {loading ? (
                            <div className="p-4 text-sm text-gray-500">Loading...</div>
                        ) : error ? (
                            <div className="p-4 text-sm text-red-500">{error}</div>
                        ) : results.length === 0 ? (
                            <div className="p-4 text-sm text-gray-500">No products found</div>
                        ) : (
                            results.map((product) => (
                                <Link
                                    key={product._id}
                                    href={`/user/product/${product._id}`}
                                    onClick={() => setShowDropdown(false)}
                                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 transition"
                                >
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-900">{product.name}</span>
                                        <span className="text-xs text-gray-500">{product.category.name}</span>
                                    </div>
                                    <span className="text-sm min-w-20 text-right font-semibold text-gray-800">
                                        Rs. {Number(product.price || 0).toLocaleString()}
                                    </span>
                                </Link>
                            ))
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {query && (
                <button
                    onClick={() => {
                        setQuery("");
                        setShowDropdown(false);
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 transition"
                >
                    <X size={16} />
                </button>
            )}
        </div>
    );
};

export default SearchDropdown;
