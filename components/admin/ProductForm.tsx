"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/services/api";
import { toast } from "sonner";
import { ProductInput, productSchema } from "@/schemas/admin/product.schema";
import { Upload } from "lucide-react";
import { motion } from "framer-motion";

const ProductForm = ({ onProductAdded }: { onProductAdded: any }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [categories, setCategories] = useState<any[]>([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm({
        resolver: zodResolver(productSchema),
    });

    useEffect(() => {
        if (preview) return () => URL.revokeObjectURL(preview);
    }, [preview]);

    useEffect(() => {
        api
            .get("/admin/categories/get-all-categories")
            .then((res) => setCategories(res.data.categories))
            .catch(() => toast.error("Failed to load categories"));
    }, []);

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue("image", file, { shouldValidate: true });
            setPreview(URL.createObjectURL(file));
        }
    };

    const onFormSubmit = async (data: ProductInput) => {
        try {
            setIsLoading(true);

            const formData = new FormData();

            formData.append("name", data.name);
            formData.append("image", data.image);
            formData.append("price", String(data.price));
            formData.append("stock", String(data.stock));
            formData.append("categoryId", data.categoryId);
            formData.append("description", data.description);

            const res = await api.post(
                "/admin/products/create-product",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            toast.success("Product added successfully");
            setPreview(null);
            onProductAdded?.(res.data.product)
            reset();
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto mt-8 bg-zinc-900/80 border border-white/10 rounded-2xl shadow-xl p-8"
        >
            <h2 className="text-2xl font-semibold text-white mb-1">
                Add product
            </h2>
            <p className="text-sm text-white/60 mb-6">
                Products will appear in your store catalog after publishing
            </p>

            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                {/* Top row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {["name", "price", "stock"].map((field) => (
                        <div key={field}>
                            <input
                                type={field === "name" ? "text" : "number"}
                                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                {...register(field as any)}
                                className="w-full rounded-lg border border-white/10 bg-zinc-800 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                            />
                            {errors[field as keyof ProductInput] && (
                                <p className="mt-1 text-xs text-red-400">
                                    {errors[field as keyof ProductInput]?.message as string}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                {/* Category + Image */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <select
                            {...register("categoryId")}
                            className="w-full rounded-lg border border-white/10 bg-zinc-800 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                        >
                            <option value="">Select category</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        {errors.categoryId && (
                            <p className="mt-1 text-xs text-red-400">
                                {errors.categoryId.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-medium text-white/70 flex items-center gap-2 mb-2">
                            Image <Upload size={16} />
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImage}
                            className="block w-full text-sm text-white/60 file:mr-4 file:rounded-md file:border-0 file:bg-zinc-800 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-zinc-700"
                        />

                        {preview && (
                            <div className="mt-4 w-32 h-32 rounded-lg overflow-hidden border border-white/10">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Description */}
                <div>
                    <textarea
                        {...register("description")}
                        rows={4}
                        placeholder="Product description"
                        className="w-full rounded-lg border border-white/10 bg-zinc-800 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                    {errors.description && (
                        <p className="mt-1 text-xs text-red-400">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                <button
                    disabled={isLoading}
                    className="w-full rounded-lg bg-white text-black py-3 text-sm font-medium hover:bg-white/90 transition disabled:opacity-50"
                >
                    {isLoading ? "Saving..." : "Add product"}
                </button>
            </form>
        </motion.div>

    );
};

export default ProductForm;
