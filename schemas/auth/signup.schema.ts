import { z } from "zod";

export const signupSchema = z.object({
    fullname: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type SignupInput = z.infer<typeof signupSchema>;