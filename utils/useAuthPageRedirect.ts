"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

/**
 * Redirect logged-in users away from auth pages
 * @param redirectPath Optional path to redirect (default: "/")
 */
const useAuthPageRedirect = (redirectPath = "/") => {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.auth.userData);

    useEffect(() => {
        if (user) {
            router.replace(redirectPath);
        }
    }, [user, router, redirectPath]);
};

export default useAuthPageRedirect;
