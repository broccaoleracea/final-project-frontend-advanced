"use client";
import { useState, useEffect } from "react";
import {
  usePelangganDeleteMutation,
  usePelangganGetQuery,
  usePelangganDataGetQuery, // Query untuk data tambahan pelanggan
} from "@/state/api/dataApi";
import { Link } from "react-router-dom";
import Popup from "@/app/portal/page";

const PelangganView = () => {
  const [error, setError] = useState("");

  // Query untuk mendapatkan data pelanggan utama
  const {
    data: pelangganResponse,
    isLoading: isPelangganLoading,
    isError: isPelangganError,
    refetch: refetchPelanggan,
  } = usePelangganGetQuery();

  // Query untuk mendapatkan data tambahan pelanggan (jenis)
  const {
    data: pelangganDataResponse,
    isLoading: isPelangganDataLoading,
    isError: isPelangganDataError,
    refetch: refetchPelangganData,
  } = usePelangganDataGetQuery();

  const [showPopup, setShowPopup] = useState(false); // Untuk mengontrol tampilan popup
  const [pelangganIdToDelete, setPelangganIdToDelete] = useState<number | null>(null); // Untuk menyimpan ID pelanggan yang akan dihapus
  const [deletePelanggan, { isLoading: isDeleting }] = usePelangganDeleteMutation();

  // Fungsi untuk menghapus pelanggan
  const handleDelete = async () => {
    if (pelangganIdToDelete === null) return;

    try {
      console.log("Menghapus pelanggan dengan ID:", pelangganIdToDelete);
      await deletePelanggan(pelangganIdToDelete).unwrap(); // Panggil mutation untuk menghapus pelanggan
      await refetchPelanggan(); // Paksa refetch data pelanggan untuk memastikan data terbaru
      console.log("Pelanggan berhasil dihapus");
      setShowPopup(false); // Tutup popup setelah penghapusan berhasil
    } catch (err: any) {
      console.error("Error saat menghapus pelanggan:", err);
      setError(err?.data?.message || "Gagal menghapus pelanggan.");
    }
  };

  // Fungsi untuk menampilkan popup konfirmasi
  const showConfirmationPopup = (id: number) => {
    setPelangganIdToDelete(id); // Simpan ID pelanggan yang akan dihapus
    setShowPopup(true); // Tampilkan popup
  };

  // Loading state
  if (isPelangganLoading || isPelangganDataLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500"></div>
      </div>
    );
  }

  // Error state
  if (isPelangganError || isPelangganDataError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-red-500 text-lg font-semibold">
          Gagal memuat data pelanggan!
        </div>
      </div>
    );
  }

  // Data pelanggan utama
  const pelanggan = pelangganResponse?.data || [];
  // Data tambahan pelanggan (jenis)
  const pelangganData = pelangganDataResponse?.data || [];

  // Gabungkan data pelanggan utama dengan data tambahan berdasarkan pelanggan_id
  const combinedData = pelanggan.map((item) => {
    const pelangganDataItem = pelangganData.find(
      (data) => data.pelanggan_data_pelanggan_id === item.pelanggan_id
    );
    return {
      ...item,
      pelanggan_data_jenis: pelangganDataItem?.pelanggan_data_jenis || "-",
    };
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-full p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Daftar Pelanggan</h1>
          <a
            href="/admin/pelanggan/tambah" // Navigasi ke halaman tambah pelanggan
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-lg shadow-md hover:from-yellow-500 hover:to-yellow-600 transition duration-300 ease-in-out"
          >
            Tambah Pelanggan
          </a>
        </div>

        {/* Table */}
        <div className="overflow-hidden border border-gray-200 rounded-lg shadow-md bg-white">
          <table className="w-full border-collapse text-lg">
            <thead className="bg-gradient-to-r from-blue-200 to-indigo-200 text-gray-800">
              <tr>
                <th className="py-5 px-8 text-left font-semibold">Nama Pelanggan</th>
                <th className="py-5 px-8 text-left font-semibold">Alamat</th>
                <th className="py-5 px-8 text-left font-semibold">Nomor Telepon</th>
                <th className="py-5 px-8 text-left font-semibold">Email</th>
                <th className="py-5 px-8 text-left font-semibold">Jenis</th> {/* Kolom baru */}
                <th className="py-5 px-8 text-left font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {combinedData.length > 0 ? (
                combinedData.map((item, index) => (
                  <tr
                    key={item.pelanggan_id}
                    className={`transition-all duration-300 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                    } hover:bg-indigo-50`}
                  >
                    <td className="py-6 px-8 border-b text-gray-700 font-medium">
                      {item.pelanggan_nama || "-"}
                    </td>
                    <td className="py-6 px-8 border-b text-gray-700 font-medium">
                      {item.pelanggan_alamat || "-"}
                    </td>
                    <td className="py-6 px-8 border-b text-gray-700 font-medium">
                      {item.pelanggan_noTelp?.toString() || 0}
                    </td>
                    <td className="py-6 px-8 border-b text-gray-700 font-medium">
                      {item.pelanggan_email || "-"}
                    </td>
                    <td className="py-6 px-8 border-b text-gray-700 font-medium">
                      {item.pelanggan_data_jenis || "-"} {/* Tampilkan jenis */}
                    </td>
                    <td>
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
                        onClick={() => showConfirmationPopup(item.pelanggan_id)} // Tampilkan popup
                        disabled={isDeleting} // Nonaktifkan tombol saat proses penghapusan
                      >
                        {isDeleting ? "Menghapus..." : "Hapus"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-6 px-8 text-center text-gray-500">
                    Tidak ada pelanggan untuk ditampilkan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Popup Konfirmasi */}
        {showPopup && (
          <Popup
            onClose={() => setShowPopup(false)} // Tutup popup
            onDelete={handleDelete} // Panggil fungsi hapus
          />
        )}
      </div>
    </div>
  );
};

export default PelangganView;