"use client";

import { CategoryInput, categorySchema } from "@/schemas/admin/category.schema";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/services/api";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { motion } from "framer-motion";

const CategoryForm = ({ onCategoryAdded }: { onCategoryAdded: any }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<CategoryInput>({
        resolver: zodResolver(categorySchema),
    });

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue("image", file, { shouldValidate: true });
            setPreview(URL.createObjectURL(file));
        }
    };

    const onFormSubmit = async (data: CategoryInput) => {
        try {
            setIsLoading(true);

            const formData = new FormData();

            formData.append("name", data.name);
            formData.append("image", data.image);

            const res = await api.post(
                "/admin/categories/create-category",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            toast.success("Category added successfully");
            setPreview(null);
            onCategoryAdded?.(res.data.category);
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
            className="max-w-xl mx-auto mt-8 bg-zinc-900/80 border border-white/10 rounded-2xl shadow-xl p-8"
        >
            <h2 className="text-2xl font-semibold text-white mb-1">
                Add category
            </h2>
            <p className="text-sm text-white/60 mb-6">
                Create a new category to organize products in the catalog
            </p>

            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                {/* Name */}
                <div>
                    <input
                        type="text"
                        placeholder="Category name"
                        {...register("name")}
                        className="w-full rounded-lg border border-white/10 bg-zinc-800 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                    {errors.name && (
                        <p className="mt-1 text-xs text-red-400">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                {/* Image */}
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

                    {errors.image && (
                        <p className="mt-1 text-xs text-red-400">
                            {errors.image.message}
                        </p>
                    )}
                </div>

                {/* Submit */}
                <button
                    disabled={isLoading}
                    className="w-full rounded-lg bg-white text-black py-3 text-sm font-medium hover:bg-white/90 transition disabled:opacity-50"
                >
                    {isLoading ? "Saving..." : "Add category"}
                </button>
            </form>
        </motion.div>

    );
};

export default CategoryForm;
