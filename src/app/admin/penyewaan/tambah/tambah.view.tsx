"use client";
import React from "react";
import FullPageSpinner from "@/Components/Spinner/FullPageSpinner";

interface TambahPenyewaanViewProps {
  formData: any;
  detailData: any;
  error: string;
  successMessage: string;
  isLoading: boolean;
  isPelangganError: boolean;
  isSubmitting: boolean;
  alatOptions: { alat_id: number; alat_nama: string }[];
  pelangganOptions: { pelanggan_id: number; pelanggan_nama: string }[];
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleDetailChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const TambahPenyewaanView: React.FC<TambahPenyewaanViewProps> = ({
  formData,
  detailData,
  error,
  successMessage,
  isLoading,
  isPelangganError,
  isSubmitting,
  alatOptions,
  pelangganOptions,
  handleChange,
  handleDetailChange,
  handleSubmit,
}) => {
  if (isLoading) {
    return (
      <FullPageSpinner/>
    );
  }

  // Error state
  if (isPelangganError) {
    throw new Error("gagal memuat daya!")
  }

  return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl border border-gray-300">
        {/* Judul Form */}
        <h2 className="text-2xl font-bold  mb-2 text-gray-800">
          Form Tambah Penyewaan
        </h2>

        {/* Pesan Error atau Sukses */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {successMessage && (
          <div className="text-green-500 text-sm mb-4">{successMessage}</div>
        )}

        {/* Form Utama */}
        <form onSubmit={handleSubmit}>
          {/* Header Data Penyewaan */}
          <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2 border-gray-300">
            Data Penyewaan
          </h3>

          {/* Pilih Pelanggan */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-600">
              Pilih Pelanggan
            </label>
            <select
              name="penyewaan_pelanggan_id"
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-md w-full text-sm focus:border-yellow-400 focus:ring-yellow-400"
              required
            >
              <option value="">Pilih Pelanggan</option>
              {pelangganOptions.map((pelanggan) => (
                <option
                  key={pelanggan.pelanggan_id}
                  value={pelanggan.pelanggan_id}
                >
                  {pelanggan.pelanggan_nama}
                </option>
              ))}
            </select>
          </div>

          {/* Tanggal Sewa */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-600">
              Tanggal Sewa
            </label>
            <input
              type="date"
              name="penyewaan_tglSewa"
              value={formData.penyewaan_tglSewa}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-md w-full text-sm focus:border-yellow-400 focus:ring-yellow-400"
              required
            />
          </div>

          {/* Tanggal Kembali */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-600">
              Tanggal Kembali
            </label>
            <input
              type="date"
              name="penyewaan_tglKembali"
              value={formData.penyewaan_tglKembali}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-md w-full text-sm focus:border-yellow-400 focus:ring-yellow-400"
              required
            />
          </div>

          {/* Header Detail Penyewaan */}
          <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2 border-gray-300">
            Detail Penyewaan
          </h3>

          {/* Pilih Alat */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-600">
              Pilih Alat
            </label>
            <select
              name="penyewaan_detail_alat_id"
              onChange={handleDetailChange}
              className="px-3 py-2 border border-gray-300 rounded-md w-full text-sm focus:border-yellow-400 focus:ring-yellow-400"
              required
            >
              <option value="">Pilih Alat</option>
              {alatOptions.map((alat) => (
                <option key={alat.alat_id} value={alat.alat_id}>
                  {alat.alat_nama}
                </option>
              ))}
            </select>
          </div>

          {/* Jumlah Alat */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-600">
              Jumlah yang Disewa
            </label>
            <input
              type="number"
              name="penyewaan_detail_jumlah"
              value={detailData.penyewaan_detail_jumlah}
              onChange={handleDetailChange}
              className="px-3 py-2 border border-gray-300 rounded-md w-full text-sm focus:border-yellow-400 focus:ring-yellow-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-600">Sub Harga</label>
            <input
                type="number"
                name="penyewaan_detail_subHarga"
                value={detailData.penyewaan_detail_subHarga}
                onChange={handleDetailChange}
                className="px-3 py-2 border border-gray-300 rounded-md w-full text-sm focus:border-yellow-400 focus:ring-yellow-400"
                required
            />
          </div>

          {/* Tombol Submit */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded-md text-sm font-medium bg-yellow-400 hover:bg-yellow-500 text-white focus:ring-2 focus:ring-yellow-400 transition"
            >
              {isSubmitting ? "Menambahkan..." : "Tambah Penyewaan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahPenyewaanView;
