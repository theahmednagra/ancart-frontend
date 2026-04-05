"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import api from "@/services/api";
import { useState } from "react";
import ConfirmationModal from "../public/ConfirmationModal";

const STATUS_FLOW = {
    PENDING: ["CONFIRMED"],
    PAID: ["CONFIRMED"],
    CONFIRMED: ["SHIPPED"],
    SHIPPED: ["DELIVERED"],
    DELIVERED: [],
    CANCELLED: [],
} as const;

const statusSchema = z.object({
    status: z.enum(["PENDING", "PAID", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"]),
});

type OrderStatus = z.infer<typeof statusSchema>["status"];

interface Props {
    orderId: string;
    currentStatus: OrderStatus;
    paymentMethod: "COD" | "CARD";
    onUpdate: (newStatus: OrderStatus) => void;
}

export default function UpdateOrderStatusForm({ orderId, currentStatus, paymentMethod, onUpdate }: Props) {
    const [confirmOpen, setConfirmOpen] = useState(false);

    // Identify the linear next step
    const allowedNextStatuses = STATUS_FLOW[currentStatus] || [];
    const nextStatus = allowedNextStatuses[0];

    // Business Logic: Card orders must be "PAID" (via webhook) before Admin can move to "CONFIRMED"
    const isPaymentRequired =
        currentStatus === "PENDING" &&
        nextStatus === "CONFIRMED" &&
        paymentMethod === "CARD";

    const { handleSubmit, formState: { isSubmitting } } = useForm<{ status: OrderStatus }>({
        resolver: zodResolver(statusSchema),
        defaultValues: { status: nextStatus },
    });

    const handleConfirmUpdate = async () => {
        if (!nextStatus || isPaymentRequired) return;

        try {
            await api.patch(`/admin/orders/update-order-status/${orderId}`, {
                status: nextStatus,
            });

            toast.success(`Status updated to ${nextStatus}`);
            onUpdate(nextStatus);
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Failed to update order status");
        } finally {
            setConfirmOpen(false);
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(() => setConfirmOpen(true))}
                className="border border-zinc-700 rounded-xl p-6 bg-zinc-800 shadow-lg space-y-5"
            >
                <div className="flex justify-between items-center border-b border-zinc-700/50 pb-4">
                    <h2 className="text-xs font-black text-zinc-500 uppercase tracking-widest">Order Progression</h2>
                    <span className={`text-[9px] px-2 py-0.5 rounded font-black uppercase tracking-tighter border ${
                        paymentMethod === 'COD' 
                        ? 'border-amber-500/30 text-amber-500 bg-amber-500/5' 
                        : 'border-blue-500/30 text-blue-400 bg-blue-500/5'
                    }`}>
                        {paymentMethod}
                    </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400 font-medium">Current State</span>
                    <span className="text-white font-bold px-2 py-1 bg-zinc-900 rounded border border-zinc-700">
                        {currentStatus}
                    </span>
                </div>

                {allowedNextStatuses.length === 0 ? (
                    <div className="py-2 text-center text-xs text-zinc-500 italic bg-zinc-900/50 rounded-lg border border-zinc-700/30">
                        No further transitions available.
                    </div>
                ) : isPaymentRequired ? (
                    <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-lg">
                        <p className="text-[11px] text-amber-500 text-center leading-relaxed font-medium">
                            Manual confirmation is disabled for <strong className="underline">CARD</strong> payments. 
                            The status will move to PAID automatically once the transaction clears.
                        </p>
                    </div>
                ) : (
                    <button
                        type="submit"
                        disabled={isSubmitting || !nextStatus}
                        className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-xs font-semibold uppercase tracking-wide transition-all shadow-md disabled:opacity-20 disabled:grayscale"
                    >
                        {isSubmitting ? "Processing..." : `Promote to ${nextStatus}`}
                    </button>
                )}
            </form>

            <ConfirmationModal
                open={confirmOpen}
                mode="dark"
                variant="primary"
                title="Status Change"
                description={`Are you sure you want to transition this order to "${nextStatus}"? This action is recorded in the audit log.`}
                confirmText={`Yes, Mark as ${nextStatus}`}
                loading={isSubmitting}
                onConfirm={handleConfirmUpdate}
                onClose={() => setConfirmOpen(false)}
            />
        </>
    );
}
