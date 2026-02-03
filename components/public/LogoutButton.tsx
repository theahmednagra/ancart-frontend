"use client";

import { useState } from "react";
import { toast } from "sonner";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import ConfirmationModal from "./ConfirmationModal";
import { useDispatch } from "react-redux";
import { removeUser } from "@/store/AuthSlice";

const LogoutButton = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    const handleLogout = async () => {
        setLoggingOut(true);
        try {
            await api.get("/auth/signout");
            dispatch(removeUser()); // Remove user data from redux
            toast.success("Logged out successfully");
            setShowLogoutModal(false);
            router.push("/"); // redirect to home
        } catch {
            toast.error("Failed to logout");
        } finally {
            setLoggingOut(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setShowLogoutModal(true)}
                className="px-6 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition"
            >
                Logout
            </button>

            <ConfirmationModal
                open={showLogoutModal}
                title="Logout"
                description="Are you sure you want to logout?"
                confirmText="Yes, Logout"
                loading={loggingOut}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={handleLogout}
            />
        </>
    );
};

export default LogoutButton;
