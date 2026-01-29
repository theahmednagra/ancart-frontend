import { z } from "zod";

export const updateProductSchema = z
    .object({
        name: z.string().min(1).optional(),
        price: z.coerce.number().min(1).optional(),
        stock: z.coerce.number().min(1).optional(),
        description: z.string().min(1).optional(),
        categoryId: z.string().min(1).optional(),
        image: z.instanceof(File).optional(),
        isActive: z
            .enum(["true", "false"])
            .transform((val) => val === "true")
            .optional(),
    })
    .refine(
        (data) => Object.keys(data).length > 0,
        {
            message: "At least one field must be updated",
        }
    );

export type UpdateProductInput = z.infer<typeof updateProductSchema>;
