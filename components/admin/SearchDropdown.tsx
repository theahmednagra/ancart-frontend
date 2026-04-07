"use client";

import { useState, useEffect, useRef } from "react";
import api from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";
import { useDebounce } from "use-debounce";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { Order } from "@/types/order";
import { Product } from "@/types/product";

interface SearchDropdownProps {
    type: "orders" | "products";
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({ type }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<(Order | Product)[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);

    const [debouncedQuery] = useDebounce(query, 400);
    const containerRef = useRef<HTMLDivElement>(null);

    // dynamic endpoint
    const getEndpoint = () => {
        if (type === "orders") return "/admin/orders/search-orders";
        if (type === "products") return "/admin/products/search-products";
    };

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

                const res = await api.get(getEndpoint()!, {
                    params: { q: debouncedQuery, limit: 5 },
                });

                if (type === "orders") {
                    setResults(res.data.orders);
                } else {
                    setResults(res.data.products);
                }

                setShowDropdown(true);
            } catch (err: any) {
                setError(err?.response?.data?.message || "Failed to fetch results");
                setShowDropdown(false);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [debouncedQuery, type]);

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
            {/* INPUT */}
            <div className="hidden md:flex w-full items-center gap-2 bg-zinc-800 rounded-full px-4 py-2.5 focus-within:bg-zinc-900 focus-within:ring focus-within:ring-zinc-600 transition relative">
                <Search className="w-4 h-4 text-gray-400" />

                <input
                    type="text"
                    placeholder={`Search ${type}`}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => debouncedQuery.trim() && setShowDropdown(true)}
                    className="bg-transparent outline-none text-sm w-full text-gray-200 placeholder:text-gray-400"
                />

                {query && (
                    <button
                        onClick={() => {
                            setQuery("");
                            setShowDropdown(false);
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-zinc-700 transition"
                    >
                        <X size={16} className="text-gray-400" />
                    </button>
                )}
            </div>

            {/* DROPDOWN */}
            <AnimatePresence>
                {showDropdown && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full mt-2 w-full bg-zinc-900 border border-zinc-700 rounded-xl shadow-lg z-50 overflow-hidden"
                    >
                        {loading ? (
                            <div className="p-4 text-sm text-gray-400">Loading...</div>
                        ) : error ? (
                            <div className="p-4 text-sm text-red-500">{error}</div>
                        ) : results.length === 0 ? (
                            <div className="p-4 text-sm text-gray-400">No results found</div>
                        ) : (
                            results.map((item: any) => {

                                // ORDERS UI
                                if (type === "orders") {
                                    return (
                                        <Link
                                            key={item._id}
                                            href={`/admin/order/${item._id}`}
                                            onClick={() => setShowDropdown(false)}
                                            className="flex items-center justify-between px-4 py-3 hover:bg-zinc-800 transition"
                                        >
                                            <div className="flex flex-col min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-semibold text-gray-200">{item.orderId}</span>
                                                    <span className="text-xs text-gray-400 truncate">{item.orderData.fullName}</span>
                                                </div>
                                                <span className="text-xs text-gray-400 truncate">
                                                    {item.orderData.city}, {item.orderData.addressLine}
                                                </span>
                                            </div>

                                            <div className="flex flex-col items-end">
                                                <span className="text-sm text-gray-200">
                                                    Rs. {item.totalAmount.toLocaleString()}
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    {item.status}
                                                </span>
                                            </div>
                                        </Link>
                                    );
                                }

                                // PRODUCTS UI
                                return (
                                    <Link
                                        key={item._id}
                                        href={`/admin/product/${item._id}`}
                                        onClick={() => setShowDropdown(false)}
                                        className="flex items-center justify-between px-4 py-3 hover:bg-zinc-800 transition"
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <img
                                                src={item.image || "/placeholder.png"}
                                                className="w-10 h-10 rounded object-cover"
                                            />
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-sm text-gray-200 truncate">{item.name}</span>
                                                <span className="text-xs text-gray-400">
                                                    {item.category?.name}
                                                </span>
                                            </div>
                                        </div>

                                        <span className="text-sm text-gray-200">
                                            Rs. {item.price.toLocaleString()}
                                        </span>
                                    </Link>
                                );
                            })
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SearchDropdown;