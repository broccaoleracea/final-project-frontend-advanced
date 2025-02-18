"use client";
import { useState } from "react";

const RentalForm = () => {
  const [formData, setFormData] = useState({
    nama: "",
    nomorTelepon: "",
    email: "",
    alamat: "",
    kota: "",
    provinsi: "",
    kodePos: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
      if (!formData.nama || !formData.nomorTelepon || !formData.email) {
        setError("Nama, nomor telepon, dan email harus diisi.");
        return;
      }

      // Handle form submission logic here, e.g., send data to API

      // Reset form after successful submission
      setFormData({
        nama: "",
        nomorTelepon: "",
        email: "",
        alamat: "",
        kota: "",
        provinsi: "",
        kodePos: "",
      });

      setSuccessMessage("Data penyewa berhasil diperbarui!");
    } catch (err: any) {
      console.error("Error saat mengupdate data:", err);
      setError("Gagal memperbarui data penyewa.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h2 className="text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
          FORM PELANGGAN
        </h2>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {successMessage && (
          <div className="text-green-500 text-sm mb-4">{successMessage}</div>
        )}
        <form onSubmit={handleSubmit}>
          {/* Penyewa Section */}
          <h3 className="text-2xl font-semibold mb-4 text-gray-700 border-b-2 pb-2 border-indigo-500">Penyewa</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="relative">
              <label className="text-sm font-medium text-gray-600">Nama</label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
                required
              />
            </div>
            <div className="relative">
              <label className="text-sm font-medium text-gray-600">Nomor Telepon</label>
              <input
                type="text"
                name="nomorTelepon"
                value={formData.nomorTelepon}
                onChange={handleChange}
                className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
                required
              />
            </div>
            <div className="relative">
              <label className="text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
                required
              />
            </div>
          </div>

          {/* Alamat Section */}
          <h3 className="text-2xl font-semibold mb-4 text-gray-700 border-b-2 pb-2 border-indigo-500">Alamat</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="relative">
              <label className="text-sm font-medium text-gray-600">Alamat</label>
              <input
                type="text"
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
                className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
              />
            </div>
            <div className="relative">
              <label className="text-sm font-medium text-gray-600">Kota</label>
              <input
                type="text"
                name="kota"
                value={formData.kota}
                onChange={handleChange}
                className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
              />
            </div>
            <div className="relative">
              <label className="text-sm font-medium text-gray-600">Provinsi</label>
              <input
                type="text"
                name="provinsi"
                value={formData.provinsi}
                onChange={handleChange}
                className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
              />
            </div>
            <div className="relative">
              <label className="text-sm font-medium text-gray-600">Kode POS</label>
              <input
                type="text"
                name="kodePos"
                value={formData.kodePos}
                onChange={handleChange}
                className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
              />
            </div>
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
              className="px-8 py-4 rounded-lg text-lg font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-indigo-600 hover:to-blue-600 transition duration-300 shadow-md"
            >
              UPDATE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RentalForm;
