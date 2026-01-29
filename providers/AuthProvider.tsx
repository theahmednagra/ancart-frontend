"use client";

import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import api from "@/services/api";
import { setUser, removeUser, setAuthLoading } from "@/store/AuthSlice";
import store, { RootState } from "../store/store";
import Loader from "@/components/Loader";

// Internal component that handles auth logic
const AuthLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const dispatch = useDispatch();
    const { authLoading } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                dispatch(setAuthLoading(true));

                const res = await api.get("/auth/me", {
                    withCredentials: true,
                });

                dispatch(
                    setUser({
                        userData: res.data.user,
                    })
                );

            } catch (error) {
                dispatch(removeUser());
            } finally {
                dispatch(setAuthLoading(false));
            }
        };

        checkAuth();
    }, [dispatch]);

    if (authLoading) {
        return (
            <Loader />
        );
    }

    return <>{children}</>;
};

// Exported provider that wraps Redux and Auth
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Provider store={store}>
            <AuthLoader>{children}</AuthLoader>
        </Provider>
    );
};

export default AuthProvider;
