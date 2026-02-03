"use client";

import { Loader2 } from "lucide-react";

const Loader = () => {
    return (
        <div className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-white/90 backdrop-blur-sm
        ">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-10 h-10 text-gray-800 animate-spin" />
                <p className="text-sm text-gray-600 tracking-wide">
                    Loading...
                </p>
            </div>
        </div>
    );
};

export default Loader;
