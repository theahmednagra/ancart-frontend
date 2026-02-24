"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

/**
 * Redirect logged-in users away from auth pages
 */

const useAuthPageRedirect = () => {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.auth.userData);
    const redirectPath = user?.role === "ADMIN" ? "/admin" : "/";

    useEffect(() => {
        if (user) {
            router.replace(redirectPath);
        }
    }, [user, router, redirectPath]);
};

export default useAuthPageRedirect;
