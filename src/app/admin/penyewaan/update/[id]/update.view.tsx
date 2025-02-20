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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-yellow-500 border-t-transparent"></div>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
          {/* Title */}
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Form Update Penyewaan
          </h2>

          {/* Error Message */}
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Data Penyewaan Section */}
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
              Data Penyewaan
            </h3>

            {/* Tanggal Pinjam */}
            <div className="mb-4">
              <label className="text-sm text-gray-600">Tanggal Pinjam</label>
              <input
                  type="date"
                  name="penyewaan_tglSewa"
                  value={formData.penyewaan_tglSewa}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-400 focus:border-yellow-400 text-sm"
                  required
              />
            </div>

            {/* Tanggal Kembali */}
            <div className="mb-4">
              <label className="text-sm text-gray-600">Tanggal Kembali</label>
              <input
                  type="date"
                  name="penyewaan_tglKembali"
                  value={formData.penyewaan_tglKembali}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-400 focus:border-yellow-400 text-sm"
                  required
              />
            </div>

            {/* Status Pembayaran */}
            <div className="mb-4">
              <label className="text-sm text-gray-600">Status Pembayaran</label>
              <select
                  name="status_Pembayaran"
                  value={formData.status_Pembayaran}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-400 focus:border-yellow-400 text-sm bg-white"
                  required
              >
                <option value="" disabled>Pilih Status</option>
                <option value="Lunas">Lunas</option>
                <option value="Belum_Dibayar">Belum Lunas</option>
              </select>
            </div>

            {/* Status Pengembalian */}
            <div className="mb-4">
              <label className="text-sm text-gray-600">Status Pengembalian</label>
              <select
                  name="status_Pengembalian"
                  value={formData.status_Pengembalian}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-400 focus:border-yellow-400 text-sm bg-white"
                  required
              >
                <option value="" disabled>Pilih Status</option>
                <option value="Sudah_Kembali">Dikembalikan</option>
                <option value="Belum_Kembali">Belum Dikembalikan</option>
              </select>
            </div>

            {/* Total Harga */}
            <div className="mb-4">
              <label className="text-sm text-gray-600">Total Harga</label>
              <input
                  type="number"
                  name="penyewaan_totalHarga"
                  value={formData.penyewaan_totalHarga}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-400 focus:border-yellow-400 text-sm"
                  required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end mt-6 gap-4">
              <Link
                  href="/admin/penyewaan"
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-500 text-white hover:bg-gray-600 transition"
              >
                Batal
              </Link>
              <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-yellow-400 text-white hover:bg-yellow-500 transition"
              >
                {isUpdating ? "Memperbarui..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default UpdateView;
