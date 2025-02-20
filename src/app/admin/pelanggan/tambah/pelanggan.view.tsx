"use client";
import { useState } from "react";
import {
  usePelangganPostMutation,
  usePelangganDataPostMutation,
  usePelangganDataGetQuery,
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

  const [addPelanggan, { isLoading: isAddingPelanggan }] = usePelangganPostMutation();
  const [addPelangganData, { isLoading: isAddingPelangganData }] = usePelangganDataPostMutation();

  const { data: jenisPelangganResponse } = usePelangganDataGetQuery();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      setSuccessMessage("");

      if (!formData.pelanggan_nama || !formData.pelanggan_alamat || !formData.pelanggan_noTelp || !formData.pelanggan_email || !selectedJenis || !file) {
        setError("Semua field harus diisi.");
        return;
      }

      const pelangganResponse = await addPelanggan(formData).unwrap();
      const pelangganId = pelangganResponse?.data?.pelanggan_id;

      if (!pelangganId) throw new Error("Gagal mendapatkan ID pelanggan.");

      const formDataWithFile = new FormData();
      formDataWithFile.append("pelanggan_data_pelanggan_id", pelangganId);
      formDataWithFile.append("pelanggan_data_jenis", selectedJenis);
      formDataWithFile.append("pelanggan_data_file", file);

      await addPelangganData(formDataWithFile).unwrap();

      setSuccessMessage("Pelanggan berhasil ditambahkan!");
      setFormData({ pelanggan_nama: "", pelanggan_alamat: "", pelanggan_noTelp: "", pelanggan_email: "" });
      setSelectedJenis("");
      setFile(null);
    } catch (err: any) {
      setError(err?.data?.message || "Gagal menambahkan pelanggan.");
    }
  };

  return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Tambah Pelanggan</h2>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          {successMessage && <div className="text-green-500 text-sm mb-4">{successMessage}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="pelanggan_nama" className="text-sm font-medium text-gray-600">
                Nama Pelanggan
              </label>
              <input
                  type="text"
                  id="pelanggan_nama"
                  name="pelanggan_nama"
                  value={formData.pelanggan_nama}
                  onChange={handleChange}
                  className="px-3 py-2 w-full border border-gray-300 rounded-md text-sm focus:border-yellow-400 focus:ring-yellow-400 placeholder-gray-400"
                  required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="pelanggan_alamat" className="text-sm font-medium text-gray-600">
                Alamat
              </label>
              <textarea
                  id="pelanggan_alamat"
                  name="pelanggan_alamat"
                  value={formData.pelanggan_alamat}
                  onChange={handleChange}
                  className="px-3 py-2 w-full border border-gray-300 rounded-md text-sm focus:border-yellow-400 focus:ring-yellow-400 placeholder-gray-400"
                  required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="pelanggan_noTelp" className="text-sm font-medium text-gray-600">
                Nomor Telepon
              </label>
              <input
                  type="number"
                  id="pelanggan_noTelp"
                  name="pelanggan_noTelp"
                  value={formData.pelanggan_noTelp}
                  onChange={handleChange}
                  className="px-3 py-2 w-full border border-gray-300 rounded-md text-sm focus:border-yellow-400 focus:ring-yellow-400 placeholder-gray-400"
                  required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="pelanggan_email" className="text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                  type="email"
                  id="pelanggan_email"
                  name="pelanggan_email"
                  value={formData.pelanggan_email}
                  onChange={handleChange}
                  className="px-3 py-2 w-full border border-gray-300 rounded-md text-sm focus:border-yellow-400 focus:ring-yellow-400 placeholder-gray-400"
                  required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="pelanggan_data_jenis" className="text-sm font-medium text-gray-600">
                Jenis Data Pelanggan
              </label>
              <select
                  id="pelanggan_data_jenis"
                  value={selectedJenis}
                  onChange={(e) => setSelectedJenis(e.target.value)}
                  className="px-3 py-2 w-full border border-gray-300 rounded-md text-sm focus:border-yellow-400 focus:ring-yellow-400 placeholder-gray-400"
                  required
              >
                <option disabled value="">
                  Pilih Jenis Pelanggan
                </option>
                <option value="KTP">KTP</option>
                <option value="SIM">SIM</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="pelanggan_data_file" className="text-sm font-medium text-gray-600">
                Unggah File
              </label>
              <input
                  type="file"
                  id="pelanggan_data_file"
                  onChange={handleFileChange}
                  className="px-3 py-2 w-full border border-gray-300 rounded-md text-sm focus:border-yellow-400 focus:ring-yellow-400 placeholder-gray-400"
                  required
              />
            </div>

            <div className="flex justify-end mt-6">
              <button
                  type="submit"
                  disabled={isAddingPelanggan || isAddingPelangganData}
                  className="px-4 py-2 text-sm font-medium text-white bg-yellow-400 rounded-md hover:bg-yellow-500 focus:ring-yellow-400"
              >
                {isAddingPelanggan || isAddingPelangganData ? "Menambahkan..." : "Tambah Pelanggan"}
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default TambahPelanggan;
