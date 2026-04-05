"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import api from "@/services/api";
import ConfirmationModal from "@/components/admin/ConfirmCancellationModal";
import { useState } from "react";
import { RefreshCw } from "lucide-react"; // Optional: adding icons for style

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
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<CancelFormValues>({
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
            <div className="border border-zinc-700 rounded-xl p-6 bg-zinc-800 shadow-sm">
                <div className="flex items-center justify-between border-b border-zinc-700/50 pb-4 mb-5">
                    <h2 className="text-xs font-black text-zinc-500 uppercase tracking-widest">Danger Zone</h2>
                </div>
                <p className="text-zinc-400 text-xs mb-5 leading-relaxed italic">
                    Cancelling an order is permanent. Ensure you provide a valid reason for the customer.
                </p>
                <button
                    onClick={() => setShowModal(true)}
                    className="w-full px-4 py-3 bg-red-600 text-white rounded-lg font-semibold tracking-wide text-xs uppercase hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-red-900/20"
                >
                    Cancel Order
                </button>
            </div>

            <ConfirmationModal
                open={showModal}
                title="Confirm Cancellation"
                description={
                    <form id="cancel-form" onSubmit={handleSubmit(submitHandler)} className="space-y-5 mt-4 text-left">
                        <div>
                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">
                                Reason for Cancellation
                            </label>
                            <textarea
                                {...register("reason")}
                                rows={3}
                                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-sm text-zinc-200 outline-none focus:border-red-500/50 transition-colors placeholder:text-zinc-600"
                                placeholder="e.g., Out of stock, Customer request..."
                                disabled={isSubmitting}
                            />
                            {errors.reason && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase tracking-tight">{errors.reason.message}</p>}
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-zinc-900/50 border border-zinc-700 rounded-lg group">
                            <input
                                type="checkbox"
                                id="restoreStock"
                                {...register("restoreStock")}
                                disabled={isSubmitting}
                                className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-red-600 focus:ring-red-500/20"
                            />
                            <label htmlFor="restoreStock" className="text-xs text-zinc-400 cursor-pointer select-none group-hover:text-zinc-200 transition-colors">
                                Automatically restore product stock levels
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg font-semibold tracking-wide text-xs uppercase hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-red-900/20"
                        >
                            {isSubmitting ? (
                                <RefreshCw className="animate-spin" size={14} />
                            ) : null}
                            {isSubmitting ? "Processing..." : "Confirm Cancellation"}
                        </button>
                    </form>
                }
                confirmText="" 
                onClose={() => {
                    setShowModal(false);
                    reset();
                }}
            />
        </>
    );
}
