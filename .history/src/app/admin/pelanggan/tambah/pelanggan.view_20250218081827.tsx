"use client";
import { useState } from "react";
import { usePelangganDataPostMutation } from "@/state/api/dataApi";

const RentalForm = () => {
  const [formData, setFormData] = useState({
    pelanggan_nama: "",
    pelanggan_alamat: "",
    pelanggan_noTelp: 0,
    pelanggan_email: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Mutation untuk menambahkan pelanggan
  const [addPelanggan, { isLoading: isAdding }] = usePelangganPostMutation();

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
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

      // Kirim data ke API menggunakan mutation
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

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
          TAMBAH PELANGGAN
        </h2>

        {/* Error and Success Messages */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {successMessage && (
          <div className="text-green-500 text-sm mb-4">{successMessage}</div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Nama Pelanggan */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Nama</label>
            <input
              type="text"
              name="pelanggan_nama"
              value={formData.pelanggan_nama}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Alamat Pelanggan */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Alamat</label>
            <input
              type="text"
              name="pelanggan_alamat"
              value={formData.pelanggan_alamat}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Nomor Telepon Pelanggan */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Nomor Telepon</label>
            <input
              type="text"
              name="pelanggan_noTelp"
              value={formData.pelanggan_noTelp}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Email Pelanggan */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="pelanggan_email"
              value={formData.pelanggan_email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={isAdding}
              className="px-6 py-3 rounded-lg text-lg font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-indigo-600 hover:to-blue-600 transition duration-300 shadow-md"
            >
              {isAdding ? "Menambahkan..." : "SIMPAN"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RentalForm;