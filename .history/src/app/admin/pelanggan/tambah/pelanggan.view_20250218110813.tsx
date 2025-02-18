"use client";
import { useState } from "react";
import {
  usePelangganPostMutation,
  usePelangganDataPostMutation,
  usePelangganDataGetQuery,
} from "@/state/api/dataApi";

const RentalForm = () => {
  // State untuk form data pelanggan
  const [formData, setFormData] = useState({
    pelanggan_nama: "",
    pelanggan_alamat: "",
    pelanggan_noTelp: "",
    pelanggan_email: "",
  });

  // State untuk file upload
  const [file, setFile] = useState<File | null>(null);

  // State untuk dropdown jenis pelanggan
  const [selectedJenis, setSelectedJenis] = useState("");

  // State untuk error dan success message
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Mutation untuk menambahkan pelanggan
  const [addPelanggan, { isLoading: isAdding }] = usePelangganPostMutation();

  // Mutation untuk menambahkan data pelanggan (jenis dan file)
  const [addPelangganData, { isLoading: isAddingData }] = usePelangganDataPostMutation();

  // Query untuk mendapatkan data jenis pelanggan untuk dropdown
  const {
    data: jenisResponse,
    isLoading: isJenisLoading,
    isError: isJenisError,
  } = usePelangganDataGetQuery();

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Handle form submission untuk menambahkan pelanggan
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(""); // Reset error message
      setSuccessMessage(""); // Reset success message

      // Validasi input
      if (!formData.pelanggan_nama || !formData.pelanggan_noTelp || !formData.pelanggan_email) {
        setError("Nama, nomor telepon, dan email harus diisi.");
        return;
      }

      // Validasi nomor telepon (hanya angka)
      if (!/^\d+$/.test(formData.pelanggan_noTelp)) {
        setError("Nomor telepon harus berupa angka.");
        return;
      }

      // Validasi email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.pelanggan_email)) {
        setError("Format email tidak valid.");
        return;
      }

      // Kirim data pelanggan ke API menggunakan mutation
      await addPelanggan(formData).unwrap();

      // Tampilkan pesan sukses
      setSuccessMessage("Pelanggan berhasil ditambahkan!");

      // Reset form setelah berhasil
      setFormData({
        pelanggan_nama: "",
        pelanggan_alamat: "",
        pelanggan_noTelp: "",
        pelanggan_email: "",
      });
    } catch (err: any) {
      console.error("Error saat menambahkan pelanggan:", err);
      setError(err?.data?.message || "Gagal menambahkan pelanggan.");
    }
  };

  // Handle form submission untuk menambahkan data pelanggan (jenis dan file)
  const handleDataSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(""); // Reset error message
      setSuccessMessage(""); // Reset success message

      // Validasi input
      if (!selectedJenis || !file) {
        setError("Jenis pelanggan dan file harus diisi.");
        return;
      }

      // Buat FormData untuk pengiriman
      const toSubmit = new FormData();
      toSubmit.append("pelanggan_data_jenis", selectedJenis);
      toSubmit.append("pelanggan_data_file", file);

      console.log("FormData:", toSubmit);

      // Kirim data ke API menggunakan mutation
      await addPelangganData(toSubmit).unwrap();

      // Tampilkan pesan sukses
      setSuccessMessage("Data pelanggan berhasil ditambahkan!");

      // Reset form setelah berhasil
      setSelectedJenis("");
      setFile(null);
    } catch (err: any) {
      console.error("Error saat menambahkan data pelanggan:", err);
      setError(err?.data?.message || "Gagal menambahkan data pelanggan.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h2 className="text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
          TAMBAH PELANGGAN
        </h2>

        {/* Error and Success Messages */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {successMessage && (
          <div className="text-green-500 text-sm mb-4">{successMessage}</div>
        )}

        {/* Form untuk menambahkan pelanggan */}
        <form onSubmit={handleSubmit}>
          <h3 className="text-2xl font-semibold mb-4 text-gray-700 border-b-2 pb-2 border-indigo-500">
            Data Pelanggan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Nama Pelanggan */}
            <div className="relative">
              <label className="text-sm font-medium text-gray-600">Nama</label>
              <input
                type="text"
                name="pelanggan_nama"
                value={formData.pelanggan_nama}
                onChange={handleChange}
                className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
                required
              />
            </div>
            {/* Nomor Telepon Pelanggan */}
            <div className="relative">
              <label className="text-sm font-medium text-gray-600">Nomor Telepon</label>
              <input
                type="number"
                name="pelanggan_noTelp"
                value={formData.pelanggan_noTelp}
                onChange={handleChange}
                className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
                required
              />
            </div>
            {/* Email Pelanggan */}
            <div className="relative">
              <label className="text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                name="pelanggan_email"
                value={formData.pelanggan_email}
                onChange={handleChange}
                className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
                required
              />
            </div>
            {/* Alamat Pelanggan */}
            <div className="relative">
              <label className="text-sm font-medium text-gray-600">Alamat</label>
              <input
                type="text"
                name="pelanggan_alamat"
                value={formData.pelanggan_alamat}
                onChange={handleChange}
                className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
              />
            </div>
          </div>
          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={isAdding}
              className="px-8 py-4 rounded-lg text-lg font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-indigo-600 hover:to-blue-600 transition duration-300 shadow-md"
            >
              {isAdding ? "Menambahkan..." : "SIMPAN"}
            </button>
          </div>
        </form>

        {/* Form untuk menambahkan data pelanggan (jenis dan file) */}
        <form onSubmit={handleDataSubmit} className="mt-8">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700 border-b-2 pb-2 border-indigo-500">
            Data Tambahan Pelanggan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Dropdown untuk memilih jenis pelanggan */}
            <div className="relative">
              <label className="text-sm font-medium text-gray-600">Jenis Pelanggan</label>
              {isJenisLoading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-indigo-500"></div>
              ) : isJenisError ? (
                <div className="text-red-500">Gagal memuat data jenis pelanggan.</div>
              ) : (
                <select
                  value={selectedJenis}
                  onChange={(e) => setSelectedJenis(e.target.value)}
                  className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
                  required
                >
                  <option value="">Pilih Jenis Pelanggan</option>
                  {jenisResponse?.data?.map((jenis) => (
                    <option key={jenis.pelanggan_data_id} value={jenis.pelanggan_data_id}>
                      {jenis.nama}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Input File */}
            <div className="relative">
              <label className="text-sm font-medium text-gray-600">Unggah File</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
          </div>
          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={isAddingData}
              className="px-8 py-4 rounded-lg text-lg font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-indigo-600 hover:to-blue-600 transition duration-300 shadow-md"
            >
              {isAddingData ? "Menambahkan..." : "SIMPAN"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RentalForm;