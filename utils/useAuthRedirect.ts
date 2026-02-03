"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

/**
 * Hook to redirect unauthenticated users to signin page
 */
const useAuthRedirect = (redirectPath = "/auth/signin") => {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.auth.userData);

    useEffect(() => {
        if (!user) {
            router.replace(redirectPath);
        }
    }, [user, router, redirectPath]);
};

export default useAuthRedirect;
