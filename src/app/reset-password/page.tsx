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
            toast.error("Konfirmasi password tidak sesuai.")
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
        }catch (err: any) {
            const apiErrors = err?.data?.error;
            if (apiErrors && typeof apiErrors === "object") {
                //@ts-ignore
                Object.values(apiErrors).forEach((errorArray: string[]) => {
                    errorArray.forEach((message) => {
                        toast.error(message);
                    });
                });
            } else {
                toast.error("Reset passowrd gagal: " + err.message || "Terdapat error. Mohon coba lagi nanti.");
            }
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
