import { z } from "zod";

export const deliveryAddressSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  phone: z.string().min(7, "Phone number is required"),
  addressLine: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
});

export type DeliveryAddressInput = z.infer<typeof deliveryAddressSchema>;
