"use client";
import { useState } from "react";
import { useAlatPostMutation, useKategoriGetQuery } from "@/state/api/dataApi";

const TambahAlat = () => {
  const [formData, setFormData] = useState({
    alat_nama: "",
    alat_deskripsi: "",
    alat_hargaPerhari: 0,
    alat_stok: 0,
    alat_kategori_id: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Query untuk mendapatkan data kategori
  const { data: kategoriResponse, isLoading: isKategoriLoading, isError: isKategoriError } =
    useKategoriGetQuery();

  // Mutation untuk menambahkan alat baru
  const [createAlat, { isLoading: isCreating }] = useAlatPostMutation();

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      if (!formData.alat_nama || !formData.alat_kategori_id) {
        setError("Nama alat dan kategori harus diisi.");
        return;
      }

      // Panggil mutation untuk menambahkan alat baru
      await createAlat(formData).unwrap();

      // Reset form setelah berhasil
      setFormData({
        alat_nama: "",
        alat_deskripsi: "",
        alat_hargaPerhari: 0,
        alat_stok: 0,
        alat_kategori_id: "",
      });

      setSuccessMessage("Alat berhasil ditambahkan!");
    } catch (err: any) {
      console.error("Error saat menambahkan alat:", err);
      setError(err?.data?.message || "Gagal menambahkan alat.");
    }
  };

  // Loading state untuk kategori
  if (isKategoriLoading) {
    return <div>Loading kategori...</div>;
  }

  if (isKategoriError) {
    return <div>Gagal memuat kategori!</div>;
  }

  const kategori = kategoriResponse?.data || [];

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h2 className="text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
          FORM TAMBAH ALAT
        </h2>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {successMessage && (
          <div className="text-green-500 text-sm mb-4">{successMessage}</div>
        )}
        <form onSubmit={handleSubmit}>
          {/* Nama Alat */}
          <h3 className="text-2xl font-semibold mb-4 text-gray-700 border-b-2 pb-2 border-indigo-500">Tambah List Alat</h3>
          <div className="mb-6">
            <label htmlFor="alat_nama" className="text-sm font-medium text-gray-600">Nama Alat</label>
            <input
              type="text"
              id="alat_nama"
              name="alat_nama"
              value={formData.alat_nama}
              onChange={handleChange}
              className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
              required
            />
          </div>

          {/* Deskripsi Alat */}
          <div className="mb-6">
            <label htmlFor="alat_deskripsi" className="text-sm font-medium text-gray-600">Deskripsi</label>
            <textarea
              id="alat_deskripsi"
              name="alat_deskripsi"
              value={formData.alat_deskripsi}
              onChange={handleChange}
              className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
            />
          </div>

          {/* Harga Per Hari */}
          <div className="mb-6">
            <label htmlFor="alat_hargaPerhari" className="text-sm font-medium text-gray-600">Harga Per Hari</label>
            <input
              type="number"
              id="alat_hargaPerhari"
              name="alat_hargaPerhari"
              value={formData.alat_hargaPerhari}
              onChange={handleChange}
              className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
              required
            />
          </div>

          {/* Stok */}
          <div className="mb-6">
            <label htmlFor="alat_stok" className="text-sm font-medium text-gray-600">Stok</label>
            <input
              type="number"
              id="alat_stok"
              name="alat_stok"
              value={formData.alat_stok}
              onChange={handleChange}
              className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
              required
            />
          </div>

          {/* Kategori */}
          <div className="mb-6">
            <label htmlFor="alat_kategori_id" className="text-sm font-medium text-gray-600">Kategori</label>
            <select
              id="alat_kategori_id"
              name="alat_kategori_id"
              value={formData.alat_kategori_id}
              onChange={handleChange}
              className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
              required
            >
              <option value="">Pilih Kategori</option>
              {kategori.map((kat) => (
                <option key={kat.kategori_id} value={kat.kategori_id}>
                  {kat.kategori_nama}
                </option>
              ))}
            </select>
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
              {isCreating ? "Menambahkan..." : "Tambah Alat"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahAlat;
