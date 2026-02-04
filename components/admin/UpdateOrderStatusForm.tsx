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
    CONFIRMED: ["SHIPPED"],
    SHIPPED: ["DELIVERED"],
    DELIVERED: [],
} as const;

const statusSchema = z.object({
    status: z.enum(["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED"]),
});

type OrderStatus = z.infer<typeof statusSchema>["status"];

interface Props {
    orderId: string;
    currentStatus: OrderStatus;
    onUpdate: (newStatus: OrderStatus) => void;
}

export default function UpdateOrderStatusForm({
    orderId,
    currentStatus,
    onUpdate,
}: Props) {
    const allowedNextStatuses = STATUS_FLOW[currentStatus];
    const nextStatus = allowedNextStatuses[0];

    const [confirmOpen, setConfirmOpen] = useState(false);

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<{ status: OrderStatus }>({
        resolver: zodResolver(statusSchema),
        defaultValues: { status: nextStatus },
    });

    const handleConfirmUpdate = async () => {
        if (!nextStatus) return;

        try {
            await api.patch(`/admin/orders/update-order-status/${orderId}`, {
                status: nextStatus,
            });

            toast.success(
                `Order status updated from ${currentStatus} to ${nextStatus}`
            );

            onUpdate(nextStatus);
        } catch (err: any) {
            toast.error(
                err?.response?.data?.message || "Failed to update order status"
            );
        } finally {
            setConfirmOpen(false);
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(() => setConfirmOpen(true))}
                className="border border-zinc-700 rounded-xl p-5 bg-zinc-800 space-y-4"
            >
                <h2 className="font-semibold text-white">Order Status</h2>

                {/* Current status */}
                <div className="text-sm text-zinc-400">
                    Current status:
                    <span className="ml-2 font-medium text-white">
                        {currentStatus}
                    </span>
                </div>

                {/* Action */}
                {allowedNextStatuses.length === 0 ? (
                    <div className="text-sm text-zinc-500">
                        This order can no longer be updated.
                    </div>
                ) : (
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-white text-black py-2.5 text-sm font-medium hover:bg-gray-200 transition disabled:opacity-60"
                    >
                        {isSubmitting
                            ? "Updating..."
                            : `Mark as ${nextStatus}`}
                    </button>
                )}
            </form>

            {/* Confirmation modal */}
            <ConfirmationModal
                open={confirmOpen}
                mode="dark"
                variant="primary"
                title="Confirm Status Update"
                description={`Are you sure you want to update the order status from "${currentStatus}" to "${nextStatus}"?`}
                confirmText="Update Status"
                loading={isSubmitting}
                onConfirm={handleConfirmUpdate}
                onClose={() => setConfirmOpen(false)}
            />
        </>
    );
}
