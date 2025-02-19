"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  usePenyewaanGetQuery,
  usePenyewaanPatchMutation,
} from "@/state/api/dataApi";

interface UpdateViewProps {
  id: number;
}

const UpdateView = ({ id }: UpdateViewProps) => {
  const [formData, setFormData] = useState({
    penyewaan_tglSewa: "",
    penyewaan_tglKembali: "",
    status_pembayaran: "",
    status_pengembalian: "",
  });

  const [error, setError] = useState("");
  const { data: penyewaanData, isLoading: isPenyewaanLoading } =
    usePenyewaanGetQuery(id);
  const [updatePenyewaan, { isLoading: isUpdating }] = usePenyewaanPatchMutation();

  // Populate form data when data is loaded
  useEffect(() => {
    if (penyewaanData && !isPenyewaanLoading) {
      const { penyewaan_tglSewa, penyewaan_tglKembali, status_pembayaran, status_pengembalian } =
        penyewaanData.data || {};
      setFormData({
        penyewaan_tglSewa: penyewaan_tglSewa || "",
        penyewaan_tglKembali: penyewaan_tglKembali || "",
        status_pembayaran: status_pembayaran || "",
        status_pengembalian: status_pengembalian || "",
      });
    }
  }, [penyewaanData, isPenyewaanLoading]); // Jalankan hanya jika data berubah

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePenyewaan({ id, ...formData }).unwrap();
      alert("Data berhasil diperbarui!");
    } catch (err: any) {
      console.error("Error saat memperbarui data:", err);
      setError(err?.data?.message || "Gagal memperbarui data.");
    }
  };

  if (isPenyewaanLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 min-h-screen bg-gray-100 ml-80">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Penyewaan</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        {/* Tanggal Pinjam */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Tanggal Pinjam
          </label>
          <input
            type="date"
            name="penyewaan_tglSewa"
            value={formData.penyewaan_tglSewa}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Tanggal Kembali */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Tanggal Kembali
          </label>
          <input
            type="date"
            name="penyewaan_tglKembali"
            value={formData.penyewaan_tglKembali}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Status Pembayaran */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Status Pembayaran
          </label>
          <select
            name="status_pembayaran"
            value={formData.status_pembayaran}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Pilih Status</option>
            <option value="Lunas">Lunas</option>
            <option value="Belum Lunas">Belum Lunas</option>
          </select>
        </div>

        {/* Status Pengembalian */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Status Pengembalian
          </label>
          <select
            name="status_pengembalian"
            value={formData.status_pengembalian}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Pilih Status</option>
            <option value="Dikembalikan">Dikembalikan</option>
            <option value="Belum Dikembalikan">Belum Dikembalikan</option>
          </select>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isUpdating}
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out"
          >
            {isUpdating ? "Memperbarui..." : "Simpan"}
          </button>
          <Link
            href="/admin/penyewaan"
            className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-300 ease-in-out"
          >
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UpdateView;