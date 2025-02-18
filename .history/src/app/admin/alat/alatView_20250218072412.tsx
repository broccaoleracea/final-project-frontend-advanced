"use client";
import { useEffect, useState } from "react";
import Link from "next/link"; // Import Link untuk navigasi
import {
  useAlatGetQuery,
  useKategoriGetQuery,
  useAlatDeleteMutation,
} from "@/state/api/dataApi";

const AlatView = () => {
  const [error, setError] = useState("");

  // Query untuk mendapatkan data alat dan kategori
  const {
    data: alatResponse,
    refetch: refetchAlat,
    isLoading: isAlatLoading,
    isError: isAlatError,
  } = useAlatGetQuery();
  const {
    data: kategoriResponse,
    isLoading: isKategoriLoading,
    isError: isKategoriError,
  } = useKategoriGetQuery();

  // Mutation untuk menghapus alat
  const [deleteAlat, { isLoading: isDeleting }] = useAlatDeleteMutation();

  const handleDelete = async (alat_id: number) => {
    try {
      console.log("Menghapus alat dengan ID:", alat_id);
      await deleteAlat(alat_id).unwrap(); // Panggil mutation untuk menghapus alat
      await refetchAlat(); // Paksa refetch data alat untuk memastikan data terbaru
      console.log("Alat berhasil dihapus");
    } catch (err: any) {
      console.error("Error saat menghapus alat:", err);
      setError(err?.data?.message || "Gagal menghapus alat.");
    }
  };

  // Loading state
  if (isAlatLoading || isKategoriLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500"></div>
      </div>
    );
  }

  // Error state
  if (isAlatError || isKategoriError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-red-500 text-lg font-semibold">
          Gagal memuat data!
        </div>
      </div>
    );
  }

  // Data alat dan kategori
  const alat = alatResponse?.data || [];
  const kategori = kategoriResponse?.data || [];

  // Gabungkan data alat dengan kategori
  const alatWithKategori = alat.map((item) => {
    const kategoriData = kategori.find(
      (kat) => kat.kategori_id === item.alat_kategori_id
    );
    return {
      ...item,
      kategori_nama: kategoriData ? kategoriData.kategori_nama : "-",
    };
  });

  useEffect(()=>{})

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-full p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Daftar Alat</h1>
          <Link
            href="/admin/alat/tambah" // Navigasi ke halaman tambah alat
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-lg shadow-md hover:from-yellow-500 hover:to-yellow-600 transition duration-300 ease-in-out"
          >
            Tambah Alat
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-hidden border border-gray-200 rounded-lg shadow-md bg-white">
          <table className="w-full border-collapse text-lg">
            <thead className="bg-gradient-to-r from-blue-200 to-indigo-200 text-gray-800">
              <tr>
                <th className="py-5 px-8 text-left font-semibold">Kategori</th>
                <th className="py-5 px-8 text-left font-semibold">
                  Nama Barang
                </th>
                <th className="py-5 px-8 text-left font-semibold">Stok</th>
                <th className="py-5 px-8 text-left font-semibold">Deskripsi</th>
                <th className="py-5 px-8 text-left font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {alatWithKategori.length > 0 ? (
                alatWithKategori.map((item, index) => (
                  <tr
                    key={item.alat_id}
                    className={`transition-all duration-300 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                    } hover:bg-indigo-50`}
                  >
                    <td className="py-6 px-8 border-b text-gray-700 font-medium">
                      {item.kategori_nama || "-"}
                    </td>
                    <td className="py-6 px-8 border-b text-gray-700 font-semibold">
                      {item.alat_nama}
                    </td>
                    <td className="py-6 px-8 border-b text-center">
                      <span
                        className={`px-4 py-2 text-base font-semibold rounded-full shadow-md ${
                          item.alat_stok > 10
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {item.alat_stok || 0}
                      </span>
                    </td>
                    <td className="py-6 px-8 border-b text-gray-600">
                      {item.alat_deskripsi || "-"}
                    </td>
                    <td className="py-6 px-8 border-b text-center">
                      {/* Tombol Edit */}
                      <Link
                        href={`/admin/alat/update/${item.alat_id}`} // Navigasi ke halaman update
                        className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2 hover:bg-blue-600 transition duration-300 ease-in-out"
                      >
                        Edit
                      </Link>

                      {/* Tombol Hapus */}
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
                        onClick={() => handleDelete(item.alat_id)} // Panggil fungsi hapus
                        disabled={isDeleting} // Nonaktifkan tombol saat proses penghapusan
                      >
                        {isDeleting ? "Menghapus..." : "Hapus"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="py-6 px-8 text-center text-gray-500"
                  >
                    Tidak ada alat untuk ditampilkan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AlatView;
