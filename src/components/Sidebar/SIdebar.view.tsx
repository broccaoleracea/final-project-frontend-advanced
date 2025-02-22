import React from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "@/state/api/authSlice";
import { redirect } from "next/navigation";

const Sidebar = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        redirect(`/auth/login`);
    };

    return (
        <aside
            id="logo-sidebar"
            className="fixed top-0 left-0 z-40 w-64 h-screen overflow-y-auto bg-slate-800 shadow-lg"
            aria-label="Sidebar"
        >
            <div className="h-full px-3 py-4">
                <a href="#" className="flex items-center pl-2.5 mb-5">
                    <img
                        src="/logo/key-lineal-color.png"
                        className="h-8 mr-3"
                        alt="Logo"
                    />
                    <span className="self-center text-2xl font-bold whitespace-nowrap text-white">
            GacorCihuy
          </span>
                </a>
                <ul className="space-y-2">
                    <li>
                        <Link href="/admin">
              <span className="flex items-center p-2 text-base font-medium text-white rounded-lg transition duration-300 ease-in-out hover:bg-slate-700">
                <svg
                    className="w-6 h-6 text-gray-800 dark:text-white mr-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                  <path
                      fillRule="evenodd"
                      d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
                      clipRule="evenodd"
                  />
                </svg>
                Home
              </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/kategori">
              <span className="flex items-center p-2 text-base font-medium text-white rounded-lg transition duration-300 ease-in-out hover:bg-slate-600">
                <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-white transition duration-300 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
                Kategori
              </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/alat">
              <span className="flex items-center p-2 text-base font-medium text-white rounded-lg transition duration-300 ease-in-out hover:bg-slate-600">
                <svg
                    className="w-6 h-6 text-gray-800 mr-3 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                  <path
                      stroke="currentColor"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.07141 14v6h5.99999v-6H4.07141Zm4.5-4h6.99999l-3.5-6-3.49999 6Zm7.99999 10c1.933 0 3.5-1.567 3.5-3.5s-1.567-3.5-3.5-3.5-3.5 1.567-3.5 3.5 1.567 3.5 3.5 3.5Z"
                  />
                </svg>
                Alat
              </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/penyewaan">
              <span className="flex items-center p-2 text-base font-medium text-white rounded-lg transition duration-300 ease-in-out hover:bg-slate-600">
                <svg
                    className="w-6 h-6 text-gray-800 mr-3 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                  <path
                      fillRule="evenodd"
                      d="M6 5V4a1 1 0 1 1 2 0v1h3V4a1 1 0 1 1 2 0v1h3V4a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v2H3V7a2 2 0 0 1 2-2h1ZM3 19v-8h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm5-6a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8Z"
                      clipRule="evenodd"
                  />
                </svg>
                Penyewaan
              </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/pelanggan">
              <span className="flex items-center p-2 text-base font-medium text-white rounded-lg transition duration-300 ease-in-out hover:bg-slate-600">
                <svg
                    className="w-6 h-6 mr-3 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                  <path
                      fillRule="evenodd"
                      d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                      clipRule="evenodd"
                  />
                </svg>
                Pelanggan
              </span>
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={handleLogout}
                            className="flex items-center w-full p-2 text-base font-medium text-white rounded-lg transition duration-300 ease-in-out bg-red-500 hover:bg-red-300"
                        >
                            <svg
                                className="w-6 h-6 mr-3 text-gray-800 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm-2 9a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
