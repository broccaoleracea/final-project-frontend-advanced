"use client";
import RegisterView from "./register.view";
import { useState } from "react";
import { useRegisterMutation } from "@/state/api/authApi";
import { useAppDispatch } from "@/hooks/hooks";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [register, { isLoading }] = useRegisterMutation();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            const result = await register({ name, email, password }).unwrap();
            router.push("/auth/login");
        } catch (err) {
            setError(err?.data?.message || "Registrasi gagal. Mohon coba lagi.");
        }
    };

    return (
        <RegisterView
            name={name}
            email={email}
            password={password}
            setName={setName}
            setEmail={setEmail}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
            error={error}
            isLoading={isLoading}
        />
    );
}
