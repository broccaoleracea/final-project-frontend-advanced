"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ResetPassView from "@/app/reset-password/resetPass.view";
import { useResetPasswordMutation } from "@/state/api/authApi";

const ResetPassword: React.FC = () => {
    const searchParams = useSearchParams();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>(""); // Added
    const [token, setToken] = useState<string>("");
    const [resetPassword, { isLoading }] = useResetPasswordMutation();

    useEffect(() => {
        const tokenFromUrl = searchParams.get("token");
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
        }
    }, [searchParams]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (password !== passwordConfirm) {
            console.error("Passwords do not match");
            return;
        }

        try {
            await resetPassword({ email, token, password, password_confirmation: passwordConfirm }).unwrap();
            console.log("Password reset successful");
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
            passwordConfirm={passwordConfirm}
            setPasswordConfirm={setPasswordConfirm} // Added
            handleSubmit={handleSubmit}
        />
    );
};

export default ResetPassword;
