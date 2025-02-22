"use client";
import RegisterView from "./register.view";
import { useState } from "react";
import { useRegisterMutation } from "@/state/api/authApi";
import { useAppDispatch } from "@/hooks/hooks";
import { useRouter } from "next/navigation";
import {toast} from "react-toastify";

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
            toast.success("Daftar akun berhasil!");
            useRouter().push("/auth/login");
        } catch (err) {
            const errorMessage = (err as any)?.data?.message || "Registrasi gagal. Mohon coba lagi.";
            toast.error(errorMessage);
        }
    };

    return (
        <RegisterView
            name={name}
            email={email}
            password={password}
            setNameAction={setName}
            setEmailAction={setEmail}
            setPasswordAction={setPassword}
            handleSubmitAction={handleSubmit}
            error={error}
            isLoading={isLoading}
        />
    );
}
