import React from "react";

const Page = () => {
  const data = [
    { id: 1, nama: "Kamera DSLR", stok: 10, deskripsi: "Kamera DSLR dengan lensa 18-55mm", kategori: "Elektronik" },
    { id: 2, nama: "Tripod", stok: 15, deskripsi: "Tripod aluminium ringan dan kokoh", kategori: "Aksesoris" },
    { id: 3, nama: "Laptop", stok: 5, deskripsi: "Laptop Core i7 dengan RAM 16GB", kategori: "Komputer" },
    { id: 4, nama: "Speaker Bluetooth", stok: 8, deskripsi: "Speaker portable dengan suara jernih", kategori: "Audio" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-lg">
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-700 text-center mb-6">
          <span className="border-b-4 border-blue-400 pb-2">Daftar Barang</span>
        </h2>

        {/* Tabel */}
        <div className="overflow-hidden border border-gray-300 rounded-lg shadow-md">
          <table className="w-full border-collapse">
            <thead className="bg-blue-200 text-gray-800">
              <tr>
                <th className="py-4 px-6 text-left font-semibold">Kategori</th>
                <th className="py-4 px-6 text-left font-semibold">Nama Barang</th>
                <th className="py-4 px-6 text-left font-semibold">Stok</th>
                <th className="py-4 px-6 text-left font-semibold">Deskripsi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                  } hover:bg-blue-100 transition duration-300`}
                >
                  <td className="py-4 px-6 border-b text-gray-700">{item.kategori}</td>
                  <td className="py-4 px-6 border-b text-gray-700 font-semibold">{item.nama}</td>
                  <td className="py-4 px-6 border-b text-center">
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${item.stok > 10 ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`}>
                      {item.stok}
                    </span>
                  </td>
                  <td className="py-4 px-6 border-b text-gray-600">{item.deskripsi}</td>
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
