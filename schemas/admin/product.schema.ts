import { z } from "zod";

export const productSchema = z.object({
    name: z.string().min(1, "Name is required"),
    price: z.coerce.number().min(1, "Price is required"),
    stock: z.coerce.number().min(1, "Stock is required"),
    description: z.string().min(1, "Description is required"),
    categoryId: z.string().min(1, "Category is required"),
    image: z.instanceof(File, { message: "Image is required" }),
    isActive: z.coerce.boolean().optional().default(true),
});

export type ProductInput = z.infer<typeof productSchema>;