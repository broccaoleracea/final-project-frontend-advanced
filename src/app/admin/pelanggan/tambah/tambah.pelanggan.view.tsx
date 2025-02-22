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
  jenisPelangganOptions: string[];
  isAdding: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onJenisChange: (value: string) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
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
          <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-4xl border border-gray-300">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Tambah Pelanggan </h1>

          {error && <p className="text-sm text-red-500">{error}</p>}
          {successMessage && <p className="text-sm text-green-500">{successMessage}</p>}

          <form onSubmit={onSubmit}>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Data Pelanggan</h2>

              <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Nama Pelanggan</label>
                  <input
                      type="text"
                      name="pelanggan_nama"
                      value={formData.pelanggan_nama}
                      onChange={onChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:border-yellow-400 focus:ring-yellow-400 placeholder-gray-400 text-sm"
                      required
                  />
              </div>

              <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Alamat</label>
                  <textarea
                      name="pelanggan_alamat"
                      value={formData.pelanggan_alamat}
                      onChange={onChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:border-yellow-400 focus:ring-yellow-400 placeholder-gray-400 text-sm"
                      required
                  />
              </div>

              <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
                  <input
                      type="number"
                      name="pelanggan_noTelp"
                      value={formData.pelanggan_noTelp}
                      onChange={onChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:border-yellow-400 focus:ring-yellow-400 placeholder-gray-400 text-sm"
                      required
                  />
              </div>

              <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                      type="email"
                      name="pelanggan_email"
                      value={formData.pelanggan_email}
                      onChange={onChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:border-yellow-400 focus:ring-yellow-400 placeholder-gray-400 text-sm"
                      required
                  />
              </div>

              <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Jenis Data Pelanggan</label>
                  <select
                      value={selectedJenis}
                      onChange={(e) => onJenisChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:border-yellow-400 focus:ring-yellow-400 text-sm"
                      required
                  >
                      <option value="" disabled>
                          Pilih Jenis Pelanggan
                      </option>
                      {jenisPelangganOptions.map((item, index) => (
                          <option key={index} value={item}>
                              {item}
                          </option>
                      ))}
                  </select>
              </div>

              <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Unggah File</label>
                  <input
                      type="file"
                      onChange={onFileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:border-yellow-400 focus:ring-yellow-400 text-sm"
                      required
                  />
              </div>

              <button
                  type="submit"
                  disabled={isAdding}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-400 text-white px-3 py-2 rounded text-sm disabled:opacity-50"
              >
                  {isAdding ? "Menambahkan..." : "Tambah Pelanggan"}
              </button>
          </form>
      </div>
      </div>

  );
};

export default TambahPelanggan;
