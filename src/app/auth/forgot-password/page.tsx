"use client"
import React, { useState } from "react";
import ForgotPassView from "@/app/auth/forgot-password/forgotPass.view";

const ResetPassword: React.FC = () => {
    
    const [email, setEmail] = useState<string>("");
    

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // TODO: Call API to reset password
    };

    return (
        <ForgotPassView
            email={email}
            setEmail={setEmail}
            handleSubmit={handleSubmit}
        />
    );
};

export default ResetPassword;
