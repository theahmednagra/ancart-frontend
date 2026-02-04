"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";

const AboutPage = () => {
    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <section className="relative bg-[#02483D] text-white py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex-1 space-y-6 text-center lg:text-left"
                    >
                        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                            Discover <span className="text-[#A1FFCE]">Who We Are</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-white/80 max-w-md mx-auto lg:mx-0">
                            We are committed to delivering high-quality products with unmatched
                            service. Our goal is to create a shopping experience that’s
                            seamless, trustworthy, and inspiring.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex-1 relative w-full h-72 sm:h-96 lg:h-80"
                    >
                        <Image
                            src="/images/about-hero.jpg"
                            alt="About us"
                            fill
                            className="object-cover rounded-3xl shadow-2xl"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Our Story & Mission */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="grid lg:grid-cols-2 gap-12 items-center"
                    >
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-gray-900">
                                Our Story
                            </h2>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                From humble beginnings, we envisioned a platform where
                                quality meets convenience. Over the years, our dedication
                                to excellence and transparency has earned the trust of
                                thousands of customers worldwide.
                            </p>
                        </div>
                        <div className="relative w-full h-64 sm:h-80 lg:h-64">
                            <Image
                                src="/images/story.jpg"
                                alt="Our Story"
                                fill
                                className="object-cover rounded-2xl shadow-lg"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="grid lg:grid-cols-2 gap-12 items-center"
                    >
                        <div className="relative w-full h-64 sm:h-80 lg:h-64 order-last lg:order-first">
                            <Image
                                src="/images/mission.jpg"
                                alt="Our Mission"
                                fill
                                className="object-cover rounded-2xl shadow-lg"
                            />
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                To provide a seamless shopping experience, combining
                                premium products with reliable service. We strive to
                                innovate constantly while keeping our customers at the
                                heart of everything we do.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl sm:text-4xl font-bold text-gray-900"
                    >
                        Our Core Values
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-gray-600 text-lg max-w-3xl mx-auto"
                    >
                        Our guiding principles shape everything we do, ensuring every
                        product and service exceeds expectations while maintaining
                        integrity and innovation.
                    </motion.p>

                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                        {[
                            { title: "Quality", desc: "We deliver only the best products." },
                            { title: "Trust", desc: "Transparency and reliability in every step." },
                            { title: "Innovation", desc: "Constantly improving for our customers." },
                            { title: "Customer First", desc: "Their happiness drives our mission." },
                        ].map((val) => (
                            <motion.div
                                key={val.title}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-gray-50 p-6 rounded-2xl shadow cursor-default"
                            >
                                <h3 className="font-semibold text-xl text-gray-900 mb-2">{val.title}</h3>
                                <p className="text-gray-600 text-sm">{val.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team / Approach */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl sm:text-4xl font-bold text-gray-900"
                    >
                        Our Approach
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-gray-600 text-lg max-w-3xl mx-auto"
                    >
                        Every decision we make revolves around our customers and the
                        integrity of our products. From sourcing to delivery, we ensure
                        quality, sustainability, and satisfaction in every step.
                    </motion.p>
                    {/* <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12"> */}
                    <div className="flex justify-center mt-12">
                        {[
                            { img: "/images/profile-photo.jpg", name: "Muhammad Ahmed", role: "Developer" },
                        ].map((member) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white rounded-2xl w-full max-w-60 shadow hover:shadow-lg transition overflow-hidden"
                            >
                                <div className="relative w-full h-56">
                                    <Image
                                        src={member.img}
                                        alt={member.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-4 text-center">
                                    <h3 className="text-gray-900 font-semibold">{member.name}</h3>
                                    <p className="text-gray-600 text-sm">{member.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default AboutPage;
