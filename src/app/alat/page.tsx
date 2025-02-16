import React from "react";

const Page = () => {
  const data = [
    { id: 1, nama: "Kamera DSLR", stok: 10, deskripsi: "Kamera DSLR dengan lensa 18-55mm", kategori: "Elektronik" },
    { id: 2, nama: "Tripod", stok: 15, deskripsi: "Tripod aluminium ringan dan kokoh", kategori: "Aksesoris" },
    { id: 3, nama: "Laptop", stok: 5, deskripsi: "Laptop Core i7 dengan RAM 16GB", kategori: "Komputer" },
    { id: 4, nama: "Speaker Bluetooth", stok: 8, deskripsi: "Speaker portable dengan suara jernih", kategori: "Audio" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-8">
      <div className="w-full max-w-6xl bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-gray-200">
        {/* Header */}
        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-500 text-transparent bg-clip-text">Daftar Barang</span>
        </h2>

        {/* Tabel */}
        <div className="overflow-hidden border border-gray-300 rounded-lg shadow-lg">
          <table className="w-full border-collapse text-lg">
            <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              <tr>
                <th className="py-5 px-8 text-left font-semibold">Kategori</th>
                <th className="py-5 px-8 text-left font-semibold">Nama Barang</th>
                <th className="py-5 px-8 text-left font-semibold">Stok</th>
                <th className="py-5 px-8 text-left font-semibold">Deskripsi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={item.id}
                  className={`transition-all duration-300 ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                  } hover:bg-indigo-100 hover:scale-105`}
                >
                  <td className="py-6 px-8 border-b text-gray-700 font-medium">{item.kategori}</td>
                  <td className="py-6 px-8 border-b text-gray-700 font-semibold">{item.nama}</td>
                  <td className="py-6 px-8 border-b text-center">
                    <span className={`px-4 py-2 text-base font-semibold rounded-full shadow-md ${
                      item.stok > 10 ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                    }`}>
                      {item.stok}
                    </span>
                  </td>
                  <td className="py-6 px-8 border-b text-gray-600">{item.deskripsi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
