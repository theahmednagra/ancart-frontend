"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";

export default function TermsAndConditionsPage() {
    return (
        <>
            <Navbar />

            <section className="bg-linear-to-b from-gray-50 to-white py-24">
                <div className="max-w-4xl mx-auto px-4">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-16 text-center"
                    >
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
                            Terms & Conditions
                        </h1>
                        <p className="mt-4 text-lg text-gray-600">
                            Please read these terms carefully before using our services.
                        </p>
                    </motion.div>

                    {/* Content */}
                    <div className="space-y-14 text-gray-700 leading-relaxed text-base sm:text-lg">
                        {/* Intro */}
                        <div>
                            <p>
                                These Terms & Conditions govern your access to and use of our
                                website, services, and products. By accessing or using our
                                platform, you agree to be bound by these terms. If you do not
                                agree with any part of the terms, please discontinue use of our
                                services.
                            </p>
                        </div>

                        {/* Use of Service */}
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                Use of Our Services
                            </h2>
                            <p>
                                You agree to use our platform only for lawful purposes and in
                                accordance with these terms. You must not misuse the services or
                                interfere with their normal operation, security, or
                                accessibility.
                            </p>
                        </div>

                        {/* Account Responsibility */}
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                Account Responsibility
                            </h2>
                            <p>
                                When creating an account, you are responsible for maintaining
                                the confidentiality of your login credentials and all activities
                                that occur under your account. You must notify us immediately of
                                any unauthorized access or security breach.
                            </p>
                        </div>

                        {/* Orders & Payments */}
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                Orders & Payments
                            </h2>
                            <p>
                                All orders placed through our platform are subject to acceptance
                                and availability. Prices, product descriptions, and availability
                                may change without notice. Payments must be completed using
                                approved payment methods before an order is processed.
                            </p>
                        </div>

                        {/* Shipping & Delivery */}
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                Shipping & Delivery
                            </h2>
                            <p>
                                Delivery timelines are estimates and may vary due to external
                                factors. We are not responsible for delays caused by courier
                                services, weather conditions, or events beyond our control.
                            </p>
                        </div>

                        {/* Returns & Refunds */}
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                Returns & Refunds
                            </h2>
                            <p>
                                Returns and refunds are handled according to our return policy.
                                Products must meet eligibility requirements to qualify for a
                                refund or replacement. Please review our return policy for
                                detailed information.
                            </p>
                        </div>

                        {/* Intellectual Property */}
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                Intellectual Property
                            </h2>
                            <p>
                                All content, trademarks, logos, and materials available on our
                                platform are owned by us or licensed to us. You may not copy,
                                reproduce, or distribute any content without prior written
                                permission.
                            </p>
                        </div>

                        {/* Limitation of Liability */}
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                Limitation of Liability
                            </h2>
                            <p>
                                To the fullest extent permitted by law, we shall not be liable
                                for any indirect, incidental, or consequential damages arising
                                from your use of our services or inability to access the
                                platform.
                            </p>
                        </div>

                        {/* Changes to Terms */}
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                Changes to These Terms
                            </h2>
                            <p>
                                We may update these Terms & Conditions from time to time. Any
                                changes will be effective immediately upon posting. Continued
                                use of the platform after changes constitutes acceptance of the
                                updated terms.
                            </p>
                        </div>

                        {/* Contact */}
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                Contact Us
                            </h2>
                            <p>
                                If you have any questions or concerns regarding these Terms &
                                Conditions, please contact our support team through the Contact
                                page. We’re always here to help.
                            </p>
                        </div>
                    </div>

                    {/* Footer note */}
                    <div className="mt-20 text-center text-sm text-gray-500">
                        Last updated: January 2026
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
