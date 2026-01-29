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
            className="max-w-xl mx-auto mt-8 bg-white border border-neutral-200 rounded-2xl shadow-sm p-8"
        >
            <h2 className="text-2xl font-semibold text-neutral-900 mb-1">
                Add category
            </h2>
            <p className="text-sm text-neutral-500 mb-6">
                Categories help organize your products
            </p>

            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                {/* Name */}
                <div>
                    <input
                        type="text"
                        placeholder="Category name"
                        {...register("name")}
                        className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    {errors.name && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.name.message}
                        </p>
                    )}
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

                    {preview && (
                        <div className="mt-4 w-32 h-32 rounded-lg overflow-hidden border border-neutral-200">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {errors.image && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.image.message}
                        </p>
                    )}
                </div>

                {/* Submit */}
                <button
                    disabled={isLoading}
                    className="w-full rounded-lg bg-black py-3 text-sm font-medium text-white hover:opacity-90 transition disabled:opacity-50"
                >
                    {isLoading ? "Saving..." : "Add category"}
                </button>
            </form>
        </motion.div>
    );
};

export default CategoryForm;
