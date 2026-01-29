import { z } from "zod";

export const updateCategorySchema = z
    .object({
        name: z.string().min(1).optional(),
        image: z.instanceof(File).optional(),
        isActive: z
            .enum(["true", "false"])
            .transform((val) => val === "true")
            .optional(),
    })
    .refine(
        (data) => Object.keys(data).length > 0,
        { message: "At least one field must be updated" }
    );

export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
