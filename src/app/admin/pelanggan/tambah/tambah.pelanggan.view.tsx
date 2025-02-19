"use client";
import React from "react";

interface TambahPelangganProps {
  formData: {
    pelanggan_nama: string;
    pelanggan_alamat: string;
    pelanggan_noTelp: string;
    pelanggan_email: string;
  };
  selectedJenis: string;
  file: File | null;
  error: string;
  successMessage: string;
  jenisPelangganOptions: { id: string; nama: string }[];
  isAdding: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onJenisChange: (value: string) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const TambahPelanggan: React.FC<TambahPelangganProps> = ({
                                                           formData,
                                                           selectedJenis,
                                                           file,
                                                           error,
                                                           successMessage,
                                                           jenisPelangganOptions,
                                                           isAdding,
                                                           onChange,
                                                           onJenisChange,
                                                           onFileChange,
                                                           onSubmit,
                                                         }) => {
  return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
          <h2 className="text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
            FORM TAMBAH PELANGGAN
          </h2>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          {successMessage && <div className="text-green-500 text-sm mb-4">{successMessage}</div>}

          <form onSubmit={onSubmit}>
            <h3 className="text-2xl font-semibold mb-4 text-gray-700 border-b-2 pb-2 border-indigo-500">
              Data Pelanggan
            </h3>

            <div className="mb-6">
              <label className="text-sm font-medium text-gray-600">Nama Pelanggan</label>
              <input type="text" name="pelanggan_nama" value={formData.pelanggan_nama} onChange={onChange} className="p-4 border rounded-lg w-full bg-gray-100" required />
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium text-gray-600">Alamat</label>
              <textarea name="pelanggan_alamat" value={formData.pelanggan_alamat} onChange={onChange} className="p-4 border rounded-lg w-full bg-gray-100" required />
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium text-gray-600">Nomor Telepon</label>
              <input type="number" name="pelanggan_noTelp" value={formData.pelanggan_noTelp} onChange={onChange} className="p-4 border rounded-lg w-full bg-gray-100" required />
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium text-gray-600">Email</label>
              <input type="email" name="pelanggan_email" value={formData.pelanggan_email} onChange={onChange} className="p-4 border rounded-lg w-full bg-gray-100" required />
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium text-gray-600">Jenis Data Pelanggan</label>
              <select value={selectedJenis} onChange={(e) => onJenisChange(e.target.value)} className="p-4 border rounded-lg w-full bg-gray-100" required>
                <option value="" disabled>Pilih Jenis Pelanggan</option>
                {jenisPelangganOptions.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium text-gray-600">Unggah File</label>
              <input type="file" onChange={onFileChange} className="block w-full border rounded-md shadow-sm bg-gray-100" required />
            </div>

            

            <div className="flex justify-end mt-6">
              <button type="submit" disabled={isAdding} className="px-8 py-4 rounded-lg text-lg font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                {isAdding ? "Menambahkan..." : "Tambah Pelanggan"}
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default TambahPelanggan;
