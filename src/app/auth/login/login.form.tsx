// app/login/login.form.tsx
"use client";
import { useState } from "react";
import {useLoginMutation, useResetpassMutation} from "@/state/api/authApi";
import { setCredentials } from "@/state/api/authSlice";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/hooks";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [reset, { isLoading }] = useResetpassMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const result = await reset({ email }).unwrap();
      router.push("/");
    } catch (err: any) {
      setError(err?.data?.message || "Reset pass failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      {/* Card Container */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-lg shadow-md border border-gray-200">
          {/* Header */}
          <div>
            <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900">
              Masuk
            </h2>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border border-yellow-400 px-4 py-3 text-lg text-gray-900 placeholder-gray-500 focus:border-yellow-400 focus:ring-yellow-400"
                placeholder="Email address"
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border border-yellow-400 px-4 py-3 text-lg text-gray-900 placeholder-gray-500 focus:border-yellow-400 focus:ring-yellow-400"
                placeholder="Password"
              />
            </div>

            {/* Error Message */}
            {error && <div className="text-red-600 text-base">{error}</div>}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-yellow-400 py-3 px-6 text-lg font-medium text-black hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sedang masuk.." : "Masuk"}
              </button>
            </div>
          </form>
          <div className="text-sm text-center">
            <Link href="/auth/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
              Lupa password?
            </Link>
            <div className="min-w-full"></div>
            <Link href="/auth/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              Daftar akun
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}