"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import api from "@/services/api";

const statusSchema = z.object({
    status: z.enum(["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED"]),
});

type StatusFormValues = z.infer<typeof statusSchema>;

interface Props {
    orderId: string;
    currentStatus: StatusFormValues["status"];
    onUpdate: (newStatus: StatusFormValues["status"]) => void;
}

export default function UpdateOrderStatusForm({ orderId, currentStatus, onUpdate }: Props) {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<StatusFormValues>({
        resolver: zodResolver(statusSchema),
        defaultValues: { status: currentStatus },
    });

    const onSubmit = async (data: StatusFormValues) => {
        try {
            await api.patch(`/admin/orders/update-order-status/${orderId}`, data);
            toast.success(`Order status updated to ${data.status}`);
            onUpdate(data.status);
            reset(data);
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Failed to update status");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 border border-zinc-700 rounded-xl p-5 bg-zinc-800">
            <h2 className="font-semibold text-white">Update Order Status</h2>

            <select
                {...register("status")}
                disabled={isSubmitting}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-2 text-gray-200 outline-none focus:border-emerald-500"
            >
                <option value="PENDING">PENDING</option>
                <option value="CONFIRMED">CONFIRMED</option>
                <option value="SHIPPED">SHIPPED</option>
                <option value="DELIVERED">DELIVERED</option>
            </select>

            {errors.status && (
                <p className="text-red-400 text-sm">{errors.status.message}</p>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition disabled:opacity-60"
            >
                {isSubmitting ? "Updating..." : "Update Status"}
            </button>
        </form>
    );
}
