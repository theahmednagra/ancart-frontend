"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { useRouter } from "next/navigation";

const faqs = [
    {
        question: "How do I place an order?",
        answer:
            "You can place an order by browsing products, adding them to your cart, and completing checkout. Once payment is confirmed, your order will be processed immediately.",
    },
    {
        question: "What payment methods do you accept?",
        answer:
            "We accept debit and credit cards, mobile wallets, and other locally supported digital payment methods. All payments are processed securely.",
    },
    {
        question: "How long does delivery take?",
        answer:
            "Delivery typically takes 2–5 business days depending on your location and product availability. You’ll receive tracking details once your order is shipped.",
    },
    {
        question: "Can I cancel or modify my order?",
        answer:
            "Orders can be cancelled or modified before they are shipped. Once shipped, changes are no longer possible. Please contact support as soon as possible.",
    },
    {
        question: "What if I receive a damaged or wrong product?",
        answer:
            "If your order arrives damaged or incorrect, contact our support team within 48 hours. We’ll arrange a replacement or refund after verification.",
    },
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const router = useRouter();

    return (
        <>
            <Navbar />

            <section className="relative bg-linear-to-b from-gray-50 to-white py-24">
                <div className="max-w-4xl mx-auto px-4">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
                            Frequently Asked Questions
                        </h1>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            Clear answers to common questions about orders, payments, delivery,
                            and support.
                        </p>
                    </motion.div>

                    {/* FAQ List */}
                    <div className="space-y-5">
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index;

                            return (
                                <div
                                    key={index}
                                    className="rounded-2xl border border-gray-200 bg-white shadow-sm"
                                >
                                    {/* Question */}
                                    <button
                                        onClick={() =>
                                            setOpenIndex(isOpen ? null : index)
                                        }
                                        className="w-full flex items-center justify-between px-6 py-5 text-left transition hover:bg-gray-50"
                                    >
                                        <span className="text-base sm:text-lg font-medium text-gray-900">
                                            {faq.question}
                                        </span>

                                        <motion.span
                                            animate={{ rotate: isOpen ? 45 : 0 }}
                                            transition={{ duration: 0.25, ease: "easeInOut" }}
                                            className="shrink-0 text-gray-500"
                                        >
                                            <Plus className="w-5 h-5" />
                                        </motion.span>
                                    </button>

                                    {/* Answer */}
                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                key="answer"
                                                initial={{ opacity: 0, y: -8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -8 }}
                                                transition={{ duration: 0.25, ease: "easeOut" }}
                                                className="px-6 pb-6 text-sm sm:text-base text-gray-600 leading-relaxed"
                                            >
                                                {faq.answer}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>

                    {/* Bottom Support CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mt-20 text-center"
                    >
                        <p className="text-gray-600 text-lg">
                            Still have questions?
                        </p>
                        <p className="text-gray-900 font-medium mt-1">
                            Our support team is always happy to help.
                            <span onClick={() => router.push("/user/contact")} className="underline mx-1 cursor-pointer">Contact Us</span>
                        </p>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </>
    );
}
