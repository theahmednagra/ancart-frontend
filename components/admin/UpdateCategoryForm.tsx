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
            className="max-w-lg mx-auto bg-white border border-neutral-200 rounded-2xl shadow-sm p-8"
        >
            <h2 className="text-2xl font-semibold text-neutral-900 mb-1">Update category</h2>
            <p className="text-sm text-neutral-500 mb-6">Update the category details here</p>

            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                {/* Name */}
                <div>
                    <input
                        type="text"
                        placeholder="Category name"
                        {...register("name")}
                        className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:ring-2 focus:ring-black focus:outline-none"
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                </div>

                {/* Image */}
                <div>
                    <label className="text-sm font-medium text-neutral-700 flex items-center gap-2 mb-2">
                        Image <Upload size={16} />
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImage}
                        className="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-neutral-100 file:px-4 file:py-2 file:text-sm file:font-medium hover:file:bg-neutral-200"
                    />
                    {(preview || category?.imageUrl) && (
                        <div className="mt-3 w-32 h-32 rounded-lg overflow-hidden border border-neutral-200">
                            <img src={preview || category.imageUrl} className="w-full h-full object-cover" />
                        </div>
                    )}
                    {errors.image && <p className="mt-1 text-xs text-red-500">{errors.image.message}</p>}
                </div>

                {/* Status */}
                <div>
                    <select
                        {...register("isActive")}
                        className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:ring-2 focus:ring-black focus:outline-none"
                    >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                    {errors.isActive && <p className="mt-1 text-xs text-red-500">{errors.isActive.message}</p>}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-lg bg-black py-3 text-sm font-medium text-white hover:opacity-90 transition disabled:opacity-50"
                >
                    {isLoading ? "Saving..." : "Save category"}
                </button>
            </form>
        </motion.div>
    );
};

export default UpdateCategoryForm;
