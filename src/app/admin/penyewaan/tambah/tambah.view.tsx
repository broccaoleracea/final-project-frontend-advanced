import React from "react";

const TambahForm = () => {
  return (
    <>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h2 className="text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
          FORM PENYEWAAN
        </h2>
          {/* Form */}
          <form>
            {/* Detail Penyewaan Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-700 border-b-2 pb-2 border-indigo-500">Detail Penyewaan</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative">
                  <label className="text-sm font-medium mb-2 text-gray-600">Pilih Nama</label>
                  <select className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100">
                    <option>Pilih Nama</option>
                    <option>John Doe</option>
                    <option>Jane Smith</option>
                    <option>Michael Johnson</option>
                  </select>
                </div>
                <div className="relative">
                  <label className="text-sm font-medium mb-2 text-gray-600">Pilih Barang</label>
                  <select className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100">
                    <option>Pilih Barang</option>
                    <option>Kamera</option>
                    <option>Mobil</option>
                    <option>Rumah</option>
                  </select>
                </div>
                <div className="relative">
                  <label className="text-sm font-medium mb-2 text-gray-600">Jumlah Barang</label>
                  <input
                    type="number"
                    placeholder="Jumlah Barang"
                    className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
                  />
                </div>
              </div>
            </div>

            {/* Tanggal Sewa Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-700 border-b-2 pb-2 border-indigo-500">Tanggal Penyewaan</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="text-sm font-medium mb-2 text-gray-600">Tanggal Sewa</label>
                  <input
                    type="date"
                    className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
                  />
                </div>
                <div className="relative">
                  <label className="text-sm font-medium mb-2 text-gray-600">Tanggal Kembali</label>
                  <input
                    type="date"
                    className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
                  />
                </div>
              </div>
            </div>

            {/* Harga Harian Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-700 border-b-2 pb-2 border-indigo-500">Harga Penyewaan</h3>
              <div className="relative">
                <label className="text-sm font-medium mb-2 text-gray-600">Harga Harian</label>
                <input
                  type="number"
                  placeholder="Harga Harian (Rp)"
                  className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
                />
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

export default TambahForm;
