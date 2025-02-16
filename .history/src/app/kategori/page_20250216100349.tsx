import React, { useState } from 'react';

export default function Kategori() {
  // Data barang elektronik
  const [barang, setBarang] = useState([
    { id: 1, nama: 'Lampu LED', kategori: 'pencahayaan', tersedia: true },
    { id: 2, nama: 'AC Split', kategori: 'pendingin ruangan', tersedia: true },
    { id: 3, nama: 'Kamera DSLR', kategori: 'kamera', tersedia: false },
    { id: 4, nama: 'Smartphone X', kategori: 'handphone', tersedia: true },
    { id: 5, nama: 'Laptop Pro', kategori: 'laptop', tersedia: true },
    { id: 6, nama: 'Lampu Bohlam', kategori: 'pencahayaan', tersedia: false },
    { id: 7, nama: 'Kipas Angin', kategori: 'pendingin ruangan', tersedia: true },
    { id: 8, nama: 'Kamera Mirrorless', kategori: 'kamera', tersedia: true },
    { id: 9, nama: 'Smartphone Y', kategori: 'handphone', tersedia: false },
    { id: 10, nama: 'Laptop Gaming', kategori: 'laptop', tersedia: true },
  ]);

  // State untuk filter
  const [filterKategori, setFilterKategori] = useState('');
  const [filterTersedia, setFilterTersedia] = useState(false);

  // Fungsi filter barang
  const filteredBarang = barang.filter((item) => {
    const matchesKategori = filterKategori ? item.kategori === filterKategori : true;
    const matchesTersedia = filterTersedia ? item.tersedia : true;
    return matchesKategori && matchesTersedia;
  });

  return (
    <div className="ml-64 p-4 min-h-screen bg-gray-100 dark:bg-gray-900 overflow-y-auto">
      <p className="text-xl font-bold text-center text-gray-900 dark:text-white mb-6">
        Halaman Kategori Barang Elektronik
      </p>

      {/* Filter Section */}
      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
        <select
          value={filterKategori}
          onChange={(e) => setFilterKategori(e.target.value)}
          className="p-2 border rounded-md bg-white dark:bg-gray-800 dark:text-white"
        >
          <option value="">Semua Kategori</option>
          <option value="pencahayaan">Pencahayaan</option>
          <option value="pendingin ruangan">Pendingin Ruangan</option>
          <option value="kamera">Kamera</option>
          <option value="handphone">Handphone</option>
          <option value="laptop">Laptop</option>
        </select>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={filterTersedia}
            onChange={(e) => setFilterTersedia(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-500"
          />
          <span className="text-gray-700 dark:text-gray-300">Hanya Tampilkan Barang Tersedia</span>
        </label>
      </div>

      {/* Card Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBarang.length > 0 ? (
          filteredBarang.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-lg shadow-md ${
                item.tersedia
                  ? 'bg-white dark:bg-gray-800'
                  : 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed'
              }`}
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.nama}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Kategori: {item.kategori}</p>
              <p
                className={`text-sm font-medium ${
                  item.tersedia ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {item.tersedia ? 'Tersedia' : 'Tidak Tersedia'}
              </p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 dark:text-gray-400">
            Tidak ada barang yang sesuai dengan filter.
          </p>
        )}
      </div>
    </div>
  );
}