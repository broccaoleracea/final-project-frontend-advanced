"use client";
import { Dispatch, SetStateAction } from "react";
import Link from "next/link";

interface RegisterFormProps {
  name: string;
  email: string;
  password: string;
  setNameAction: Dispatch<SetStateAction<string>>;
  setEmailAction: Dispatch<SetStateAction<string>>;
  setPasswordAction: Dispatch<SetStateAction<string>>;
  handleSubmitAction: (e: React.FormEvent) => void;
  error: string;
  isLoading: boolean;
}

export default function RegisterView({
                                       name,
                                       email,
                                       password,
                                       setNameAction,
                                       setEmailAction,
                                       setPasswordAction,
                                       handleSubmitAction,
                                       error,
                                       isLoading,
                                     }: RegisterFormProps) {
  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="min-h-screen flex items-center justify-center bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-lg shadow-md border border-gray-200">
                {/* Header */}
                <div>
                  <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900">
                    Create Your Account
                  </h2>
                </div>

                {/* Form */}
                <form className="space-y-4" onSubmit={handleSubmitAction}>
                  {/* Full Name Input */}
                  <div>
                    <label
                        htmlFor="name"
                        className="block text-lg font-medium text-gray-700 mb-2"
                    >
                      Nama Lengkap
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setNameAction(e.target.value)}
                        className="block w-full rounded-md border border-yellow-400 px-4 py-3 text-lg text-gray-900 placeholder-gray-500 focus:border-yellow-400 focus:ring-yellow-400"
                        placeholder="John Doe"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label
                        htmlFor="email"
                        className="block text-lg font-medium text-gray-700 mb-2"
                    >
                      Alamat Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmailAction(e.target.value)}
                        className="block w-full rounded-md border border-yellow-400 px-4 py-3 text-lg text-gray-900 placeholder-gray-500 focus:border-yellow-400 focus:ring-yellow-400"
                        placeholder="you@example.com"
                    />
                  </div>

                  {/* Password Input */}
                  <div>
                    <label
                        htmlFor="password"
                        className="block text-lg font-medium text-gray-700 mb-2"
                    >
                      Kata Sandi
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        value={password}
                        onChange={(e) => setPasswordAction(e.target.value)}
                        className="block w-full rounded-md border border-yellow-400 px-4 py-3 text-lg text-gray-900 placeholder-gray-500 focus:border-yellow-400 focus:ring-yellow-400"
                        placeholder="Password"
                    />
                  </div>
                  
                  {error && <div className="text-red-600 text-base">{error}</div>}
                  
                  <div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-yellow-400 py-3 px-6 text-lg font-medium text-black hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Membuat akun..." : "Buat Akun"}
                    </button>
                  </div>
                </form>
                
                <div className="text-sm text-center">
                  Sudah punya akun?{" "}
                  <Link href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Masuk
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
