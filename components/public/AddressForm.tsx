"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DeliveryAddressInput, deliveryAddressSchema } from "@/schemas/user/address.schema";

const AddressForm = ({ onSubmit, isSubmitting }: { onSubmit: (data: DeliveryAddressInput) => void; isSubmitting?: boolean }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<DeliveryAddressInput>({
    resolver: zodResolver(deliveryAddressSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <input {...register("fullName")} placeholder="Full Name" className="w-full border rounded-lg px-4 py-3 outline-none focus:ring focus:ring-gray-300" />
        {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>}
      </div>

      <div>
        <input {...register("phone")} placeholder="Phone Number" className="w-full border rounded-lg px-4 py-3 outline-none focus:ring focus:ring-gray-300" />
        {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>}
      </div>

      <div>
        <input {...register("addressLine")} placeholder="Address Line 1" className="w-full border rounded-lg px-4 py-3 outline-none focus:ring focus:ring-gray-300" />
        {errors.addressLine && <p className="text-sm text-red-500 mt-1">{errors.addressLine.message}</p>}
      </div>

      <div>
        <input {...register("city")} placeholder="Address Line 2" className="w-full border rounded-lg px-4 py-3 outline-none focus:ring focus:ring-gray-300" />
        {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city.message}</p>}
      </div>

      <button disabled={isSubmitting} type="submit" className="w-full py-3 bg-[#02483D] text-white rounded-lg font-medium disabled:opacity-60 transition">
        {isSubmitting ? "Placing Order..." : "Confirm Order"}
      </button>
    </form>
  );
};

export default AddressForm;
