"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import api from "@/services/api";
import ConfirmationModal from "@/components/admin/ConfirmCancellationModal";
import { useState } from "react";

const cancelSchema = z.object({
    reason: z.string().min(5, "Reason must be at least 5 characters"),
    restoreStock: z.boolean().optional(),
});

type CancelFormValues = z.infer<typeof cancelSchema>;

interface Props {
    orderId: string;
    onCancel: (data: { reason: string; restoreStock?: boolean }) => void;
}

export default function AdminCancelOrderForm({ orderId, onCancel }: Props) {
    const [showModal, setShowModal] = useState(false);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CancelFormValues>({
        resolver: zodResolver(cancelSchema),
        defaultValues: { restoreStock: true },
    });

    const submitHandler = async (data: CancelFormValues) => {
        try {
            await api.patch(`/admin/orders/cancel-order/${orderId}`, data);
            toast.success("Order cancelled successfully");
            onCancel(data);
            setShowModal(false);
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Failed to cancel order");
        }
    };

    return (
        <>
            <div className="border border-zinc-700 rounded-xl p-5 bg-zinc-800">
                <h2 className="font-semibold text-white mb-4">Cancel Order</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2 w-full bg-red-500 text-white rounded-lg font-medium hover:opacity-90 transition"
                >
                    Cancel Order
                </button>
            </div>

            <ConfirmationModal
                open={showModal}
                title="Cancel Order"
                description={
                    <form onSubmit={handleSubmit(submitHandler)} className="space-y-3">
                        <div>
                            <textarea
                                {...register("reason")}
                                rows={3}
                                className="w-full border rounded-md p-2 outline-none"
                                placeholder="Enter cancellation reason"
                                disabled={isSubmitting}
                            />
                            {errors.reason && <p className="text-red-500 text-sm">{errors.reason.message}</p>}
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                {...register("restoreStock")}
                                disabled={isSubmitting}
                                className="w-4 h-4"
                            />
                            <span className="text-sm text-gray-500">Restore stock for this order</span>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:opacity-90 transition"
                        >
                            {isSubmitting ? "Cancelling..." : "Confirm Cancel"}
                        </button>
                    </form>
                }
                confirmText="" // we use the form button instead
                onClose={() => setShowModal(false)}
            />
        </>
    );
}
