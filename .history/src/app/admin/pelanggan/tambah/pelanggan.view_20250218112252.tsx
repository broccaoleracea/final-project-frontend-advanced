"use client";
import { useState } from "react";
import { usePelangganPostMutation, usePelangganDataGetQuery } from "@/state/api/dataApi";

const RentalForm = () => {
  const [formData, setFormData] = useState({
    pelanggan_nama: "",
    pelanggan_alamat: "",
    pelanggan_noTelp: "",
    pelanggan_email: "",
    pelanggan_data_jenis: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Query untuk mendapatkan data jenis pelanggan
  const {
    data: jenisPelangganResponse,
    isLoading: isJenisLoading,
    isError: isJenisError,
  } = usePelangganDataGetQuery();

  // Mutation untuk menambahkan pelanggan baru
  const [createPelanggan, { isLoading: isCreating }] = usePelangganPostMutation();

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        {/* Judul Form */}
        <h2 className="text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
          FORM TAMBAH PELANGGAN
        </h2>

        {/* Pesan Error dan Sukses */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {successMessage && (
          <div className="text-green-500 text-sm mb-4">{successMessage}</div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Header Section */}
          <h3 className="text-2xl font-semibold mb-4 text-gray-700 border-b-2 pb-2 border-indigo-500">
            Tambah Data Pelanggan
          </h3>

          {/* Nama Pelanggan */}
          <div className="mb-6">
            <label htmlFor="pelanggan_nama" className="text-sm font-medium text-gray-600">
              Nama Pelanggan
            </label>
            <input
              type="text"
              id="pelanggan_nama"
              name="pelanggan_nama"
              value={formData.pelanggan_nama}
              onChange={handleChange}
              className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
              required
            />
          </div>

          {/* Alamat Pelanggan */}
          <div className="mb-6">
            <label htmlFor="pelanggan_alamat" className="text-sm font-medium text-gray-600">
              Alamat
            </label>
            <textarea
              id="pelanggan_alamat"
              name="pelanggan_alamat"
              value={formData.pelanggan_alamat}
              onChange={handleChange}
              className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
            />
          </div>

          {/* Nomor Telepon Pelanggan */}
          <div className="mb-6">
            <label htmlFor="pelanggan_noTelp" className="text-sm font-medium text-gray-600">
              Nomor Telepon
            </label>
            <input
              type="number"
              id="pelanggan_noTelp"
              name="pelanggan_noTelp"
              value={formData.pelanggan_noTelp}
              onChange={handleChange}
              className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
              required
            />
          </div>

          {/* Email Pelanggan */}
          <div className="mb-6">
            <label htmlFor="pelanggan_email" className="text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="pelanggan_email"
              name="pelanggan_email"
              value={formData.pelanggan_email}
              onChange={handleChange}
              className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
              required
            />
          </div>

          {/* Jenis Pelanggan (Dropdown) */}
          <div className="mb-6">
            <label htmlFor="pelanggan_data_jenis" className="text-sm font-medium text-gray-600">
              Jenis Pelanggan
            </label>
            {isJenisLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-indigo-500"></div>
            ) : isJenisError ? (
              <div className="text-red-500">Gagal memuat data jenis pelanggan.</div>
            ) : (
              <select
                id="pelanggan_data_jenis"
                name="pelanggan_data_jenis"
                value={formData.pelanggan_data_jenis}
                onChange={handleChange}
                className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
                required
              >
                <option value="">Pilih Jenis Pelanggan</option>
                {jenisPelangganResponse?.data?.map((jenis) => (
                  <option key={jenis.pelanggan_id} value={jenis.pelanggan_data_id}>
                    {jenis.nama}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <button
              type="button"
              className="px-8 py-4 rounded-lg text-lg font-medium bg-gray-300 hover:bg-gray-400 transition duration-300 mr-4 shadow-md"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={isCreating}
              className="px-8 py-4 rounded-lg text-lg font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-indigo-600 hover:to-blue-600 transition duration-300 shadow-md"
            >
              {isCreating ? "Menambahkan..." : "Tambah Pelanggan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RentalForm;