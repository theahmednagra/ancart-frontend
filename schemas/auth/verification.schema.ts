import { z } from "zod";

export const verificationSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6, "Verify code must contain 6 characters"),
});

export type VerificationInput = z.infer<typeof verificationSchema>;
