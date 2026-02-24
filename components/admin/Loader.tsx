"use client";

import { Loader2 } from "lucide-react";
import Navbar from "./Navbar";

const Loader = () => {
    return (
        <>
            <Navbar />
            <div className="h-[calc(100vh-64px)] flex items-center justify-center bg-zinc-900/99">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-gray-200 animate-spin" />
                    <p className="text-sm text-gray-400 tracking-wide">
                        Loading...
                    </p>
                </div>
            </div>
        </>
    );
};

export default Loader;