"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ResetPassView from "@/app/reset-password/resetPass.view";

const ResetPassword: React.FC = () => {
    const searchParams = useSearchParams();
    const [email, setEmail] = useState<string>("");
    const [token, setToken] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    useEffect(() => {
        const tokenFromUrl = searchParams.get("token");
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
        }
    }, [searchParams]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // TODO: Call API to reset password >:(
        console.log({ email, token, password });
    };

    return (
        <ResetPassView
            email={email}
            setEmail={setEmail}
            token={token}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
        />
    );
};

export default ResetPassword;
