import React from "react";

const Sidebar = () => {
  return (
    <aside
      id="logo-sidebar"
      className=" min-w-64 top-0 left-0 z-40 w-64 h-100 transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      {/* Background dengan efek shadow */}
      <div className="h-full px-3 py-4 overflow-y-auto bg-[#05a65d] shadow-lg">
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
              className="flex items-center p-2 text-base font-medium text-white rounded-lg hover:bg-[#038549] hover:text-gray-100 transition duration-300 ease-in-out"
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

          {/* Inbox */}
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-base font-medium text-white rounded-lg hover:bg-[#038549] hover:text-gray-100 transition duration-300 ease-in-out"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-white transition duration-300 group-hover:text-gray-100"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                <path d="M3 5a2 2 0 012-2h1a1 1 0 000-2H5a2 2 0 01-2 2H3zM3 14a2 2 0 012-2h1a1 1 0 000-2H5a2 2 0 01-2 2H3z"></path>
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Inbox</span>
              <span className="inline-flex items-center justify-center w-5 h-5 ml-3 text-xs font-medium text-blue-200 bg-blue-600 rounded-full">
                3
              </span>
            </a>
          </li>

          {/* Pemisah */}
          <hr className="my-4 border-gray-200 dark:border-gray-700" />

          {/* Users */}
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-base font-medium text-white rounded-lg hover:bg-[#038549] hover:text-gray-100 transition duration-300 ease-in-out"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-white transition duration-300 group-hover:text-gray-100"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
            </a>
          </li>

          {/* Products */}
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-base font-medium text-white rounded-lg hover:bg-[#038549] hover:text-gray-100 transition duration-300 ease-in-out"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-white transition duration-300 group-hover:text-gray-100"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4H5V8h10v2z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Products</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
