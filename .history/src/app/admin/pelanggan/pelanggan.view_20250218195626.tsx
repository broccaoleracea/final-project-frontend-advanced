"use client";
import { useState } from "react";
import {
  usePelangganPostMutation,
  usePelangganDataPostMutation,
} from "@/state/api/dataApi";

const PelangganView = () => {
  // State untuk data pelanggan utama
  const [formData, setFormData] = useState({
    pelanggan_nama: "",
    pelanggan_alamat: "",
    pelanggan_noTelp: "",
    pelanggan_email: "",
  });

  // State untuk data tambahan
  const [selectedJenis, setSelectedJenis] = useState(""); // Jenis pelanggan
  const [file, setFile] = useState<File | null>(null); // File upload

  // State untuk pesan error dan sukses
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // State untuk menyimpan daftar pelanggan yang ditampilkan di tabel
  const [pelangganList, setPelangganList] = useState<
    {
      pelanggan_nama: string;
      pelanggan_alamat: string;
      pelanggan_noTelp: string;
      pelanggan_email: string;
      pelanggan_data_jenis: string;
      pelanggan_data_file: string; // Simpan nama file saja
    }[]
  >([]);

  // Mutation untuk menambahkan pelanggan utama
  const [addPelanggan, { isLoading: isAddingPelanggan }] =
    usePelangganPostMutation();

  // Mutation untuk menambahkan data tambahan
  const [addPelangganData, { isLoading: isAddingPelangganData }] =
    usePelangganDataPostMutation();

  // Handle input changes untuk form utama
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

      console.log("Payload formData:", formData); // Debugging: Cek payload utama

      // Kirim data pelanggan utama
      const pelangganResponse = await addPelanggan(formData).unwrap();

      console.log("Pelanggan Response:", pelangganResponse); // Debugging: Cek respons dari API

      // Ambil ID pelanggan dari respons
      const pelangganId = pelangganResponse?.data?.pelanggan_id;

      if (!pelangganId) {
        throw new Error("Gagal mendapatkan ID pelanggan.");
      }

      // Buat FormData untuk data tambahan
      const formDataWithFile = new FormData();
      formDataWithFile.append("pelanggan_data_pelanggan_id", pelangganId);
      formDataWithFile.append("pelanggan_data_jenis", selectedJenis);
      formDataWithFile.append("pelanggan_data_file", file);

      const pelangganDataResponse = await addPelangganData(formDataWithFile).unwrap();

      console.log("Pelanggan Data Response:", pelangganDataResponse); // Debugging: Cek respons dari API

      // Simpan data pelanggan ke state lokal untuk ditampilkan di tabel
      setPelangganList((prev) => [
        ...prev,
        {
          pelanggan_nama: formData.pelanggan_nama,
          pelanggan_alamat: formData.pelanggan_alamat,
          pelanggan_noTelp: formData.pelanggan_noTelp,
          pelanggan_email: formData.pelanggan_email,
          pelanggan_data_jenis: selectedJenis,
          pelanggan_data_file: file.name, // Simpan nama file saja
        },
      ]);

      // Tampilkan pesan sukses
      setSuccessMessage("Pelanggan berhasil ditambahkan!");

      // Reset form setelah berhasil
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

      // Tangkap detail error dari API jika ada
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
            Data Pelanggan
          </h3>
          {/* Nama Pelanggan */}
          <div className="mb-6">
            <label
              htmlFor="pelanggan_nama"
              className="text-sm font-medium text-gray-600"
            >
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
            <label
              htmlFor="pelanggan_alamat"
              className="text-sm font-medium text-gray-600"
            >
              Alamat
            </label>
            <textarea
              id="pelanggan_alamat"
              name="pelanggan_alamat"
              value={formData.pelanggan_alamat}
              onChange={handleChange}
              className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
              required
            />
          </div>
          {/* Nomor Telepon Pelanggan */}
          <div className="mb-6">
            <label
              htmlFor="pelanggan_noTelp"
              className="text-sm font-medium text-gray-600"
            >
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
            <label
              htmlFor="pelanggan_email"
              className="text-sm font-medium text-gray-600"
            >
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
            <label
              htmlFor="pelanggan_data_jenis"
              className="text-sm font-medium text-gray-600"
            >
              Jenis Pelanggan
            </label>
            <select
              id="pelanggan_data_jenis"
              value={selectedJenis} // Kontrol nilai yang dipilih
              onChange={(e) => setSelectedJenis(e.target.value)} // Perbarui state saat nilai berubah
              className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
              required
            >
              {/* Placeholder option */}
              <option value="" disabled>
                Pilih Jenis Pelanggan
              </option>
              {/* Opsi jenis pelanggan */}
              <option value="KTP">KTP</option>
              <option value="SIM">SIM</option>
            </select>
          </div>
          {/* File Upload */}
          <div className="mb-6">
            <label
              htmlFor="pelanggan_data_file"
              className="text-sm font-medium text-gray-600"
            >
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
          {/* Submit Button */}
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

        {/* Tabel untuk Menampilkan Data Pelanggan */}
        <div className="mt-10 overflow-hidden border border-gray-200 rounded-lg shadow-md bg-white">
          <table className="w-full border-collapse text-lg">
            <thead className="bg-gradient-to-r from-blue-200 to-indigo-200 text-gray-800">
              <tr>
                <th className="py-5 px-8 text-left font-semibold">Nama Pelanggan</th>
                <th className="py-5 px-8 text-left font-semibold">Alamat</th>
                <th className="py-5 px-8 text-left font-semibold">Nomor Telepon</th>
                <th className="py-5 px-8 text-left font-semibold">Email</th>
                <th className="py-5 px-8 text-left font-semibold">Jenis</th>
                <th className="py-5 px-8 text-left font-semibold">File</th>
              </tr>
            </thead>
            <tbody>
              {pelangganList.length > 0 ? (
                pelangganList.map((item, index) => (
                  <tr
                    key={index}
                    className={`transition-all duration-300 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                    } hover:bg-indigo-50`}
                  >
                    <td className="py-6 px-8 border-b text-gray-700 font-medium">
                      {item.pelanggan_nama || "-"}
                    </td>
                    <td className="py-6 px-8 border-b text-gray-700 font-medium">
                      {item.pelanggan_alamat || "-"}
                    </td>
                    <td className="py-6 px-8 border-b text-gray-700 font-medium">
                      {item.pelanggan_noTelp || "-"}
                    </td>
                    <td className="py-6 px-8 border-b text-gray-700 font-medium">
                      {item.pelanggan_email || "-"}
                    </td>
                    <td className="py-6 px-8 border-b text-gray-700 font-medium">
                      {item.pelanggan_data_jenis || "-"}
                    </td>
                    <td className="py-6 px-8 border-b text-gray-700 font-medium">
                      {item.pelanggan_data_file || "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-6 px-8 text-center text-gray-500">
                    Tidak ada pelanggan untuk ditampilkan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PelangganView;