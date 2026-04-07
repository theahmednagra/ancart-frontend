"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderDataInput, orderDataSchema } from "@/schemas/user/order.schema";

const OrderForm = ({ onSubmit, isSubmitting }: { onSubmit: (data: OrderDataInput) => void; isSubmitting?: boolean }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<OrderDataInput>({
    resolver: zodResolver(orderDataSchema),
    defaultValues: {
      paymentMethod: "COD" // Set a default to prevent empty selection
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Existing Address Fields */}
      <div className="space-y-4">
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
          <input {...register("city")} placeholder="City / Address Line 2" className="w-full border rounded-lg px-4 py-3 outline-none focus:ring focus:ring-gray-300" />
          {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city.message}</p>}
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="pt-4 border-t">
        <h3 className="text-lg font-semibold mb-3">Payment Method</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex items-center justify-between px-4 py-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition has-checked:border-[#02483D] has:checked:bg-[#02483d05]">
            <span className="font-medium">Cash on Delivery</span>
            <input type="radio" value="COD" {...register("paymentMethod")} className="w-4 h-4 accent-[#02483D]" />
          </label>

          <label className="flex items-center justify-between px-4 py-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition has-checked:border-[#02483D] has-checked:bg-[#02483d05]">
            <span className="font-medium">Pay Now (Card)</span>
            <input type="radio" value="CARD" {...register("paymentMethod")} className="w-4 h-4 accent-[#02483D]" />
          </label>
        </div>
        {errors.paymentMethod && <p className="text-sm text-red-500 mt-2">{errors.paymentMethod.message}</p>}
      </div>

      <button disabled={isSubmitting} type="submit" className="w-full py-3 bg-[#02483D] text-white rounded-lg font-medium tracking-wide disabled:opacity-60 transition">
        {isSubmitting ? "Processing..." : "Place Order"}
      </button>
    </form>
  );
};

export default OrderForm;
