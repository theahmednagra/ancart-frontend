"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

/**
 * Hook to redirect users away from admin pages if they are not admins
 */
const useAdminRedirect = () => {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.auth.userData);

    useEffect(() => {
        if (!user || user.role !== "ADMIN") {
            router.replace("/");
        }
    }, [user, router]);
};

export default useAdminRedirect;
