import React from "react";

const NavbarView = () => {
  return (
      <div>
        <nav className="bg-slate-800">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img
                  src="/logo/key-lineal-color.png"
                  className="h-8"
                  alt="GacorCihuy logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              GacorCihuy
            </span>
            </a>

            <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <a
                  href="/alat"
                  className=" hover:bg-slate-700 focus:ring-4 mr-3 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
              >
                Lihat Alat
              </a>
              <a
                  href="/auth/login"
                  className="text-black bg-yellow-400 hover:bg-yellow-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
              >
                Login
              </a>
              
              

              
            </div>
          </div>
        </nav>
      </div>
  );
};

export default NavbarView;
