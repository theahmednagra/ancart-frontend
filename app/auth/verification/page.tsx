"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '@/services/api';
import { toast } from 'sonner';
import { VerificationInput, verificationSchema } from '@/schemas/auth/verification.schema';

const VerificationPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState } = useForm<VerificationInput>({
        resolver: zodResolver(verificationSchema)
    })
    const { errors } = formState;

    const onFormSubmit = async (data: VerificationInput) => {
        try {
            setIsLoading(true);

            const res = await api.post(
                "/auth/verification",
                data,
            );

            toast.success("Verification successful");
            return res.data;

        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Verification failed");

        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <h2>Signup To Continue</h2>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <input
                    type="email"
                    placeholder='Email'
                    {...register("email")}
                />
                {errors.email && <p>{errors.email.message}</p>}

                <input
                    type="text"
                    placeholder='000000'
                    {...register("verificationCode")}
                />
                {errors.verificationCode && <p>{errors.verificationCode.message}</p>}

                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Loading..." : "Verify"}
                </button>
            </form>
        </div>
    )
}

export default VerificationPage;