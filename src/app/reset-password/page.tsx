"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ResetPassView from "@/app/reset-password/resetPass.view";
import { useResetPasswordMutation } from "@/state/api/authApi";

const ResetPassword: React.FC = () => {
    const searchParams = useSearchParams();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [token, setToken] = useState<string>("");
    const [resetPassword, { data, isLoading, isError }] = useResetPasswordMutation();

    useEffect(() => {
        const tokenFromUrl = searchParams.get("token");
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
        }
    }, [searchParams]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await resetPassword({ email, token, password,"password_confirmation": password }).unwrap();
            console.log("Password reset response:", response);
        } catch (error) {
            console.error("Password reset failed:", error);
        }
    };

    return (
        <ResetPassView
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            token={token}
            handleSubmit={handleSubmit}
        />
    );
};

export default ResetPassword;
