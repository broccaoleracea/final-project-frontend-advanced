import React from "react";

const Page = () => {
  const data = [
    { id: 1, nama: "Kamera DSLR", stok: 10, deskripsi: "Kamera DSLR dengan lensa 18-55mm", kategori: "Elektronik" },
    { id: 2, nama: "Tripod", stok: 15, deskripsi: "Tripod aluminium ringan dan kokoh", kategori: "Aksesoris" },
    { id: 3, nama: "Laptop", stok: 5, deskripsi: "Laptop Core i7 dengan RAM 16GB", kategori: "Komputer" },
    { id: 4, nama: "Speaker Bluetooth", stok: 8, deskripsi: "Speaker portable dengan suara jernih", kategori: "Audio" },
  ];

  return (
    <div className="ml-64 flex min-h-screen bg-gray-100">
      {/* Content */}
      <div className="w-full p-8">
        {/* Statistik */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {data.map((item) => (
            <div key={item.id} className="bg-green-50 shadow-md p-6 rounded-xl">
              <div>
                <h3 className="text-lg font-semibold ">{item.nama}</h3>
                <p className="text-gray-500">Stok: {item.stok}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabel */}
        <div className="overflow-hidden border border-gray-100 rounded-lg shadow-md bg-white">
          <table className="w-full border-collapse text-lg">
            <thead className="bg-gradient-to-r from-blue-200 to-indigo-200 text-gray-800">
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
                    index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                  } hover:bg-indigo-50 hover:scale-105`}
                >
                  <td className="py-6 px-8 border-b text-gray-700 font-medium">{item.kategori}</td>
                  <td className="py-6 px-8 border-b text-gray-700 font-semibold">{item.nama}</td>
                  <td className="py-6 px-8 border-b text-center">
                    <span className={`px-4 py-2 text-base font-semibold rounded-full shadow-md ${
                      item.stok > 10 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
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
