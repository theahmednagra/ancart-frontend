"use client";
import { CategoryInput, categorySchema } from '@/schemas/admin/category.schema';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import api from '@/services/api';
import { toast } from 'sonner';

const CategoryForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const { register, handleSubmit, formState, setValue } = useForm<CategoryInput>({
        resolver: zodResolver(categorySchema),
    })
    const { errors } = formState;

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue("image", file, { shouldValidate: true });
            setPreview(URL.createObjectURL(file));
        }
    }

    const onFormSubmit = async (data: CategoryInput) => {
        try {
            setIsLoading(true);

            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("image", data.image);

            const res = await api.post(
                "/admin/categories/add-new-category",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success("Category added");
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
            <h2>Add New Category</h2>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <input
                    type="text"
                    placeholder='Category Name'
                    {...register("name")}
                    className=''
                />
                {errors.name && <p>{errors.name.message}</p>}

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

                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Add Category"}
                </button>
            </form>
        </div>
    )
}

export default CategoryForm;