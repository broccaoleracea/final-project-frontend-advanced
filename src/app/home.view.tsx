import Link from "next/link";
import React from "react";
const HomeView = () => {
  return (
    <div className="flex justify-start mt-16">
      <div className="flex max-w-[80%] mx-auto">
        <div className="max-w-[50%] pr-8">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl text-left">
            Cari semua kebutuhanmu di GacorCihuy
          </h1>
          <p className="mb-6 text-lg font-normal text-left text-gray-500 lg:text-xl dark:text-gray-400">
            Kepepet butuh barang elektronik? Sewa aja di GacorCihuy, prosesnya cepat dan praktis!
            <br />
            <a
              href="https://www.flaticon.com/free-icons/rent"
              title="rent icons"
            >
              Rent icons created by SBTS2018 - Flaticon
            </a>
          </p>

          <Link
            href="/alat"
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-black bg-yellow-400 rounded-lg hover:bg-yellow-200"
          >
            Learn more
            <svg
              className="w-3.5 h-3.5 ms-2 rtl:rotate-180 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
        
        <div className="flex items-center">
          <img
            src="/elektronik.png"
            alt="elektronik"
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};
export default HomeView;
