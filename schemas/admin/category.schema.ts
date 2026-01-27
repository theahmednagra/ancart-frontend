import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.instanceof(File, { message: "Image is required" }),
  isActive: z.coerce.boolean().optional().default(true),
});

export type CategoryInput = z.infer<typeof categorySchema>;