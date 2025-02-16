import React from "react";

const RentalPage = () => {
  const rentedItems = [
    {
      id: 1,
      name: "Laptop ASUS ROG",
      category: "Elektronik",
      rentalPeriod: "10 Hari",
      status: "Sedang Disewa",
    },
    {
      id: 2,
      name: "Proyektor Epson",
      category: "Elektronik",
      rentalPeriod: "5 Hari",
      status: "Dikembalikan",
    },
    {
      id: 3,
      name: "Kamera Canon EOS",
      category: "Fotografi",
      rentalPeriod: "7 Hari",
      status: "Sedang Disewa",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white p-6 shadow-md">
        <h2 className="text-xl font-bold mb-6">Menu</h2>
        <nav>
          <ul className="space-y-4">
            <li className="hover:text-blue-500 cursor-pointer">Dashboard</li>
            <li className="hover:text-blue-500 cursor-pointer">Penyewaan</li>
            <li className="hover:text-blue-500 cursor-pointer">Riwayat</li>
            <li className="hover:text-blue-500 cursor-pointer">Pengaturan</li>
          </ul>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Daftar Barang yang Disewa</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3">Nama Barang</th>
                <th className="p-3">Kategori</th>
                <th className="p-3">Durasi Sewa</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {rentedItems.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3">{item.rentalPeriod}</td>
                  <td
                    className={`p-3 ${
                      item.status === "Sedang Disewa"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default RentalPage;
