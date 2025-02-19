// tambah.pelanggan.view.tsx
import React from "react";

interface PelangganViewProps {
  totalBarang: number;
  totalStok: number;
  totalKategori: number;
}

const AdminView: React.FC<PelangganViewProps> = ({ totalBarang, totalStok, totalKategori }) => {
  return (
      <div className="p-8 text-left w-full max-w-none flex flex-col items-center">
        <div className="bg-yellow-400 w-full py-10 px-6 rounded-xl shadow-lg flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-extrabold mb-4 text-black">Hello Admin!</h1>
            <p className="text-gray-700 text-lg">Selamat datang di halaman Admin.</p>
            <button className="mt-6 bg-black text-white font-bold py-3 px-8 rounded-lg shadow-md text-lg">
              Learn More
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 mt-12 mb-12 w-full">
          <div className="bg-blue-200 p-8 rounded-2xl shadow-md text-center">
            <h3 className="text-3xl font-bold">{totalBarang}</h3>
            <p className="text-gray-600 text-lg">Total Barang</p>
          </div>
          <div className="bg-green-200 p-8 rounded-2xl shadow-md text-center">
            <h3 className="text-3xl font-bold">{totalStok}</h3>
            <p className="text-gray-600 text-lg">Total Stok</p>
          </div>
          <div className="bg-purple-200 p-8 rounded-2xl shadow-md text-center">
            <h3 className="text-3xl font-bold">{totalKategori}</h3>
            <p className="text-gray-600 text-lg">Total Kategori</p>
          </div>
        </div>
      </div>
  );
};

export default AdminView;
