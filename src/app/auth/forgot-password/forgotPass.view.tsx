import React from "react";

interface ResetPassProps {
    email: string;
    setEmail: (email: string) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const ForgotPassView: React.FC<ResetPassProps> = ({ email, setEmail, handleSubmit }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md border border-gray-200">
                <h2 className="text-xl font-semibold mb-4 text-center text-gray-900">
                    Lupa Password GacorCihuy
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:border-yellow-400 focus:ring-yellow-400"
                            placeholder="Masukkan email Anda"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-yellow-400 text-black px-3 py-2 rounded-md text-sm font-medium hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassView;
