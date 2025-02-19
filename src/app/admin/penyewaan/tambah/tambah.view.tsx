"use client";
import React from "react";

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
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleDetailChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
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
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500"></div>
      </div>
    );
  }

  if (isPelangganError) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-red-600 text-lg font-semibold">Gagal memuat data pelanggan!</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        {/* Judul Form */}
        <h2 className="text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
          FORM TAMBAH PENYEWAAN
        </h2>

        {/* Pesan Error atau Sukses */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {successMessage && <div className="text-green-500 text-sm mb-4">{successMessage}</div>}

        {/* Form Utama */}
        <form onSubmit={handleSubmit}>
          {/* Header Data Penyewaan */}
          <h3 className="text-2xl font-semibold mb-4 text-gray-700 border-b-2 pb-2 border-indigo-500">
            Data Penyewaan
          </h3>

          {/* Pilih Pelanggan */}
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-600">Pilih Pelanggan</label>
            <select
              name="penyewaan_pelanggan_id"
              onChange={handleChange}
              className="p-4 border rounded-lg w-full bg-gray-100"
              required
            >
              <option value="">Pilih Pelanggan</option>
              {pelangganOptions.map((pelanggan) => (
                <option key={pelanggan.pelanggan_id} value={pelanggan.pelanggan_id}>
                  {pelanggan.pelanggan_nama}
                </option>
              ))}
            </select>
          </div>

          {/* Tanggal Sewa */}
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-600">Tanggal Sewa</label>
            <input
              type="date"
              name="penyewaan_tglSewa"
              value={formData.penyewaan_tglSewa}
              onChange={handleChange}
              className="p-4 border rounded-lg w-full bg-gray-100"
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
              className="p-4 border rounded-lg w-full bg-gray-100"
              required
            />
          </div>

          {/* Header Detail Penyewaan */}
          <h3 className="text-2xl font-semibold mb-4 text-gray-700 border-b-2 pb-2 border-indigo-500">
            Detail Penyewaan
          </h3>

          {/* Pilih Alat */}
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-600">Pilih Alat</label>
            <select
              name="penyewaan_detail_alat_id"
              onChange={handleDetailChange}
              className="p-4 border rounded-lg w-full bg-gray-100"
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
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-600">Jumlah yang Disewa</label>
            <input
              type="number"
              name="penyewaan_detail_jumlah"
              value={detailData.penyewaan_detail_jumlah}
              onChange={handleDetailChange}
              className="p-4 border rounded-lg w-full bg-gray-100"
              required
            />
          </div>

          {/* Tombol Submit */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-4 rounded-lg text-lg font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
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