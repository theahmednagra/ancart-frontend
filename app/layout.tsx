import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/providers/AuthProvider";

export const metadata: Metadata = {
    title: "Ancart – Smart & Seamless Shopping",
    description: "A modern e-commerce platform that makes shopping seamless and intuitive.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Encode+Sans:wght@100..900&family=Red+Hat+Text:ital,wght@0,300..700;1,300..700&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet" />
            </head>
            <body>
                <AuthProvider>
                    <main style={{ fontFamily: "Encode Sans, sans-serif", }}>
                        {children}
                    </main>
                </AuthProvider>
                <Toaster />
            </body>
        </html>
    );
}




















// import { Geist, Geist_Mono } from "next/font/google";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });
// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
{/* <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}> */ }