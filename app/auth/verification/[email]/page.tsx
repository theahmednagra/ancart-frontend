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
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { useParams, useRouter } from "next/navigation";

const RESEND_COOLDOWN = 60; // seconds

const VerificationPage = () => {
    // SAFE params handling
    const params = useParams();
    const email = params?.email ? decodeURIComponent(params.email as string) : "";
    
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [cooldown, setCooldown] = useState(0);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<VerificationInput>({
        resolver: zodResolver(verificationSchema),
        defaultValues: {
            email,
        },
    });

    // cooldown timer (correct)
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

            router.replace("/auth/signin");
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Verification failed");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendCode = async () => {
        if (!email) {
            toast.error("Invalid email address");
            return;
        }

        try {
            setIsResending(true);
            await api.post("/auth/resend-verification", { email });
            toast.success("Verification code sent 📩");
            setCooldown(RESEND_COOLDOWN);
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Failed to resend code");
        } finally {
            setIsResending(false);
        }
    };

    return (
        <>
            <Navbar />

            <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-linear-to-br from-neutral-50 to-neutral-100 px-4">
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
                        {/* Email (read-only, still submitted) */}
                        <div>
                            <input
                                readOnly
                                {...register("email")}
                                className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm bg-neutral-100 cursor-not-allowed focus:outline-none"
                            />
                            {errors.email && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Verification Code */}
                        <div>
                            <input
                                autoFocus
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={6}
                                placeholder="000000"
                                {...register("code")}
                                className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            {errors.code && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.code.message}
                                </p>
                            )}
                        </div>

                        {/* Verify Button */}
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

            <Footer />
        </>
    );
};

export default VerificationPage;
