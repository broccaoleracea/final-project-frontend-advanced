"use client";
import React, { useState } from "react";

import ForgotPassView from "@/app/auth/forgot-password/forgotPass.view";
import {useForgotPasswordMutation} from "@/state/api/authApi";
import {toast} from "react-toastify";

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [forgotPassword, { data, isLoading, isError }] = useForgotPasswordMutation();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await forgotPassword({email} ).unwrap();
            toast.success("Mohon cek email anda.");
        } catch (error) {
            toast.error("Forgot password request failed:" + error);
        }
    };

    return (
        <ForgotPassView
            email={email}
            setEmail={setEmail}
            handleSubmit={handleSubmit}
        />
    );
};

export default ForgotPassword;
