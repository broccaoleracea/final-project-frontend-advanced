"use client";
import { useState } from "react";
import { usePelangganPostMutation, usePelangganDataGetQuery } from "@/state/api/dataApi";

const RentalForm = () => {
  const [formData, setFormData] = useState({
    pelanggan_nama: "",
    pelanggan_alamat: "",
    pelanggan_noTelp: "",
    pelanggan_email: "",
  });
  const [selectedPelangganId, setSelectedPelangganId] = useState(""); // Untuk menyimpan ID pelanggan dari dropdown
  const [file, setFile] = useState<File | null>(null); // Untuk menyimpan file yang diunggah
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Mutation untuk menambahkan pelanggan
  const [addPelanggan, { isLoading: isAdding }] = usePelangganPostMutation();

  // Query untuk mendapatkan data pelanggan untuk dropdown
  const {
    data: pelangganResponse,
    isLoading: isPelangganLoading,
    isError: isPelangganError,
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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(""); // Reset error message
      setSuccessMessage(""); // Reset success message

      // Validasi input
      if (!selectedPelangganId || !file) {
        setError("ID pelanggan dan file harus diisi.");
        return;
      }

      // Buat FormData untuk pengiriman
      const toSubmit = new FormData();
      toSubmit.append("pelanggan_data_id", selectedPelangganId);
      toSubmit.append("pelanggan_data_file", file);

      console.log("FormData:", toSubmit);

      // Kirim data ke API menggunakan mutation
      await addPelanggan(toSubmit).unwrap();

      // Tampilkan pesan sukses
      setSuccessMessage("Data berhasil ditambahkan!");

      // Reset form setelah berhasil
      setFormData({
        pelanggan_nama: "",
        pelanggan_alamat: "",
        pelanggan_noTelp: "",
        pelanggan_email: "",
      });
      setSelectedPelangganId("");
      setFile(null);
    } catch (err: any) {
      console.error("Error saat menambahkan data:", err);
      setError(err?.data?.message || "Gagal menambahkan data.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h2 className="text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
          TAMBAH DATA PELANGGAN
        </h2>

        {/* Error and Success Messages */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {successMessage && (
          <div className="text-green-500 text-sm mb-4">{successMessage}</div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Penyewa Section */}
          <h3 className="text-2xl font-semibold mb-4 text-gray-700 border-b-2 pb-2 border-indigo-500">
            Data Pelanggan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Dropdown untuk memilih pelanggan */}
            <div className="relative">
              <label className="text-sm font-medium text-gray-600">Pilih Pelanggan</label>
              {isPelangganLoading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-indigo-500"></div>
              ) : isPelangganError ? (
                <div className="text-red-500">Gagal memuat data pelanggan.</div>
              ) : (
                <select
                  value={selectedPelangganId}
                  onChange={(e) => setSelectedPelangganId(e.target.value)}
                  className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
                  required
                >
                  <option value="">Pilih Pelanggan</option>
                  {pelangganResponse?.data?.map((pelanggan) => (
                    <option key={pelanggan.pelanggan_id} value={pelanggan.pelanggan_id}>
                      {pelanggan.pelanggan_nama}
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
              disabled={isAdding}
              className="px-8 py-4 rounded-lg text-lg font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-indigo-600 hover:to-blue-600 transition duration-300 shadow-md"
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