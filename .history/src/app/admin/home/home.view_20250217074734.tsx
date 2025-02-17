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

  const totalStok = alat.reduce((total, item) => total + (item.alat_stok || 0), 0);


  return (
    <div className="p-8 text-left w-full max-w-none flex flex-col items-center">
      {/* Hero Section */}
      <div className="bg-yellow-400 w-full py-10 px-6 rounded-xl shadow-lg flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold mb-2 text-black">
            Hello User!
          </h1>
          <p className="text-gray-700">
            Lorem Ipsum is simply dummy text of the printing industry.
          </p>
          <button className="mt-4 bg-black text-white font-bold py-2 px-6 rounded-lg shadow-md">
            Write new post
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-6 mb-6 w-full">
        <div className="bg-blue-100 p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-bold">$623</h3>{" "}
          {/* Ganti dengan data dinamis jika ada */}
          <p className="text-gray-600">Total Barang</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-bold">{totalStok}</h3>{" "}
          {/* Ganti dengan data dinamis jika ada */}
          <p className="text-gray-600">Total Stok</p>
        </div>
        <div className="bg-red-100 p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-bold">03</h3>{" "}
          {/* Ganti dengan data dinamis jika ada */}
          <p className="text-gray-600">Pending Articles</p>
        </div>
      </div>

      {/* Tampilan Kategori */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {alat.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-white rounded-lg shadow-md border border-gray-200 hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <h3 className="text-xl font-semibold text-gray-900">
              {item.alat_nama}
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Rp {item.alat_hargaPerhari}
            </p>
            <p className="text-sm text-gray-600 mt-2">{item.alat_deskripsi}</p>
            <a href="/admin/pelanggan" className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300">
              Rent Now
            </a>
          </div>
        ))}

        {/* Empty State */}
        {alat.length === 0 && (
          <div className="col-span-full text-center py-8 text-gray-500">
            Tidak ada alat yang tersedia.
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeView;
