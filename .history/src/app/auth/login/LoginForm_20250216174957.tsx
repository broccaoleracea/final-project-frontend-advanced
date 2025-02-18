// app/login/login.form.tsx
"use client";
import { useState } from "react";
import { useLoginMutation } from "@/state/api/authApi";
import { setCredentials } from "@/state/api/authSlice";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/hooks";

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
      const result = await login({ email, password }).unwrap();
      dispatch(setCredentials(result));
      router.push("/admin");
    } catch (err: any) {
      setError(err?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Email Input */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
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
          className="mt-1 block w-full rounded-md border border-yellow-400 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-yellow-400 focus:ring-yellow-400 sm:text-sm"
          placeholder="Email address"
        />
      </div>

      {/* Password Input */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
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
          className="mt-1 block w-full rounded-md border border-yellow-400 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-yellow-400 focus:ring-yellow-400 sm:text-sm"
          placeholder="Password"
        />
      </div>

      {/* Error Message */}
      {error && <div className="text-red-600 text-sm">{error}</div>}

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="group relative flex w-full justify-center rounded-md border border-transparent bg-yellow-400 py-2 px-4 text-sm font-medium text-black hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Sedang masuk.." : "Masuk"}
        </button>
      </div>
    </form>
  );
}