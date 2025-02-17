import React from "react";

const RentalForm = () => {
  return (
    <>
      {/* Title */}
      <h2 className="text-3xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-yellow-400">
        FORM PENYEWAAN
      </h2>

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        {/* Form */}
        <form>
          {/* Penyewa Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Penyewa</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  className="p-4 pl-12 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300"
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nomor Telepon"
                  className="p-4 pl-12 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300"
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  className="p-4 pl-12 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300"
                />
              </div>
            </div>
          </div>

          {/* Detail Penyewaan Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Detail Penyewaan</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative">
                <select className="p-4 pl-12 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300">
                  <option>Pilih Barang</option>
                  <option>Kamera</option>
                  <option>Mobil</option>
                  <option>Rumah</option>
                </select>
              </div>
              <div className="relative">
                <input
                  type="number"
                  placeholder="Jumlah Barang"
                  className="p-4 pl-12 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-2 text-gray-600">
                  Tanggal Sewa
                </label>
                <input
                  type="date"
                  className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-2 text-gray-600">
                  Tanggal Kembali
                </label>
                <input
                  type="date"
                  className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300"
                />
              </div>
              <div className="relative">
                <input
                  type="number"
                  placeholder="Jumlah Harga (Rp)"
                  className="p-4 pl-12 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300"
                />
              </div>
            </div>
          </div>

          {/* Alamat Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Alamat</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Alamat Lengkap"
                  className="p-4 pl-12 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300"
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Kota"
                  className="p-4 pl-12 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300"
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Provinsi"
                  className="p-4 pl-12 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300"
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Kode Pos"
                  className="p-4 pl-12 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <button
              type="button"
              className="px-8 py-4 rounded-lg text-lg font-medium bg-gray-200 hover:bg-gray-300 transition duration-300 mr-4"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-8 py-4 rounded-lg text-lg font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-indigo-600 hover:to-blue-600 transition duration-300"
            >
              UPDATE
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RentalForm;
