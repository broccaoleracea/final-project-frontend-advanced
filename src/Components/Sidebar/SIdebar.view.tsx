import React from "react";

const Sidebar = () => {
  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen overflow-y-auto bg-slate-700 shadow-lg"
      aria-label="Sidebar"
    >
      {/* Background dengan efek shadow */}
      <div className="h-full px-3 py-4">
        {/* Logo */}
        <a href="#" className="flex items-center pl-2.5 mb-5">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-bold whitespace-nowrap text-white">
            Flowme
          </span>
        </a>
        {/* Menu Items */}
        <ul className="space-y-2">
          {/* Dashboard */}
          <li>
            <a
              href="/admin/home"
              className="flex items-center p-2 text-base font-medium text-white rounded-lg transition duration-300 ease-in-out hover:bg-yellow-400 hover:text-gray-900"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-white transition duration-300 group-hover:text-gray-900"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.001 8.001 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span className="ml-3">HOME</span>
            </a>
          </li>
          {/* Kategori */}
          <li>
            <a
              href="/admin/kategori"
              className="flex items-center p-2 text-base font-medium text-white rounded-lg transition duration-300 ease-in-out hover:bg-yellow-400 hover:text-gray-900"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-white transition duration-300 group-hover:text-gray-900"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">KATEGORI</span>
            </a>
          </li>
          {/* Pemisah */}
          <hr className="my-4 border-gray-200 dark:border-gray-700" />
          {/* Tombol ALAT */}
          <li>
  <a
    href="/admin/alat"
    className="flex items-center p-2 text-base font-medium text-white rounded-lg transition duration-300 ease-in-out hover:bg-yellow-400 hover:text-gray-900"
  >
    {/* Ikon Alat */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-white transition duration-300 group-hover:text-gray-900"
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
    <span className="ml-3">ALAT</span>
  </a>
</li>
          {/* PENYEWAAN */}
          <li>
            <a
              href="/admin/penyewaan"
              className="flex items-center p-2 text-base font-medium text-white rounded-lg transition duration-300 ease-in-out hover:bg-yellow-400 hover:text-gray-900"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-white transition duration-300 group-hover:text-gray-900"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"></path>
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2H5z"></path>
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">PENYEWAAN</span>
            </a>
          </li>
          {/* PELANGGAN */}
          <li>
            <a
              href="/admin/pelanggan"
              className="flex items-center p-2 text-base font-medium text-white rounded-lg transition duration-300 ease-in-out hover:bg-yellow-400 hover:text-gray-900"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-white transition duration-300 group-hover:text-gray-900"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 10V8a2 2 0 00-2-2h-1a2 2 0 00-2 2v2a2 2 0 002 2h1a1 1 0 011 1v3a1 1 0 01-1 1h-1z"></path>
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">PELANGGAN</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;