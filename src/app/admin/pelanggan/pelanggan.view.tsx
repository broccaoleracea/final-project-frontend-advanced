import React from "react";

const RentalForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Form Utama */}
      <form className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl mx-auto">
        {/* Judul Form */}
        <h2 className="text-3xl font-bold text-center mb-8">FORM PENYEWAAN</h2>

        {/* Account Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Penyewa</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input
              type="text"
              placeholder="Nama Lengkap"
              className="p-4 border rounded-lg w-full"
            />
            <input
              type="text"
              placeholder="Nomor Telepon"
              className="p-4 border rounded-lg w-full"
            />
            <input
              type="email"
              placeholder="Email"
              className="p-4 border rounded-lg w-full"
            />
          </div>
        </div>

        {/* Rental Details Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Detail Penyewaan</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <select className="p-4 border rounded-lg w-full">
              <option>Pilih Barang</option>
              <option>Kamera</option>
              <option>Mobil</option>
              <option>Rumah</option>
            </select>
            <input
              type="number"
              placeholder="Jumlah Barang"
              className="p-4 border rounded-lg w-full"
            />
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2">Tanggal Sewa</label>
              <input type="date" className="p-4 border rounded-lg w-full" />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2">Tanggal Kembali</label>
              <input type="date" className="p-4 border rounded-lg w-full" />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2">Jumlah Harga (Rp)</label>
              <input
                type="number"
                placeholder="Masukkan Jumlah Harga"
                className="p-4 border rounded-lg w-full"
              />
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Alamat</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <input
              type="text"
              placeholder="Alamat Lengkap"
              className="p-4 border rounded-lg w-full"
            />
            <input
              type="text"
              placeholder="Kota"
              className="p-4 border rounded-lg w-full"
            />
            <input
              type="text"
              placeholder="Provinsi"
              className="p-4 border rounded-lg w-full"
            />
            <input
              type="text"
              placeholder="Kode Pos"
              className="p-4 border rounded-lg w-full"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            className="text-gray-500 px-8 py-4 rounded-lg text-lg"
          >
            CANCEL
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-8 py-4 rounded-lg text-lg"
          >
            UPDATE
          </button>
        </div>
      </form>
    </div>
  );
};

export default RentalForm;