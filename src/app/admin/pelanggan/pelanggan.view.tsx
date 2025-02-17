import React from "react";

const RentalForm = () => {
  return (
    <>
      {/* Title */}
      <h2 className="text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
        FORM PELANGGANG
      </h2>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
          {/* Form */}
          <form>
            {/* Penyewa Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-700 border-b-2 pb-2 border-indigo-500">Penyewa</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Nama Lengkap"
                    className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Nomor Telepon"
                    className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
                  />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email"
                    className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
                  />
                </div>
              </div>
            </div>

            {/* Alamat Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-700 border-b-2 pb-2 border-indigo-500">Alamat</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Alamat Lengkap"
                    className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Kota"
                    className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Provinsi"
                    className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Kode Pos"
                    className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-6">
              <button
                type="button"
                className="px-8 py-4 rounded-lg text-lg font-medium bg-gray-300 hover:bg-gray-400 transition duration-300 mr-4 shadow-md"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="px-8 py-4 rounded-lg text-lg font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-indigo-600 hover:to-blue-600 transition duration-300 shadow-md"
              >
                UPDATE
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RentalForm;
