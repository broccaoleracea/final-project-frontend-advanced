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
      <div className="p-4 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">FORM TAMBAH PENYEWAAN</h1>

        {error && <p className="text-red-600">{error}</p>}
        {successMessage && <p className="text-green-600">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Data Penyewaan</h2>

          <div className="mb-4">
            <label className="block font-medium mb-2">Pilih Pelanggan</label>
            <select name="penyewaan_pelanggan_id" onChange={handleChange} className="p-4 border rounded-lg w-full" required>
              <option value="">Pilih Pelanggan</option>
              {pelangganOptions.map((pelanggan) => (
                  <option key={pelanggan.pelanggan_id} value={pelanggan.pelanggan_id}>
                    {pelanggan.pelanggan_nama}
                  </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Tanggal Sewa</label>
            <input type="date" name="penyewaan_tglSewa" value={formData.penyewaan_tglSewa} onChange={handleChange} className="p-4 border rounded-lg w-full" required />
          </div><div className="mb-4">
            <label className="block font-medium mb-2">Tanggal Kembali</label>
            <input type="date" name="penyewaan_tglKembali" value={formData.penyewaan_tglKembali} onChange={handleChange} className="p-4 border rounded-lg w-full" required />
        </div>

          <h2 className="text-xl font-semibold mb-4">Detail Penyewaan</h2>

          <div className="mb-4">
            <label className="block font-medium mb-2">Pilih Alat</label>
            <select name="penyewaan_detail_alat_id" onChange={handleDetailChange} className="p-4 border rounded-lg w-full" required>
              <option value="">Pilih Alat</option>
              {alatOptions.map((alat) => (
                  <option key={alat.alat_id} value={alat.alat_id}>
                    {alat.alat_nama}
                  </option>
              ))}
            </select>
          </div>
            <div className="mb-4">
                <label className="block font-medium mb-2">Jumlah yang disewa :</label>
                <input type={"text"} name="penyewaan_detail_jumlah" onChange={handleDetailChange} className="p-4 border rounded-lg w-full" required>
                    
                </input>
            </div>

          <button type="submit" disabled={isSubmitting} className="px-6 py-3 bg-indigo-500 text-white font-semibold rounded-lg shadow-md">
            {isSubmitting ? "Menambahkan..." : "Tambah Penyewaan"}
          </button>
        </form>
      </div>
  );
};

export default TambahPenyewaanView;
