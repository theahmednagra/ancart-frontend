"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { SignupInput, signupSchema } from "@/schemas/auth/signup.schema";
import api from "@/services/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useAuthPageRedirect from "@/utils/useAuthPageRedirect";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";

const SignupPage = () => {
    useAuthPageRedirect(); // Redirect logged-in users away from auth pages

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupInput>({
        resolver: zodResolver(signupSchema),
    });

    const onFormSubmit = async (data: SignupInput) => {
        try {
            setIsLoading(true);
            await api.post("/auth/signup", data);
            toast.success("Account created 🎉");

            const encodedEmail = encodeURIComponent(data.email)
            router.push(`/auth/verification/${encodedEmail}`)
        } catch (err: any) {
            toast.error(err?.message || "Signup failed");
        } finally {
            setIsLoading(false);
        }
    };

    const handleClick = () => {
        router.push("/auth/signin");
    }

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
                        Create account
                    </h2>
                    <p className="text-sm text-neutral-500 mb-6">
                        Join us and start shopping smarter
                    </p>

                    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Full name"
                                {...register("fullname")}
                                className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            {errors.fullname && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.fullname.message}
                                </p>
                            )}
                        </div>

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

                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                {...register("password")}
                                className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            {errors.password && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <button
                            disabled={isLoading}
                            className="w-full rounded-lg bg-black py-3 text-sm font-medium text-white hover:opacity-90 transition disabled:opacity-50"
                        >
                            {isLoading ? "Creating account..." : "Sign up"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-neutral-500">
                            Already have an account?
                        </p>

                        <button
                            onClick={handleClick}
                            className="mt-2 text-sm font-medium text-black hover:underline disabled:text-neutral-400 disabled:no-underline"
                        >
                            Sign In
                        </button>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </>
    );
};

export default SignupPage;
