"use client";
import { useState, useEffect } from "react";
import { useAlatGetQuery } from "@/state/api/dataApi";
import { useAppDispatch } from "@/hooks/hooks";
import { setAlat } from "@/state/api/data/alatSlice";
import FullPageSpinner from "@/Components/Spinner/FullPageSpinner";

// Sub-component: Statistics Section
const StatisticsSection = ({ totalBarang, totalStok, totalKategori }) => (
  <div id='conten2' className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 mb-12 w-full">
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
);

// Sub-component: Individual Alat Item
const AlatItem = ({ item }) => (
  <div
    key={item.id}
    className="p-8 bg-white rounded-2xl shadow-md border border-gray-200 hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer min-w-[300px]"
  >
    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
      {item.alat_nama}
    </h3>
    <p className="text-base text-gray-600 mb-2">Rp {item.alat_hargaPerhari}</p>
    <p className="text-base text-gray-600 mb-4">{item.alat_deskripsi}</p>
    <a
      href="/admin/pelanggan"
      aria-label={`Rent ${item.alat_nama}`}
      data-testid={`rent-${item.id}`} // Tambahkan atribut unik berdasarkan ID
      className="inline-block mt-4 px-6 py-3 text-base font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300"
    >
      Rent Now
    </a>
  </div>
);

// Main Component: HomeView
const HomeView = () => {
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  // Fetch data using RTK Query
  const {
    data: alatResponse,
    isLoading,
    isError,
    error: queryError,
  } = useAlatGetQuery();

  // Dispatch data to Redux store when available
  useEffect(() => {
    if (alatResponse) {
      dispatch(setAlat(alatResponse.data));
    }
  }, [alatResponse, dispatch]);

  // Handle loading state
  if (isLoading) {
    return <FullPageSpinner />;
  }

  // Handle error state
  if (isError) {
    return (
      <div className="text-red-600 text-center py-8">
        {queryError?.data?.message ||
          "Gagal memuat alat. Silakan coba lagi nanti."}
      </div>
    );
  }

  // Extract alat data or default to an empty array
  const alat = alatResponse?.data || [];

  // Calculate statistics
  const totalStok = alat.reduce(
    (total, item) => total + (item.alat_stok || 0),
    0
  );
  const totalBarang = alat.length;
  const totalKategori = Array.from(
    new Set(alat.map((item) => item.kategori))
  ).length;

  return (
    <div className="p-8 text-left w-full max-w-none flex flex-col items-center">
      {/* Hero Section */}
      <div className="bg-yellow-400 w-full py-10 px-6 rounded-xl shadow-lg flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold mb-4 text-black">
            Hello Admin!
          </h1>
          <p className="text-gray-700 text-lg">
            Selamat datang di halaman Admin.
          </p>
          <button
            aria-label="Learn More"
            className="mt-6 bg-black text-white font-bold py-3 px-8 rounded-lg shadow-md text-lg"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Statistics Section */}
      <StatisticsSection
        totalBarang={totalBarang}
        totalStok={totalStok}
        totalKategori={totalKategori}
      />

      {/* Alat Items Section */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full">
        {alat.length > 0 ? (
          alat.map((item) => <AlatItem key={item.id} item={item} />)
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
