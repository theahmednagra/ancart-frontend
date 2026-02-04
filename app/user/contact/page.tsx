"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import Image from "next/image";
import { sendEmailToAdmin } from "@/utils/emailClient";

// Form validation schema
const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(2, "Subject is required"),
    message: z.string().min(5, "Message must be at least 5 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormValues) => {
        try {
            await sendEmailToAdmin(data); // sends email
            toast.success("Your message has been sent successfully!");
            reset(); // clears the form
        } catch (err) {
            toast.error("Failed to send your message. Please try again.");
        }
    };

    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <section className="relative bg-[#02483D] text-white py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl sm:text-5xl font-extrabold leading-tight"
                    >
                        Get in <span className="text-[#A1FFCE]">Touch</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-lg sm:text-xl text-white/80 mt-4 max-w-2xl mx-auto"
                    >
                        Have questions or feedback? Reach out to us and our team
                        will respond promptly. We’re here to help you with
                        anything you need.
                    </motion.p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Form */}
                    <motion.form
                        onSubmit={handleSubmit(onSubmit)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white p-8 rounded-2xl shadow-lg space-y-6"
                    >
                        <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
                        <p className="text-gray-600 text-sm">
                            Fill out the form and we’ll get back to you as soon as possible.
                        </p>

                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                {...register("name")}
                                className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#02483D] outline-none"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                            <input
                                type="email"
                                placeholder="Your Email"
                                {...register("email")}
                                className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#02483D] outline-none"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                            <input
                                type="text"
                                placeholder="Subject"
                                {...register("subject")}
                                className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#02483D] outline-none"
                            />
                            {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message}</p>}

                            <textarea
                                placeholder="Message"
                                {...register("message")}
                                rows={5}
                                className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#02483D] outline-none resize-none"
                            ></textarea>
                            {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 bg-[#02483D] text-white font-semibold rounded-lg hover:bg-[#026644] transition disabled:opacity-50"
                        >
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </button>
                    </motion.form>

                    {/* Contact Info & Map */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 space-y-6">
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-900 tracking-tight">
                                    Our Office
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    We’re always happy to connect with you
                                </p>
                            </div>

                            <div className="space-y-3 text-sm text-gray-700">
                                <p className="leading-relaxed">
                                    Bahria Sky Mall & Residency<br />
                                    Lahore, Punjab, 54000
                                </p>

                                <div className="flex flex-col gap-1">
                                    <span className="text-gray-500">Email</span>
                                    <span className="font-medium text-gray-900">
                                        ahmednagra244@gmail.com
                                    </span>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <span className="text-gray-500">Phone</span>
                                    <span className="font-medium text-gray-900">
                                        +92 330 142 2279
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src="/images/bahria-sky.jpg"
                                alt="Our location"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default ContactPage;
