"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupInput, signupSchema } from '@/schemas/auth/signup.schema';
import api from '@/services/api';
import { toast } from 'sonner';

const SignupPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState } = useForm<SignupInput>({
        resolver: zodResolver(signupSchema)
    })
    const { errors } = formState;

    const onFormSubmit = async (data: SignupInput) => {
        try {
            setIsLoading(true);

            const res = await api.post(
                "/auth/signup",
                data,
            );

            toast.success("Signup successful");
            return res.data;

        } catch (err) {
            console.error(err);
            toast.error(err instanceof Error ? err.message : "Signup failed");

        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <h2>Signup To Continue</h2>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <input
                    type="text"
                    placeholder='Full Name'
                    {...register("fullname")}
                />
                {errors.fullname && <p>{errors.fullname.message}</p>}

                <input
                    type="email"
                    placeholder='Email'
                    {...register("email")}
                />
                {errors.email && <p>{errors.email.message}</p>}

                <input
                    type="password"
                    placeholder='Password'
                    {...register("password")}
                />
                {errors.password && <p>{errors.password.message}</p>}

                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Loading..." : "Signup"}
                </button>
            </form>
        </div>
    )
}

export default SignupPage;