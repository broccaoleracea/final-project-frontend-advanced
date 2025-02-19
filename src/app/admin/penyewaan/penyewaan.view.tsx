"use client";
import { useState } from "react";
import Link from "next/link";
import Popup from "@/app/portal/page";
import {
  usePenyewaanGetQuery,
  usePenyewaanDeleteMutation,
  usePelangganGetQuery,
  useAlatGetQuery,
} from "@/state/api/dataApi";

const RentalPage = () => {
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [penyewaanIdToDelete, setPenyewaanIdToDelete] = useState<number | null>(
    null
  );

  // Query untuk mendapatkan data penyewaan
  const {
    data: penyewaanResponse,
    isLoading: isPenyewaanLoading,
    isError: isPenyewaanError,
    refetch: refetchPenyewaan,
  } = usePenyewaanGetQuery();

  // Query untuk mendapatkan data pelanggan
  const {
    data: pelangganResponse,
    isLoading: isPelangganLoading,
    isError: isPelangganError,
  } = usePelangganGetQuery();

  // Query untuk mendapatkan data alat
  const {
    data: alatResponse,
    isLoading: isAlatLoading,
    isError: isAlatError,
  } = useAlatGetQuery();

  // Mutation untuk menghapus data penyewaan
  const [deletePenyewaan, { isLoading: isDeleting }] =
    usePenyewaanDeleteMutation();

  // Handle penghapusan data penyewaan
  const handleDelete = async () => {
    if (penyewaanIdToDelete === null) return;

    try {
      console.log("Menghapus penyewaan dengan ID:", penyewaanIdToDelete);
      await deletePenyewaan(penyewaanIdToDelete).unwrap();
      console.log("Penyewaan berhasil dihapus");
      refetchPenyewaan(); // Muat ulang data penyewaan
      setShowPopup(false); // Tutup popup
    } catch (err: any) {
      console.error("Error saat menghapus penyewaan:", err);
      setError(err?.data?.message || "Gagal menghapus penyewaan.");
    }
  };

  // Fungsi untuk menampilkan popup konfirmasi
  const showConfirmationPopup = (id: number) => {
    setPenyewaanIdToDelete(id);
    setShowPopup(true);
  };

  // Loading state
  if (isPenyewaanLoading || isPelangganLoading || isAlatLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500"></div>
      </div>
    );
  }

  // Error state
  if (isPenyewaanError || isPelangganError || isAlatError) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="text-red-600 text-lg font-semibold">
          Gagal memuat data!
        </div>
      </div>
    );
  }

  // Data penyewaan, pelanggan, dan alat
  const rentedItems = penyewaanResponse?.data || [];
  const pelangganMap = new Map(
    pelangganResponse?.data?.map((p) => [p.pelanggan_id, p])
  );
  const alatMap = new Map(alatResponse?.data?.map((a) => [a.alat_id, a]));

  // Fungsi untuk menghitung jumlah harga
  const calculateTotalPrice = (
    hargaPerHari: number,
    tglPinjam: string,
    tglKembali: string
  ): number => {
    const startDate = new Date(tglPinjam);
    const endDate = new Date(tglKembali);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return hargaPerHari * dayDifference;
  };

  return (
    <div className="p-4 min-h-screen bg-gray-100 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Barang yang Disewa</h1>
        <Link
          href="/admin/penyewaan/tambah"
          className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-lg shadow-md hover:from-yellow-500 hover:to-yellow-600 transition duration-300 ease-in-out"
        >
          Tambah Penyewaan
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-hidden border border-gray-200 rounded-lg shadow-md bg-white">
        <table className="w-full border-collapse text-lg">
          {/* Table Header */}
          <thead className="bg-gradient-to-r from-blue-200 to-indigo-200 text-gray-800">
            <tr>
              <th className="py-4 px-6 text-left font-semibold">Nama Barang</th>
              <th className="py-4 px-6 text-left font-semibold">Penyewa</th>
              <th className="py-4 px-6 text-left font-semibold">
                Status Pembayaran
              </th>
              <th className="py-4 px-6 text-left font-semibold">
                Tanggal Pinjam
              </th>
              <th className="py-4 px-6 text-left font-semibold">
                Tanggal Kembali
              </th>
              <th className="py-4 px-6 text-left font-semibold">
                Jumlah Harga
              </th>
              <th className="py-4 px-6 text-left font-semibold">
                Status Pengembalian
              </th>
              <th className="py-4 px-6 text-left font-semibold">Aksi</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {rentedItems.map((item) => {
              const alat = alatMap.get(item.alat_id);
              const pelanggan = pelangganMap.get(item.penyewaan_pelanggan_id);
              const hargaPerHari = alat?.harga_perhari || 0;
              const totalHarga = calculateTotalPrice(
                hargaPerHari,
                item.penyewaan_tglSewa,
                item.penyewaan_tglKembali
              );
              return (
                <tr
                  key={item.penyewaan_id}
                  className={`transition-all duration-300 ${
                    item.status_pengembalian === "Dikembalikan"
                      ? "bg-green-50 hover:bg-green-100"
                      : "bg-yellow-50 hover:bg-yellow-100"
                  }`}
                >
                  {/* Nama Barang */}
                  <td className="py-4 px-6 border-b text-gray-700 font-medium">
                    {alat?.alat_nama || "-"}
                  </td>
                  {/* Penyewa */}
                  <td className="py-4 px-6 border-b text-gray-700 font-medium">
                    {pelanggan?.pelanggan_nama || "-"}
                  </td>
                  {/* Status Pembayaran */}
                  <td
                    className={`py-4 px-6 border-b font-medium ${
                      item.status_pembayaran === "Lunas"
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    {item.status_pembayaran || "-"}
                  </td>
                  {/* Tanggal Pinjam */}
                  <td className="py-4 px-6 border-b text-gray-700 font-medium">
                    {new Date(item.penyewaan_tglSewa).toLocaleDateString() ||
                      "-"}
                  </td>
                  {/* Tanggal Kembali */}
                  <td className="py-4 px-6 border-b text-gray-700 font-medium">
                    {new Date(item.penyewaan_tglKembali).toLocaleDateString() ||
                      "-"}
                  </td>
                  {/* Jumlah Harga */}
                  <td className="py-4 px-6 border-b text-gray-700 font-medium">
                    Rp {totalHarga.toLocaleString()}
                  </td>
                  {/* Status Pengembalian */}
                  <td
                    className={`py-4 px-6 border-b font-medium ${
                      item.status_pengembalian === "Belum_Kembali"
                        ? "text-green-700"
                        : "text-yellow-700"
                    }`}
                  >
                    {item.status_pengembalian || "-"}
                  </td>
                  {/* Aksi */}
                  <td className="py-4 px-6 border-b text-gray-700 font-medium">
                    <div className="flex gap-2">
                      {/* Tombol Edit */}
                      <Link
                        href={`/admin/penyewaan/update/${item.penyewaan_id}`}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
                      >
                        Edit
                      </Link>
                      {/* Tombol Hapus */}
                      <button
                        onClick={() => showConfirmationPopup(item.penyewaan_id)}
                        disabled={isDeleting}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
                      >
                        {isDeleting ? "Menghapus..." : "Hapus"}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Popup */}
      {showPopup && (
        <Popup
          onClose={() => setShowPopup(false)} // Tutup popup
          onDelete={handleDelete} // Hapus data
        />
      )}
    </div>
  );
};

export default RentalPage;
