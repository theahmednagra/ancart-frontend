"use client";

import { UpdateCategoryInput, updateCategorySchema } from "@/schemas/admin/updateCategory.schema";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/services/api";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { motion } from "framer-motion";

const UpdateCategoryForm = ({ categoryId, onUpdate }: { categoryId: string; onUpdate: any }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [category, setCategory] = useState<any>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm({
        resolver: zodResolver(updateCategorySchema),
    });

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    useEffect(() => {
        api
            .get(`/admin/categories/get-category-by-id/${categoryId}`)
            .then((res) => setCategory(res.data.category))
            .catch(() => toast.error("Failed to load category"));
    }, [categoryId]);

    useEffect(() => {
        if (!category) return;
        reset({
            name: category.name,
            isActive: category.isActive ? "true" : "false",
        });
    }, [category, reset]);

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue("image", file, { shouldValidate: true });
            setPreview(URL.createObjectURL(file));
        }
    };

    const onFormSubmit = async (data: UpdateCategoryInput) => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("name", data.name as string);
            if (data.image) formData.append("image", data.image as File);
            formData.append("isActive", String(data.isActive));

            const res = await api.patch(
                `/admin/categories/update-category/${categoryId}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            toast.success("Category updated successfully");
            setPreview(null);
            // After successful API call:
            onUpdate?.(res.data.category);
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
            className="max-w-xl mx-auto bg-zinc-900/80 border border-white/10 rounded-2xl shadow-xl p-8"
        >
            <h2 className="text-2xl font-semibold text-white mb-1">Update category</h2>
            <p className="text-sm text-white/60 mb-6">Update the category details here</p>

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
                        <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
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
                    {(preview || category?.imageUrl) && (
                        <div className="mt-3 w-32 h-32 rounded-lg overflow-hidden border border-white/10">
                            <img src={preview || category.imageUrl} className="w-full h-full object-cover" />
                        </div>
                    )}
                    {errors.image && (
                        <p className="mt-1 text-xs text-red-400">{errors.image.message}</p>
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
                    {isLoading ? "Saving..." : "Save category"}
                </button>
            </form>
        </motion.div>

    );
};

export default UpdateCategoryForm;
