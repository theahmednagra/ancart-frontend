"use client";

import { useState, useEffect, useRef } from "react";
import api from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";
import { useDebounce } from "use-debounce";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { Order } from "@/types/order";
import { Product } from "@/types/product";

interface MobileSearchProps {
    onClose: () => void;
    type: "orders" | "products";
}

const MobileSearch: React.FC<MobileSearchProps> = ({ onClose, type }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<(Order | Product)[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const [debouncedQuery] = useDebounce(query, 400);

    // Dynamic API based on type
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

                // normalize response
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
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed inset-0 z-50 bg-black/40 flex justify-center items-start pt-16 md:hidden"
            >
                <div ref={containerRef} className="w-full max-w-md bg-zinc-900 p-4 shadow-lg rounded-xl">

                    {/* INPUT */}
                    <div className="flex items-center gap-2 bg-zinc-800 rounded-full px-4 py-2.5">
                        <Search className="w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder={`Search ${type}`}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            autoFocus
                            className="bg-transparent outline-none text-[15px] w-full text-gray-200 placeholder:text-gray-400"
                        />
                        <button onClick={onClose} className="p-1 rounded-full hover:bg-zinc-700 transition">
                            <X size={16} className="text-gray-400" />
                        </button>
                    </div>

                    {/* DROPDOWN */}
                    <AnimatePresence>
                        {showDropdown && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mt-2 w-full bg-zinc-900 border border-zinc-700 rounded-xl shadow-lg overflow-hidden"
                            >
                                {loading ? (
                                    <div className="p-4 text-sm text-gray-400">Loading...</div>
                                ) : error ? (
                                    <div className="p-4 text-sm text-red-500">{error}</div>
                                ) : results.length === 0 ? (
                                    <div className="p-4 text-sm text-gray-400">No results found</div>
                                ) : (
                                    results.map((item: any) => {

                                        // ORDER UI
                                        if (type === "orders") {
                                            return (
                                                <Link
                                                    key={item._id}
                                                    href={`/admin/order/${item._id}`}
                                                    onClick={onClose}
                                                    className="flex items-center justify-between px-4 py-3 hover:bg-zinc-800 transition"
                                                >
                                                    <div className="flex flex-col min-w-0">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm font-semibold text-gray-200">{item.orderId}</span>
                                                            <span className="text-xs text-gray-400 truncate">{item.orderData.fullName}</span>
                                                        </div>
                                                        <span className="text-xs text-gray-400 truncate">
                                                            {item.orderData.city}
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

                                        // PRODUCT UI
                                        return (
                                            <Link
                                                key={item._id}
                                                href={`/admin/product/${item._id}`}
                                                onClick={onClose}
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
            </motion.div>
        </AnimatePresence>
    );
};

export default MobileSearch;