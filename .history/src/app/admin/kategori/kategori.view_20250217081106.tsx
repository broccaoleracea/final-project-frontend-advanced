"use client";
import { useState } from "react";
import { useKategoriGetQuery, useAlatGetQuery } from "@/state/api/dataApi";

const KategoriView = () => {
  // Fetch data kategori
  const { data: kategoriResponse, isLoading: isKategoriLoading, isError: isKategoriError } = useKategoriGetQuery();

  // Fetch data alat
  const { data: alatResponse, isLoading: isAlatLoading, isError: isAlatError } = useAlatGetQuery();

  // State untuk menyimpan kategori terpilih
  const [selectedKategori, setSelectedKategori] = useState(null);

  // Skeleton Loading Component
  const SkeletonLoader = () => (
    <div className="space-y-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
      ))}
    </div>
  );

  // Handle loading state
  if (isKategoriLoading || isAlatLoading) {
    return <SkeletonLoader />;
  }

  // Handle error state
  if (isKategoriError || isAlatError) {
    return (
      <div className="text-red-600 text-center py-8">
        Gagal memuat data. Silakan coba lagi nanti.
      </div>
    );
  }

  // Extract data
  const kategori = kategoriResponse?.data || [];
  const alat = alatResponse?.data || [];

  // Filter barang berdasarkan kategori terpilih
  const filteredAlat = selectedKategori
    ? alat.filter((item) => item.kategori_id === selectedKategori.id)
    : [];

  return (
    <div className="p-4 min-h-screen bg-gray-100 overflow-y-auto">
      {/* Hero Section */}
      <div className="bg-yellow-400 w-full py-10 px-6 rounded-xl shadow-lg mb-8 text-center mt-10">
        <h1 className="text-3xl font-extrabold text-black">Selamat Datang di Halaman Kategori</h1>
        <p className="text-gray-700 mt-2">
          Temukan kategori barang elektronik favorit Anda.
        </p>
      </div>

      {/* Tampilan Kategori */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {kategori.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-white rounded-lg shadow-md border border-gray-200 hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedKategori(item)} // Set kategori terpilih saat card ditekan
          >
            <h3 className="text-xl font-semibold text-gray-900">{item.kategori_nama}</h3>
            <p className="text-sm text-gray-600 mt-2">
              Jelajahi barang-barang dalam kategori ini.
            </p>
          </div>
        ))}

        {/* Empty State */}
        {kategori.length === 0 && (
          <div className="col-span-full text-center py-8 text-gray-500">
            Tidak ada kategori yang tersedia.
          </div>
        )}
      </div>

      {/* Tampilan Barang Berdasarkan Kategori Terpilih */}
      {selectedKategori && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Barang dalam Kategori: {selectedKategori.kategori_nama}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAlat.length > 0 ? (
              filteredAlat.map((item) => (
                <div
                  key={item.id}
                  className="p-6 bg-white rounded-lg shadow-md border border-gray-200 hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <h3 className="text-xl font-semibold text-gray-900">{item.alat_nama}</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Rp {item.alat_hargaPerhari}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">{item.alat_deskripsi}</p>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500">
                Tidak ada barang dalam kategori ini.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default KategoriView;