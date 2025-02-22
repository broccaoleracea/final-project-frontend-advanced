"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ResetPassView from "@/app/reset-password/resetPass.view";
import { useResetPasswordMutation } from "@/state/api/authApi";
import { toast } from "react-toastify";

function ResetPasswordContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");
    const [token, setToken] = useState<string>("");
    const [resetPassword] = useResetPasswordMutation();

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
            await resetPassword({
                email,
                token,
                password,
                password_confirmation: passwordConfirm,
            }).unwrap();
            toast.success("Perubahan password berhasil. Anda dapat login dengan password baru");
            router.push("/auth/login");
        } catch (error) {
            toast.error("Password reset failed: " + error);
        }
    };

    return (
        <ResetPassView
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            passwordConfirm={passwordConfirm}
            setPasswordConfirm={setPasswordConfirm}
            handleSubmit={handleSubmit}
        />
    );
}

const ResetPassword: React.FC = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordContent />
        </Suspense>
    );
};

export default ResetPassword;
