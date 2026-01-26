"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '@/services/api';
import { toast } from 'sonner';
import { SigninInput, signinSchema } from '@/schemas/auth/signin.schema';

const SigninPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState } = useForm<SigninInput>({
        resolver: zodResolver(signinSchema)
    })
    const { errors } = formState;

    const onFormSubmit = async (data: SigninInput) => {
        try {
            setIsLoading(true);

            const res = await api.post(
                "/auth/signin",
                data,
                { withCredentials: true }
            );

            toast.success("Signin successful");

            console.log(res.data.user);

        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Signin failed");

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
                    type="password"
                    placeholder='Password'
                    {...register("password")}
                />
                {errors.password && <p>{errors.password.message}</p>}

                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Loading..." : "Signin"}
                </button>
            </form>
        </div>
    )
}

export default SigninPage;