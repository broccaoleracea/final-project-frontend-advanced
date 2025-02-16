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
            Flowbite
          </span>
        </a>
        {/* Menu Items */}
        <ul className="space-y-2">
          {/* Dashboard */}
          <li>
            <a
              href="/home"
              className="flex items-center p-2 text-base font-medium text-white rounded-lg hover:bg-[#4c9a75] hover:text-gray-100 transition duration-300 ease-in-out"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-white transition duration-300 group-hover:text-gray-100"
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
              href="/kategori"
              className="flex items-center p-2 text-base font-medium text-white rounded-lg hover:bg-[#038549] hover:text-gray-100 transition duration-300 ease-in-out"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-white transition duration-300 group-hover:text-gray-100"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">KATEGORI</span>
            </a>
          </li>

          
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;