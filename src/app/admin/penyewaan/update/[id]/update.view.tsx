"use client";
import Link from "next/link";
import React from "react";

interface FormData {
  penyewaan_tglSewa: string;
  penyewaan_tglKembali: string;
  status_Pembayaran: string;
  status_Pengembalian: string;
  penyewaan_pelanggan_id: number;
  penyewaan_totalHarga: number;
}

interface UpdateViewProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isUpdating: boolean;
  isPenyewaanLoading: boolean;
  error: string;
}

const UpdateView: React.FC<UpdateViewProps> = ({
  formData,
  handleChange,
  handleSubmit,
  isUpdating,
  isPenyewaanLoading,
  error,
}) => {
  if (isPenyewaanLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      {/* Container Form */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        {/* Judul Form */}
        <h2 className="text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
          FORM EDIT PENYEWAAN
        </h2>

        {/* Pesan Error atau Sukses */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        {/* Form Utama */}
        <form onSubmit={handleSubmit}>
          {/* Header Data Penyewaan */}
          <h3 className="text-2xl font-semibold mb-4 text-gray-700 border-b-2 pb-2 border-indigo-500">
            Data Penyewaan
          </h3>

          {/* Tanggal Pinjam */}
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-600">Tanggal Pinjam</label>
            <input
              type="date"
              name="penyewaan_tglSewa"
              value={formData.penyewaan_tglSewa}
              onChange={handleChange}
              className="p-4 border rounded-lg w-full bg-gray-100 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Tanggal Kembali */}
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-600">Tanggal Kembali</label>
            <input
              type="date"
              name="penyewaan_tglKembali"
              value={formData.penyewaan_tglKembali}
              onChange={handleChange}
              className="p-4 border rounded-lg w-full bg-gray-100 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Status Pembayaran */}
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-600">Status Pembayaran</label>
            <select
              name="status_Pembayaran"
              value={formData.status_Pembayaran}
              onChange={handleChange}
              className="p-4 border rounded-lg w-full bg-gray-100 focus:outline-none focus:border-blue-500"
              required
            >
              <option value="" disabled>Pilih Status</option>
              <option value="Lunas">Lunas</option>
              <option value="Belum_Dibayar">Belum Lunas</option>
            </select>
          </div>

          {/* Status Pengembalian */}
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-600">Status Pengembalian</label>
            <select
              name="status_Pengembalian"
              value={formData.status_Pengembalian}
              onChange={handleChange}
              className="p-4 border rounded-lg w-full bg-gray-100 focus:outline-none focus:border-blue-500"
              required
            >
              <option value="" disabled>Pilih Status</option>
              <option value="Sudah_Kembali">Dikembalikan</option>
              <option value="Belum_Kembali">Belum Dikembalikan</option>
            </select>
          </div>

          {/* Total Harga */}
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-600">Total Harga</label>
            <input
              type="number"
              name="penyewaan_totalHarga"
              value={formData.penyewaan_totalHarga}
              onChange={handleChange}
              className="p-4 border rounded-lg w-full bg-gray-100 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end mt-6 gap-4">
            <button
              type="submit"
              disabled={isUpdating}
              className="px-8 py-4 rounded-lg text-lg font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:bg-gradient-to-r hover:from-blue-700 hover:to-indigo-700 transition duration-300 ease-in-out"
            >
              {isUpdating ? "Memperbarui..." : "Simpan"}
            </button>
            <Link
              href="/admin/penyewaan"
              className="px-8 py-4 rounded-lg text-lg font-medium bg-gray-500 text-white hover:bg-gray-600 transition duration-300 ease-in-out"
            >
              Batal
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateView;