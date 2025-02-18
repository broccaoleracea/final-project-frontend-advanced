"use client";
import { useState, useEffect } from "react";
import {
  useAlatGetQuery,
  useKategoriGetQuery,
  useAlatPatchMutation,
} from "@/state/api/dataApi";

const UpdateAlat = ({ params }: { params: { id: string } }) => {
  const [formData, setFormData] = useState({
    alat_nama: "",
    alat_deskripsi: "",
    alat_hargaPerhari: 0,
    alat_stok: 0,
    alat_kategori_id: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { data: alatDetailResponse, isLoading: isAlatLoading, isError: isAlatError } =
    useAlatGetQuery(params.id);
  const { data: kategoriResponse, isLoading: isKategoriLoading, isError: isKategoriError } =
    useKategoriGetQuery();
  const [updateAlat, { isLoading: isUpdating }] = useAlatPatchMutation();

  useEffect(() => {
    if (alatDetailResponse && alatDetailResponse.data) {
      const alatData = alatDetailResponse.data;

      const kategoriId = alatData.alat_kategori_id
        ? alatData.alat_kategori_id.toString()
        : "";

      setFormData({
        alat_nama: alatData.alat_nama || "",
        alat_deskripsi: alatData.alat_deskripsi || "",
        alat_hargaPerhari: alatData.alat_hargaPerhari || 0,
        alat_stok: alatData.alat_stok || 0,
        alat_kategori_id: kategoriId,
      });
    }
  }, [alatDetailResponse]);

  if (isAlatLoading || isKategoriLoading) {
    return <div>Loading...</div>;
  }

  if (isAlatError || isKategoriError || !alatDetailResponse?.data) {
    return <div>Error: Gagal memuat data.</div>;
  }

  const kategori = kategoriResponse?.data || [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      setSuccessMessage("");

      if (!formData.alat_nama || !formData.alat_kategori_id) {
        setError("Nama alat dan kategori harus diisi.");
        return;
      }

      await updateAlat({ id: params.id, data: formData }).unwrap();
      setSuccessMessage("Alat berhasil diperbarui!");
    } catch (err: any) {
      console.error("Error saat memperbarui alat:", err);
      setError(err?.data?.message || "Gagal memperbarui alat.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <main className="w-full max-w-screen-md p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-700">Edit Alat</h1>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md mb-4">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-md mb-4">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
          {/* Nama Alat */}
          <div className="mb-4">
            <label htmlFor="alat_nama" className="block text-sm font-medium text-gray-700">
              Nama Alat
            </label>
            <input
              type="text"
              id="alat_nama"
              name="alat_nama"
              value={formData.alat_nama}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Deskripsi Alat */}
          <div className="mb-4">
            <label htmlFor="alat_deskripsi" className="block text-sm font-medium text-gray-700">
              Deskripsi
            </label>
            <textarea
              id="alat_deskripsi"
              name="alat_deskripsi"
              value={formData.alat_deskripsi}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Harga Per Hari */}
          <div className="mb-4">
            <label
              htmlFor="alat_hargaPerhari"
              className="block text-sm font-medium text-gray-700"
            >
              Harga Per Hari
            </label>
            <input
              type="number"
              id="alat_hargaPerhari"
              name="alat_hargaPerhari"
              value={formData.alat_hargaPerhari}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Stok */}
          <div className="mb-4">
            <label htmlFor="alat_stok" className="block text-sm font-medium text-gray-700">
              Stok
            </label>
            <input
              type="number"
              id="alat_stok"
              name="alat_stok"
              value={formData.alat_stok}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Kategori */}
          <div className="mb-4">
            <label
              htmlFor="alat_kategori_id"
              className="block text-sm font-medium text-gray-700"
            >
              Kategori
            </label>
            <select
              id="alat_kategori_id"
              name="alat_kategori_id"
              value={formData.alat_kategori_id}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
          <button
            type="submit"
            disabled={isUpdating}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isUpdating ? "Memperbarui..." : "Simpan Perubahan"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default UpdateAlat;