"use client";
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import api from '@/services/api';
import { toast } from 'sonner';
import { ProductInput, productSchema } from '@/schemas/admin/product.schema';

const ProductForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [categories, setCategories] = useState([])

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get("/admin/categories/get-all-categories");
                setCategories(res.data.categories);
            } catch (err) {
                toast.error(err instanceof Error ? err.message : "Failed to load categories");
            }
        };

        fetchCategories();
    }, []);

    const { register, handleSubmit, formState, setValue } = useForm({
        resolver: zodResolver(productSchema),
    })
    const { errors } = formState;

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue("image", file, { shouldValidate: true });
            setPreview(URL.createObjectURL(file));
        }
    }

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
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success("Product added");
            setPreview(null);
            return res.data;

        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Something went wrong");

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <input
                    type="text"
                    placeholder='Product Name'
                    {...register("name")}
                    className=''
                />
                {errors.name && <p>{errors.name.message}</p>}

                <input
                    type="number"
                    placeholder='Price'
                    {...register("price")}
                    className=''
                />
                {errors.price && <p>{errors.price?.message}</p>}

                <input
                    type="number"
                    placeholder='Stock'
                    {...register("stock")}
                    className=''
                />
                {errors.stock && <p>{errors.stock?.message}</p>}

                <input
                    type="file"
                    accept='image/*'
                    onChange={handleImage}
                    className=''
                />
                {errors.image && <p>{errors.image.message}</p>}

                {preview && (
                    <div className='w-32 h-32 mt-2'>
                        <img src={preview} alt="Preview" className='h-full w-full object-cover' />
                    </div>
                )}

                <select
                    {...register("categoryId")}
                    className=''
                >
                    <option value="">Select Category</option>
                    {categories.map((category: any) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                {errors.categoryId && <p>{errors.categoryId?.message}</p>}

                <textarea
                    {...register("description")}
                    placeholder='Description'
                    className=''
                />
                {errors.description && <p>{errors.description?.message}</p>}

                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Add Product"}
                </button>
            </form>
        </div>
    )
}

export default ProductForm;