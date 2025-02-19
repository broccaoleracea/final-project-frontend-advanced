// alatView.tsx
"use client";
import React from "react";
import Link from "next/link";

type AlatViewProps = {
  alatWithKategori: {
    alat_id: number;
    alat_nama: string;
    alat_stok: number;
    alat_deskripsi?: string;
    kategori_nama: string;
  }[];
  isLoading: boolean;
  isError: boolean;
  isDeleting: boolean;
  showPopup: boolean;
  showConfirmationPopup: (id: number) => void;
  setShowPopup: (show: boolean) => void;
  handleDelete: () => void;
};

const AlatView: React.FC<AlatViewProps> = ({
                                             alatWithKategori,
                                             isLoading,
                                             isError,
                                             isDeleting,
                                             showPopup,
                                             showConfirmationPopup,
                                           }) => {
  if (isLoading) {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500"></div>
        </div>
    );
  }

  if (isError) {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="text-red-500 text-lg font-semibold">Gagal memuat data!</div>
        </div>
    );
  }

  return (
<<<<<<< HEAD
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-full p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Daftar Alat</h1>
          <Link
            href="/admin/alat/tambah"
            name="tambahalt" // Navigasi ke halaman tambah alat
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-lg shadow-md hover:from-yellow-500 hover:to-yellow-600 transition duration-300 ease-in-out"
          >
            Tambah Alat
          </Link>
        </div>
        {/* Table */}
        <div className="overflow-hidden border border-gray-200 rounded-lg shadow-md bg-white">
          <table className="w-full border-collapse text-lg">
            <thead className="bg-gradient-to-r from-blue-200 to-indigo-200 text-gray-800">
=======
      <div className="flex min-h-screen bg-gray-100">
        <div className="w-full p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Daftar Alat</h1>
            <Link
                href="/admin/alat/tambah"
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-lg shadow-md hover:from-yellow-500 hover:to-yellow-600 transition duration-300 ease-in-out"
            >
              Tambah Alat
            </Link>
          </div>
          <div className="overflow-hidden border border-gray-200 rounded-lg shadow-md bg-white">
            <table className="w-full border-collapse text-lg">
              <thead className="bg-gradient-to-r from-blue-200 to-indigo-200 text-gray-800">
>>>>>>> 5ca844feb509b5fa1853ada8c571546455895ef8
              <tr>
                <th className="py-5 px-8 text-left font-semibold">Kategori</th>
                <th className="py-5 px-8 text-left font-semibold">Nama Barang</th>
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
                          <Link
                              href={`/admin/alat/update/${item.alat_id}`}
                              className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2 hover:bg-blue-600 transition duration-300 ease-in-out"
                          >
                            Edit
                          </Link>
                          <button
                              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
                              onClick={() => showConfirmationPopup(item.alat_id)}
                              disabled={isDeleting}
                          >
                            {isDeleting ? "Menghapus..." : "Hapus"}
                          </button>
                        </td>
                      </tr>
                  ))
              ) : (
                  <tr>
                    <td colSpan={5} className="py-6 px-8 text-center text-gray-500">
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
