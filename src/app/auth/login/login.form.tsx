"use client";
import { useState } from "react";
import { useLoginMutation } from "@/state/api/authApi";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/hooks";
import Link from "next/link";
import { toast } from "react-toastify";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const loginResponse = await login({ email, password }).unwrap();

      toast.success("Login successful!");

      setTimeout(() => {
        router.push("/admin");
      }, 2000);
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      {/* Card Container */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="max-w-md w-full space-y-6 bg-white p-6 rounded-lg shadow-md border border-gray-200">
          {/* Header */}
          <div>
            <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
              Masuk ke GacorCihuy
            </h2>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
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
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-yellow-400 focus:ring-yellow-400"
                placeholder="Email address"
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
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
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-yellow-400 focus:ring-yellow-400"
                placeholder="Password"
              />
            </div>

            {/* Error Message */}
            {error && <div className="text-red-600 text-sm">{error}</div>}

            {/* Submit Button */}
            <div>
              <button
              name="submit"
                type="submit"
                disabled={isLoading}
                className="group relative flex w-full justify-center rounded-md bg-yellow-400 py-2 text-sm font-medium text-black hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sedang masuk.." : "Masuk"}
              </button>
            </div>
          </form>

          {/* Links */}
          <div className="flex justify-between text-sm text-gray-600">
            <Link
              href="/auth/forgot-password"
              className="hover:text-yellow-600"
            >
              Lupa password?
            </Link>
            <Link href="/auth/register" className="hover:text-yellow-600">
              Daftar Akun?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
