import { createRef } from "react";
import axiosClient from "@/axios-client";
import { useLoginMutation } from "@/state/api/authApi";
import { setCredentials } from "@/state/api/authSlice";
import { useAppDispatch } from "@/hooks/hooks";

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const handleSubmit = async (credentials: LoginRequest) => {
    try {
      const result = await login(credentials).unwrap();
      dispatch(setCredentials(result));
      // Navigate to protected route
    } catch (err) {
      // Handle error
    }
  };
  return (
    <div>
      Heading yang sangat keren
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <form
          onSubmit={onsubmit}
          className="w-full max-w-sm p-6 rounded-lg bg-white shadow-md"
        >
          <h1 className="mb-6 text-xl font-bold text-gray-800">Login</h1>
          {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}
          <div className="mb-4 mt-4">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              ref={usernameRef}
              id="user_username"
              name="username"
              type="text"
              placeholder="Enter your username"
              className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-800 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              ref={passwordRef}
              id="user_password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-800 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
