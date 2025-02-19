"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ResetPassView from "@/app/reset-password/resetPass.view";
import {useKategoriGetQuery} from "@/state/api/dataApi";
import {useResetpassMutation} from "@/state/api/authApi";

const ResetPassword: React.FC = () => {
    const searchParams = useSearchParams();
    const [email, setEmail] = useState<string>("");
    const {
        data,
        isLoading,
        isError,
        
    } = useResetpassMutation();

    useEffect(() => {
        const tokenFromUrl = searchParams.get("token");
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
        }
    }, [searchParams]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // TODO: Call API to reset password
        console.log({ email });
    };

    return (
        <ResetPassView
            email={email}
            setEmail={setEmail}
            
            handleSubmit={handleSubmit}
        />
    );
};

export default ResetPassword;
