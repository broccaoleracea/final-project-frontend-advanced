"use client";
import { useState, useEffect } from "react";
import { useKategoriGetQuery } from "@/state/api/dataApi";
import { useAppDispatch } from "@/hooks/hooks";
import { setKategori } from "@/state/api/data/kategoriSlice";

const KategoriView = () => {
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const { data: kategoriResponse, isLoading, isError } = usepe();

  useEffect(() => {
    if (kategoriResponse) {
      dispatch(setKategori(kategoriResponse.data));
    }
  }, [kategoriResponse, dispatch]);

  // Skeleton Loading Component
  const SkeletonLoader = () => (
    <div className="space-y-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
      ))}
    </div>
  );

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (isError) {
    return (
      <div className="text-red-600 text-center py-8">
        Gagal memuat kategori. Silakan coba lagi nanti.
      </div>
    );
  }

  const kategori = kategoriResponse?.data || [];

  return (
    <div className=" p-4 min-h-screen bg-gray-100 overflow-y-auto">
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
    </div>
  );
};

export default KategoriView;