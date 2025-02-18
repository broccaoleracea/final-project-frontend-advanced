"use client";
import { useState, useEffect } from "react";
import Link from "next/link"; // Import Link untuk navigasi
import { usePenyewaanGetQuery } from "@/state/api/dataApi"; // Ganti dengan endpoint penyewaan

const RentalPage = () => {
  const [error, setError] = useState("");

  // Query untuk mendapatkan data penyewaan
  const {
    data: penyewaanResponse,
    isLoading,
    isError,
  } = usePenyewaanGetQuery();

  // Skeleton Loading Component
  const SkeletonLoader = () => (
    <div className="space-y-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
      ))}
    </div>
  );

  // Handle loading state
  if (isLoading) {
    return <SkeletonLoader />;
  }

  // Handle error state
  if (isError) {
    return (
      <div className="text-red-600 text-center py-8">
        Gagal memuat data penyewaan. Silakan coba lagi nanti.
      </div>
    );
  }

  // Data penyewaan
  const rentedItems = penyewaanResponse?.data || [];

  return (
    <div className="p-4 min-h-screen bg-gray-100 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Barang yang Disewa</h1>
        <Link
            href="/admin/penyewaan/tambah" // Navigasi ke halaman tambah alat
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-lg shadow-md hover:from-yellow-500 hover:to-yellow-600 transition duration-300 ease-in-out"
          >
            Tambah Alat
          </Link>
      </div>

      {/* Table */}
      <div className="overflow-hidden border border-gray-200 rounded-lg shadow-md bg-white">
          <table className="w-full border-collapse text-lg">
          {/* Table Header */}
          <thead className="bg-gradient-to-r from-blue-200 to-indigo-200 text-gray-800">
            <tr>
              <th>Nama Barang</th>
              <th>Kategori</th>
              <th>Durasi</th>
              <th>Penyewa</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {rentedItems.length > 0 ? (
              rentedItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.rentalPeriod}</td>
                  <td>{item.renter}</td>
                  <td
                    className={`${
                      item.status === "Dikembalikan"
                        ? "bg-green-50 text-green-700"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {item.status}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      {/* Tombol Edit */}
                      <Link
                        href={`/rental/edit/${item.id}`}
                        className="btn btn-sm btn-secondary"
                      >
                        Edit
                      </Link>
                      {/* Tombol Hapus */}
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => handleDelete(item.id)} // Panggil fungsi hapus
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  Tidak ada barang yang disewa saat ini.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Fungsi untuk menghapus data
  const handleDelete = async (id: number) => {
    try {
      console.log("Menghapus barang dengan ID:", id);
      // Implementasi mutation delete di sini jika diperlukan
      // Contoh: await deletePenyewaan(id).unwrap();
      console.log("Barang berhasil dihapus");
    } catch (err: any) {
      console.error("Error saat menghapus barang:", err);
      setError(err?.data?.message || "Gagal menghapus barang.");
    }
  };
};

export default RentalPage;