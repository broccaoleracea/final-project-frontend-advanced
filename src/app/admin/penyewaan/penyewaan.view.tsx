"use client";
import { useState, useEffect } from "react";
import { usePenyewaanGetQuery } from "@/state/api/dataApi"; // Ganti dengan endpoint penyewaan
import { useAppDispatch } from "@/hooks/hooks";
import Link from "next/link"; // Import Link untuk navigasi

const RentalPage = () => {
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const { data: penyewaanResponse, isLoading, isError } = usePenyewaanGetQuery();

  useEffect(() => {
    if (penyewaanResponse) {
      // Jika perlu menyimpan data ke state global, gunakan dispatch di sini
      // Contoh: dispatch(setPenyewaan(penyewaanResponse.data));
    }
  }, [penyewaanResponse, dispatch]);

  // Skeleton Loading Component
  const SkeletonLoader = () => (
    <div className="space-y-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
      ))}
    </div>
  );

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (isError) {
    return (
      <div className="text-red-600 text-center py-8">
        Gagal memuat data penyewaan. Silakan coba lagi nanti.
      </div>
    );
  }

  const rentedItems = penyewaanResponse?.data || [];

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      {/* Content */}
      <main className="w-full max-w-screen-lg p-6">
        {/* Header with "Tambah" Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-700">Barang yang Disewa</h1>
          <Link href="/admin/penyewaan/tambah">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-300">
              Tambah
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rentedItems.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-500">{item.category}</p>
              <p className="text-gray-700 font-medium">Durasi: {item.rentalPeriod}</p>
              <p className="text-gray-700 font-medium">Penyewa: {item.renter}</p>
              <span
                className={`mt-3 px-4 py-1 rounded-full text-sm font-semibold ${
                  item.status === "Sedang Disewa"
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-green-200 text-green-800"
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}

          {/* Empty State */}
          {rentedItems.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              Tidak ada barang yang disewa saat ini.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default RentalPage;