import React from "react";
import Link from "next/link";

const Sidebar = () => {
  return (
      <aside
          id="logo-sidebar"
          className="fixed top-0 left-0 z-40 w-64 h-screen overflow-y-auto bg-slate-700 shadow-lg"
          aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4">
          <a href="#" className="flex it  ems-center pl-2.5 mb-5">
            <img
                src="/logo/key-lineal-color.png"
                className="h-8 mr-3"
                alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-bold whitespace-nowrap text-white">
            GacorCihuy
          </span>
          </a>
          <ul className="space-y-2">
            <li>
              <Link href="/admin">
              <span className="flex items-center p-2 text-base font-medium text-white rounded-lg transition duration-300 ease-in-out hover:bg-slate-600 ">
                <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-white transition duration-300 group- mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.001 8.001 0 0117.748 8H12V2.252z"></path>
                </svg>
                Home
              </span>
              </Link>
            </li>
            <li>
              <Link href="/admin/kategori">
              <span className="flex items-center p-2 text-base font-medium text-white rounded-lg transition duration-300 ease-in-out hover:bg-slate-600 ">
                <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-white transition duration-300 group- mr-3"
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
              <span className="flex items-center p-2 text-base font-medium text-white rounded-lg transition duration-300 ease-in-out hover:bg-slate-600 ">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white transition duration-300 group- mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.75 15.75l-3.75-3.75m0 0l-3.75 3.75m3.75-3.75V18m0-10.5a3 3 0 116 0 3 3 0 01-6 0z"
                  />
                </svg>
                Alat
              </span>
              </Link>
            </li>
            <li>
              <Link href="/admin/penyewaan">
              <span className="flex items-center p-2 text-base font-medium text-white rounded-lg transition duration-300 ease-in-out hover:bg-slate-600 ">
                <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-white transition duration-300 group- mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"></path>
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2H5z"></path>
                </svg>
                Penyewaan
              </span>
              </Link>
            </li>
            <li>
              <Link href="/admin/pelanggan">
              <span className="flex items-center p-2 text-base font-medium text-white rounded-lg transition duration-300 ease-in-out hover:bg-slate-600 ">
                <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-white transition duration-300 group- mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"></path>
                </svg>
                Pelanggan
              </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
  );
};

export default Sidebar;
