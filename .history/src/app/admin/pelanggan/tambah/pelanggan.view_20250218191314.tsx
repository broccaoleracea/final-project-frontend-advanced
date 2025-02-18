"use client";
import { useState } from "react";
import {
  usePelangganPostMutation,
  usePelangganDataPostMutation,
} from "@/state/api/dataApi";

const TambahPelanggan = () => {
  const [formData, setFormData] = useState({
    pelanggan_nama: "",
    pelanggan_alamat: "",
    pelanggan_noTelp: "",
    pelanggan_email: "",
  });
  const [selectedJenis, setSelectedJenis] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [addPelanggan, { isLoading: isAddingPelanggan }] =
    usePelangganPostMutation();
  const [addPelangganData, { isLoading: isAddingPelangganData }] =
    usePelangganDataPostMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      setSuccessMessage("");

      if (
        !formData.pelanggan_nama ||
        !formData.pelanggan_alamat ||
        !formData.pelanggan_noTelp ||
        !formData.pelanggan_email ||
        !selectedJenis ||
        !file
      ) {
        setError("Semua field harus diisi.");
        return;
      }

      const pelangganResponse = await addPelanggan(formData).unwrap();
      const pelangganId = pelangganResponse?.data?.pelanggan_id;

      if (!pelangganId) {
        throw new Error("Gagal mendapatkan ID pelanggan.");
      }

      const formDataWithFile = new FormData();
      formDataWithFile.append("pelanggan_data_pelanggan_id", pelangganId);
      formDataWithFile.append("pelanggan_data_jenis", selectedJenis);
      formDataWithFile.append("pelanggan_data_file", file);

      const pelangganDataResponse = await addPelangganData(formDataWithFile).unwrap();

      setSuccessMessage("Pelanggan berhasil ditambahkan!");

      setFormData({
        pelanggan_nama: "",
        pelanggan_alamat: "",
        pelanggan_noTelp: "",
        pelanggan_email: "",
      });
      setSelectedJenis("");
      setFile(null);
    } catch (err: any) {
      console.error("Error saat menambahkan pelanggan:", err);

      if (err?.status === 400 || err?.status === 500) {
        setError(err?.data?.message || "Terjadi kesalahan saat menambahkan pelanggan.");
      } else {
        setError("Gagal menambahkan pelanggan. Silakan coba lagi.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h2 className="text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
          FORM TAMBAH PELANGGAN
        </h2>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {successMessage && (
          <div className="text-green-500 text-sm mb-4">{successMessage}</div>
        )}
        <form onSubmit={handleSubmit}>
          <h3 className="text-2xl font-semibold mb-4 text-gray-700 border-b-2 pb-2 border-indigo-500">
            Data Pelanggan
          </h3>
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
              placeholder="Masukkan nama pelanggan"
              className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="pelanggan_alamat" className="text-sm font-medium text-gray-600">
              Alamat
            </label>
            <textarea
              id="pelanggan_alamat"
              name="pelanggan_alamat"
              value={formData.pelanggan_alamat}
              onChange={handleChange}
              placeholder="Masukkan alamat"
              className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="pelanggan_noTelp" className="text-sm font-medium text-gray-600">
              Nomor Telepon
            </label>
            <input
              type="tel"
              id="pelanggan_noTelp"
              name="pelanggan_noTelp"
              value={formData.pelanggan_noTelp}
              onChange={handleChange}
              placeholder="Masukkan nomor telepon"
              className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
              required
            />
          </div>
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
              placeholder="Masukkan email"
              className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="pelanggan_data_jenis" className="text-sm font-medium text-gray-600">
              Jenis Pelanggan
            </label>
            <select
              id="pelanggan_data_jenis"
              value={selectedJenis}
              onChange={(e) => setSelectedJenis(e.target.value)}
              className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
              required
            >
              <option value="" disabled>
                Pilih Jenis Pelanggan
              </option>
              <option value="KTP">KTP</option>
              <option value="SIM">SIM</option>
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="pelanggan_data_file" className="text-sm font-medium text-gray-600">
              Unggah File
            </label>
            <input
              type="file"
              id="pelanggan_data_file"
              onChange={handleFileChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={isAddingPelanggan || isAddingPelangganData}
              className="px-8 py-4 rounded-lg text-lg font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-indigo-600 hover:to-blue-600 transition duration-300 shadow-md"
            >
              {isAddingPelanggan || isAddingPelangganData
                ? "Menambahkan..."
                : "Tambah Pelanggan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahPelanggan;