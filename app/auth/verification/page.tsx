"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import api from "@/services/api";
import { toast } from "sonner";
import {
    VerificationInput,
    verificationSchema,
} from "@/schemas/auth/verification.schema";

const RESEND_COOLDOWN = 60; // seconds

const VerificationPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [cooldown, setCooldown] = useState(0);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<VerificationInput>({
        resolver: zodResolver(verificationSchema),
    });

    const email = watch("email");

    // countdown timer
    useEffect(() => {
        if (cooldown <= 0) return;

        const interval = setInterval(() => {
            setCooldown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [cooldown]);

    const onFormSubmit = async (data: VerificationInput) => {
        try {
            setIsLoading(true);
            await api.post("/auth/verification", data);
            toast.success("Email verified ✅");
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Verification failed");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendCode = async () => {
        if (!email) {
            toast.error("Please enter your email first");
            return;
        }

        try {
            setIsResending(true);

            await api.post("/auth/resend-verification", { email });

            toast.success("Verification code sent 📩");
            setCooldown(RESEND_COOLDOWN);
        } catch (err: any) {
            toast.error(
                err?.response?.data?.message || "Failed to resend code"
            );
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-neutral-50 to-neutral-100 px-4">
            <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md rounded-2xl bg-white shadow-lg border border-neutral-200 p-8"
            >
                <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
                    Verify your email
                </h2>
                <p className="text-sm text-neutral-500 mb-6">
                    We’ve sent a 6-digit verification code to your email
                </p>

                <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
                    {/* Email */}
                    <div>
                        <input
                            type="email"
                            placeholder="Email address"
                            {...register("email")}
                            className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        {errors.email && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Code */}
                    <div>
                        <input
                            type="text"
                            placeholder="000000"
                            maxLength={6}
                            {...register("verificationCode")}
                            className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        {errors.verificationCode && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.verificationCode.message}
                            </p>
                        )}
                    </div>

                    {/* Verify button */}
                    <button
                        disabled={isLoading}
                        className="w-full rounded-lg bg-black py-3 text-sm font-medium text-white hover:opacity-90 transition disabled:opacity-50"
                    >
                        {isLoading ? "Verifying..." : "Verify email"}
                    </button>
                </form>

                {/* Resend Section */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-neutral-500">
                        Didn’t receive the code?
                    </p>

                    <button
                        onClick={handleResendCode}
                        disabled={cooldown > 0 || isResending}
                        className="mt-2 text-sm font-medium text-black hover:underline disabled:text-neutral-400 disabled:no-underline"
                    >
                        {isResending
                            ? "Sending..."
                            : cooldown > 0
                                ? `Resend in ${cooldown}s`
                                : "Resend verification code"}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default VerificationPage;
