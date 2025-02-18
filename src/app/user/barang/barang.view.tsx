"use client";
import { useState, useEffect } from "react";
import { useAlatGetQuery } from "@/state/api/dataApi";
import { useAppDispatch } from "@/hooks/hooks";
import { setAlat } from "@/state/api/data/alatSlice";

const HomeView = () => {
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const { data: alatResponse, isLoading, isError } = useAlatGetQuery();

  useEffect(() => {
    if (alatResponse) {
      dispatch(setAlat(alatResponse.data));
    }
  }, [alatResponse, dispatch]);

  // Skeleton Loading Component
  const SkeletonLoader = () => (
    <div className="space-y-4">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="h-16 bg-gray-200 rounded-lg animate-pulse"
        ></div>
      ))}
    </div>
  );

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (isError) {
    return (
      <div className="text-red-600 text-center py-8">
        Gagal memuat alat. Silakan coba lagi nanti.
      </div>
    );
  }

  const alat = alatResponse?.data || [];

  // Hitung total stok
  const totalStok = alat.reduce(
    (total, item) => total + (item.alat_stok || 0),
    0
  );

  // Hitung total barang
  const totalBarang = alat.length;

  // Hitung total kategori unik
  const totalKategori = Array.from(
    new Set(alat.map((item) => item.kategori)) // Ambil nilai unik dari properti 'kategori'
  ).length;

  return (
    <div className="p-8 text-left w-full max-w-none flex flex-col items-center">
      {/* Hero Section */}
      <div
        className="relative w-full py-40 px-6 rounded-xl shadow-lg flex justify-between items-center overflow-hidden"
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
        ></div>
        {/* Content */}
        <div className="relative z-10 text-white">
          <h1 className="text-4xl font-extrabold mb-4">Hello, welcome!</h1>
          <p className="text-lg">Selamat datang di halaman peminjaman barang.</p>
          <button className="mt-6 bg-white text-black font-bold py-3 px-8 rounded-lg shadow-md text-lg hover:bg-gray-800 transition-colors">
            Learn More
          </button>
        </div>
        {/* Background Image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/komputer.png')", // Ganti dengan URL gambar Anda
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: -1,
          }}
        ></div>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 mb-12 w-full">
        {/* Total Barang */}
        <div className="relative bg-gradient-to-br from-gray-700 to-gray-900 p-8 rounded-3xl shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
          <h3 className="text-4xl font-bold text-white">{totalBarang}</h3>
          <p className="text-gray-300 text-lg mt-2">Total Barang</p>
          <div className="absolute top-4 right-4 w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        </div>
        {/* Total Stok */}
        <div className="relative bg-gradient-to-br from-gray-700 to-gray-900 p-8 rounded-3xl shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
          <h3 className="text-4xl font-bold text-white">{totalStok}</h3>
          <p className="text-gray-300 text-lg mt-2">Total Stok</p>
          <div className="absolute top-4 right-4 w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        </div>
        {/* Total Kategori */}
        <div className="relative bg-gradient-to-br from-gray-700 to-gray-900 p-8 rounded-3xl shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
          <h3 className="text-4xl font-bold text-white">{totalKategori}</h3>
          <p className="text-gray-300 text-lg mt-2">Total Kategori</p>
          <div className="absolute top-4 right-4 w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          </div>
        </div>
      </div>

    {/* Tampilan Alat */}
<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full bg-white rounded-3xl shadow-lg p-8">
  {alat.length > 0 ? (
    alat.map((item) => (
      <div
        key={item.id}
        className="relative p-6 bg-gray-50 rounded-3xl shadow-md border border-gray-300 overflow-hidden hover:border-indigo-500 hover:shadow-xl transition-all duration-300 cursor-pointer min-w-[300px]"
      >
        {/* Informasi Alat */}
        <div className="p-6 bg-white rounded-2xl shadow-lg transition-shadow duration-300 hover:shadow-xl">
          {/* Nama Alat */}
          <h3 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-1">
            {item.alat_nama}
          </h3>
          {/* Harga Per Hari */}
          <p className="text-lg font-semibold text-indigo-600 mb-2">
            Rp {item.alat_hargaPerhari}/hari
          </p>
          {/* Deskripsi Alat */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {item.alat_deskripsi}
          </p>
        </div>
        {/* Efek Hover Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-500 to-transparent opacity-0 hover:opacity-30 transition-opacity duration-300"></div>
      </div>
    ))
  ) : (
    <div className="col-span-full text-center py-8 text-gray-500 text-lg">
      <p>Tidak ada alat yang tersedia.</p>
    </div>
  )}
</div>
    </div>
  );
};

export default HomeView;