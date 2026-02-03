"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/services/api";
import { toast } from "sonner";
import { UpdateProductInput, updateProductSchema } from "@/schemas/admin/updateProduct.schema";
import { Upload } from "lucide-react";
import { motion } from "framer-motion";

const UpdateProductForm = ({ productId, onUpdate }: { productId: string, onUpdate: any }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [categories, setCategories] = useState<any[]>([]);
    const [product, setProduct] = useState<any>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm({
        resolver: zodResolver(updateProductSchema),
    });

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, prodRes] = await Promise.all([
                    api.get("/admin/categories/get-all-categories"),
                    api.get(`/admin/products/get-product-by-id/${productId}`),
                ]);
                setCategories(catRes.data.categories);
                setProduct(prodRes.data.product);
            } catch {
                toast.error("Failed to load product or categories");
            }
        };
        fetchData();
    }, [productId]);



    useEffect(() => {
        if (!product) return;
        reset({
            name: product.name,
            price: product.price,
            stock: product.stock,
            description: product.description,
            categoryId: product.category?._id,
            isActive: product.isActive ? "true" : "false",
        });
        setPreview(product.imageUrl || null);
    }, [product, reset]);

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue("image", file, { shouldValidate: true });
            setPreview(URL.createObjectURL(file));
        }
    };

    const onFormSubmit = async (data: UpdateProductInput) => {
        try {
            setIsLoading(true);

            const formData = new FormData();

            formData.append("name", data.name as string);
            if (data.image) formData.append("image", data.image as File);
            formData.append("price", String(data.price));
            formData.append("stock", String(data.stock));
            formData.append("categoryId", data.categoryId as string);
            formData.append("description", data.description as string);
            formData.append("isActive", String(data.isActive));

            const res = await api.patch(
                `/admin/products/update-product/${productId}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            toast.success("Product updated successfully");
            setPreview(product.imageUrl || null);
            onUpdate?.(res.data.product); // live data updates
            reset();
        } catch {
            toast.error("Failed to update product");
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
            <h2 className="text-2xl font-semibold text-white mb-1">Update product</h2>
            <p className="text-sm text-white/60 mb-6">Edit product details below</p>

            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">

                {/* Top row: Name, Price, Stock */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {["name", "price", "stock"].map((field) => (
                        <div key={field}>
                            <input
                                type={field === "name" ? "text" : "number"}
                                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                {...register(field as any)}
                                className="w-full rounded-lg border border-white/10 bg-zinc-800 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                            />
                            {errors[field as keyof UpdateProductInput] && (
                                <p className="mt-1 text-xs text-red-400">
                                    {errors[field as keyof UpdateProductInput]?.message as string}
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
                            <p className="mt-1 text-xs text-red-400">{errors.categoryId.message}</p>
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

                        {(preview || product?.imageUrl) && (
                            <div className="mt-4 w-32 h-32 rounded-lg overflow-hidden border border-white/10">
                                <img
                                    src={preview || product.imageUrl}
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
                        placeholder="Product description"
                        rows={4}
                        className="w-full rounded-lg border border-white/10 bg-zinc-800 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                    {errors.description && (
                        <p className="mt-1 text-xs text-red-400">{errors.description.message}</p>
                    )}
                </div>

                {/* Status */}
                <div>
                    <select
                        {...register("isActive")}
                        className="w-full rounded-lg border border-white/10 bg-zinc-800 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                    >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                    {errors.isActive && (
                        <p className="mt-1 text-xs text-red-400">{errors.isActive.message}</p>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-lg bg-white text-black py-3 text-sm font-medium hover:bg-white/90 transition disabled:opacity-50"
                >
                    {isLoading ? "Saving..." : "Save product"}
                </button>
            </form>
        </motion.div>

    );
};

export default UpdateProductForm;
