"use client";
import Link from "next/link";
import { FaTrash } from "react-icons/fa"; // Import Trash Icon
import Popup from "@/app/portal/page";
import React from "react";
import {FaPencil} from "react-icons/fa6";

interface RentalViewProps {
    rentedItems: any[];
    pelangganMap: Map<number, any>;
    alatMap: Map<number, any>;
    penyewaanDetailMap: Map<number, any[]>;
    showPopup: boolean;
    setShowPopup: (state: boolean) => void;
    showConfirmationPopup: (id: number) => void;
    handleDelete: () => void;
}

<<<<<<< HEAD
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
  const { data: alatResponse, isLoading: isAlatLoading, isError: isAlatError } =
    useAlatGetQuery();

  // Mutation untuk menghapus data penyewaan
  const [deletePenyewaan, { isLoading: isDeleting }] =
    usePenyewaanDeleteMutation();

  // Handle penghapusan data penyewaan
  const handleDelete = async (id: number) => {
    if (!id) {
      setError("ID penyewaan tidak valid.");
      return;
    }

    try {
      console.log("Menghapus penyewaan dengan ID:", id);
      await deletePenyewaan(id).unwrap();
      console.log("Penyewaan berhasil dihapus");
      refetchPenyewaan(); // Muat ulang data penyewaan
    } catch (err: any) {
      console.error("Error saat menghapus penyewaan:", err);
      setError(err?.data?.message || "Gagal menghapus penyewaan.");
    }
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
          Gagal memuat data! Silakan coba lagi.
        </div>
      </div>
    );
  }

  // Data penyewaan, pelanggan, dan alat
  const rentedItems = penyewaanResponse?.data || [];
  const pelangganMap = new Map(
    pelangganResponse?.data?.map((p) => [p.pelanggan_id, p]) || []
  );
  const alatMap = new Map(alatResponse?.data?.map((a) => [a.alat_id, a]) || []);

  // Fungsi untuk menghitung jumlah harga
  const calculateTotalPrice = (
    hargaPerHari: number,
    tglPinjam: string,
    tglKembali: string
  ): number => {
=======
const calculateTotalPrice = (hargaPerHari: number, tglPinjam: string, tglKembali: string): number => {
>>>>>>> 5ca844feb509b5fa1853ada8c571546455895ef8
    const startDate = new Date(tglPinjam);
    const endDate = new Date(tglKembali);
    const dayDifference = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return hargaPerHari * dayDifference;
<<<<<<< HEAD
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
              <th className="py-4 px-6 text-left font-semibold">Status Pembayaran</th>
              <th className="py-4 px-6 text-left font-semibold">Tanggal Pinjam</th>
              <th className="py-4 px-6 text-left font-semibold">Tanggal Kembali</th>
              <th className="py-4 px-6 text-left font-semibold">Jumlah Harga</th>
              <th className="py-4 px-6 text-left font-semibold">Status Pengembalian</th>
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
                  <td className="py-4 px-6 border-b text-gray-700 font-medium">
                    {alat?.alat_nama || "-"}
                  </td>
                  <td className="py-4 px-6 border-b text-gray-700 font-medium">
                    {pelanggan?.pelanggan_nama || "-"}
                  </td>
                  <td className={`py-4 px-6 border-b font-medium ${item.status_pembayaran === "Lunas" ? "text-green-700" : "text-red-700"}`}>
                    {item.status_pembayaran || "-"}
                  </td>
                  <td className="py-4 px-6 border-b text-gray-700 font-medium">
                    {new Date(item.penyewaan_tglSewa).toLocaleDateString() || "-"}
                  </td>
                  <td className="py-4 px-6 border-b text-gray-700 font-medium">
                    {new Date(item.penyewaan_tglKembali).toLocaleDateString() || "-"}
                  </td>
                  <td className="py-4 px-6 border-b text-gray-700 font-medium">
                    Rp {totalHarga.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RentalPage;
=======
};

const getPaymentStatusClass = (status: string) => {
    switch (status) {
        case "Lunas":
            return "bg-green-100 text-green-700";
        case "Belum_Dibayar":
            return "bg-red-100 text-red-700";
        case "DP":
            return "bg-yellow-100 text-yellow-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
};

const getReturnStatusClass = (status: string) => {
    switch (status) {
        case "Belum_Kembali":
            return "bg-red-100 text-red-700 px-3 py-1";
        case "Sudah_Kembali":
            return "bg-green-100 text-green-700 px-3 py-1 ";
        default:
            return "bg-gray-100 text-gray-700 px-3 py-1";
    }
};

const RentalView = ({
                        rentedItems,
                        pelangganMap,
                        alatMap,
                        penyewaanDetailMap,
                        showPopup,
                        setShowPopup,
                        showConfirmationPopup,
                        handleDelete,
                    }: RentalViewProps) => {
    return (
        <div className="p-4 min-h-screen bg-gray-100 overflow-y-auto ml-64">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Barang yang Disewa</h1>
                <Link href="/admin/penyewaan/tambah" className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg shadow-md focus:ring-2 focus:ring-yellow-400">
                    Tambah Penyewaan
                </Link>
            </div>

            {/* Table */}
            <div className="overflow-hidden border border-gray-300 rounded-lg shadow-md bg-white">
                <table className="w-full border-collapse text-sm">
                    <thead className="bg-gradient-to-r from-blue-200 to-indigo-200 text-gray-800">
                    <tr>
                        <th className="py-2 px-3 text-left font-semibold border-b border-gray-300">Nama Barang</th>
                        <th className="py-2 px-3 text-left font-semibold border-b border-gray-300">Penyewa</th>
                        <th className="py-2 px-3 text-left font-semibold border-b border-gray-300">Status Pembayaran</th>
                        <th className="py-2 px-3 text-left font-semibold border-b border-gray-300">Tanggal Pinjam</th>
                        <th className="py-2 px-3 text-left font-semibold border-b border-gray-300">Tanggal Kembali</th>
                        <th className="py-2 px-3 text-left font-semibold border-b border-gray-300">Jumlah Harga</th>
                        <th className="py-2 px-3 text-left font-semibold border-b border-gray-300">Status Pengembalian</th>
                        <th className="py-2 px-3 text-center font-semibold border-b border-gray-300">Aksi</th>
                    </tr>
                    </thead>
                    <tbody className="text-gray-800">
                    {rentedItems?.map((item, index) => {
                        const pelanggan = pelangganMap.get(item.penyewaan_pelanggan_id);
                        const details = penyewaanDetailMap.get(item.penyewaan_id) || [];

                        return details.map((detail) => {
                            const alat = alatMap.get(Number(detail.penyewaan_detail_alat_id));
                            const alatNama = alat?.alat_nama || "-";
                            const totalHarga = calculateTotalPrice(alat?.alat_hargaPerHari || 0, item.penyewaan_tglSewa, item.penyewaan_tglKembali);

                            return (
                                <tr key={detail.penyewaan_detail_id} className={`border-b border-gray-300 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}>
                                    <td className="px-3 py-2">{alatNama}</td>
                                    <td className="px-3 py-2">{pelanggan?.pelanggan_nama || "-"}</td>
                                    <td className={`px-3 py-2 text-center font-medium  ${getPaymentStatusClass(item.status_pembayaran)}`}>
                                        {item.status_pembayaran.replace("_", " ")}
                                    </td>
                                    <td className="px-3 py-2">{new Date(item.penyewaan_tglSewa).toLocaleDateString() || "-"}</td>
                                    <td className="px-3 py-2">{new Date(item.penyewaan_tglKembali).toLocaleDateString() || "-"}</td>
                                    <td className="px-3 py-2">Rp {totalHarga.toLocaleString()}</td>
                                    <td className={`px-3 py-2 font-medium text-center ${getReturnStatusClass(item.status_pengembalian)}`}>
                                        {item.status_pengembalian.replace("_", " ")}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        <Link href={`/admin/penyewaan/update/${item.penyewaan_id}`}>
                                        <button
                                            className="p-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                                        >
                                            <FaPencil size={16} />
                                        </button>
                                        </Link>
                                        <button
                                            onClick={() => showConfirmationPopup(item.penyewaan_id)}
                                            className="p-2 text-red-600 hover:text-red-800 focus:outline-none"
                                        >
                                            <FaTrash size={16} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        });
                    })}
                    </tbody>
                </table>
            </div>

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            Yakin hendak menghapus penyewaan ini?
                        </h2>
                        <div className="flex justify-end">
                            <button
                                className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2 hover:bg-gray-600 transition duration-300 ease-in-out"
                                onClick={() => setShowPopup(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RentalView;
>>>>>>> 5ca844feb509b5fa1853ada8c571546455895ef8
