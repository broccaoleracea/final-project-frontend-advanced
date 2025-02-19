"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Impor useRouter
import {
  usePenyewaanPostMutation,
  usePenyewaanDetailPostMutation,
  useAlatGetQuery,
  useAlatPostMutation,
  usePelangganGetQuery,
} from "@/state/api/dataApi";

const TambahPenyewaan = () => {
  const [formData, setFormData] = useState({
    penyewaan_pelanggan_id: "",
    penyewaan_tglSewa: "",
    penyewaan_tglKembali: "",
    status_Pembayaran: "Belum_Dibayar",
    status_Pengembalian: "Belum_Kembali",
    penyewaan_totalHarga: 0,
  });

  const [detailData, setDetailData] = useState({
    penyewaan_detail_alat_id: "",
    penyewaan_detail_jumlah: 0,
    penyewaan_detail_subHarga: 0,
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter(); // Inisialisasi router

  // Query untuk mendapatkan data alat
  const { data: alatResponse, isLoading: isAlatLoading } = useAlatGetQuery();

  // Query untuk mendapatkan data pelanggan
  const {
    data: pelangganResponse,
    isLoading: isPelangganLoading,
    isError: isPelangganError,
  } = usePelangganGetQuery();

  // Mutation untuk menambahkan data penyewaan
  const [addPenyewaan, { isLoading: isAddingPenyewaan }] =
    usePenyewaanPostMutation();

  // Mutation untuk menambahkan detail penyewaan
  const [addPenyewaanDetail, { isLoading: isAddingPenyewaanDetail }] =
    usePenyewaanDetailPostMutation();

  // Mutation untuk memperbarui stok alat
  const [updateAlat, { isLoading: isUpdatingAlat }] = useAlatPostMutation();

  // Handle input changes untuk form utama
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle input changes untuk detail penyewaan
  const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetailData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      setSuccessMessage("");

      // Validasi input
      if (
        !formData.penyewaan_pelanggan_id ||
        !formData.penyewaan_tglSewa ||
        !formData.penyewaan_tglKembali ||
        !detailData.penyewaan_detail_alat_id ||
        !detailData.penyewaan_detail_jumlah
      ) {
        setError("Semua field wajib diisi.");
        return;
      }

      // Tambahkan data penyewaan utama
      const penyewaanResponse = await addPenyewaan(formData).unwrap();
      const penyewaanId = penyewaanResponse?.data?.penyewaan_id;

      if (!penyewaanId) {
        throw new Error("Gagal mendapatkan ID penyewaan.");
      }

      // Tambahkan detail penyewaan
      await addPenyewaanDetail({
        penyewaan_detail_penyewaan_id: penyewaanId.toString(),
        ...detailData,
      }).unwrap();

      // Kurangi stok alat
      const selectedAlat = alatResponse?.data.find(
        (alat) => alat.alat_id === Number(detailData.penyewaan_detail_alat_id)
      );

      if (selectedAlat) {
        await updateAlat({
          id: selectedAlat.alat_id,
          alat_stok: selectedAlat.alat_stok - detailData.penyewaan_detail_jumlah,
        }).unwrap();
      }

      // Tampilkan pesan sukses
      setSuccessMessage("Penyewaan berhasil ditambahkan!");

      // Redirect ke halaman penyewaan
      router.push("/admin/penyewaan"); // Navigasi ke halaman penyewaan
    } catch (err: any) {
      console.error("Error saat menambahkan penyewaan:", err);
      setError(err?.data?.message || "Gagal menambahkan penyewaan.");
    }
  };

  // Loading state
  if (isAlatLoading || isPelangganLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500"></div>
      </div>
    );
  }

  // Error state
  if (isPelangganError) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="text-red-600 text-lg font-semibold">Gagal memuat data pelanggan!</div>
      </div>
    );
  }

  return (
    <div className="p-4 min-h-screen bg-gray-100">
      {/* Judul Form */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">FORM TAMBAH PENYEWAAN</h1>

      {/* Pesan Error dan Sukses */}
      {error && <p className="text-red-600">{error}</p>}
      {successMessage && <p className="text-green-600">{successMessage}</p>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        {/* Header Section */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Data Penyewaan</h2>

        {/* Pelanggan Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Pilih Pelanggan</label>
          <select
            name="penyewaan_pelanggan_id"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                penyewaan_pelanggan_id: e.target.value,
              }))
            }
            className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
            required
          >
            <option value="">Pilih Pelanggan</option>
            {pelangganResponse?.data.map((pelanggan) => (
              <option key={pelanggan.pelanggan_id} value={pelanggan.pelanggan_id}>
                {pelanggan.pelanggan_nama}
              </option>
            ))}
          </select>
        </div>

        {/* Tanggal Sewa */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Tanggal Sewa</label>
          <input
            type="date"
            name="penyewaan_tglSewa"
            value={formData.penyewaan_tglSewa}
            onChange={handleChange}
            className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
            required
          />
        </div>

        {/* Tanggal Kembali */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Tanggal Kembali</label>
          <input
            type="date"
            name="penyewaan_tglKembali"
            value={formData.penyewaan_tglKembali}
            onChange={handleChange}
            className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
            required
          />
        </div>

        {/* Detail Penyewaan */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Detail Penyewaan</h2>

        {/* Alat Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Pilih Alat</label>
          <select
            name="penyewaan_detail_alat_id"
            onChange={handleDetailChange}
            className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
            required
          >
            <option value="">Pilih Alat</option>
            {alatResponse?.data.map((alat) => (
              <option key={alat.alat_id} value={alat.alat_id}>
                {alat.alat_nama}
              </option>
            ))}
          </select>
        </div>

        {/* Jumlah Alat */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Jumlah Alat</label>
          <input
            type="number"
            name="penyewaan_detail_jumlah"
            value={detailData.penyewaan_detail_jumlah}
            onChange={handleDetailChange}
            className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isAddingPenyewaan || isAddingPenyewaanDetail || isUpdatingAlat}
          className="px-6 py-3 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 transition duration-300 ease-in-out"
        >
          {isAddingPenyewaan || isAddingPenyewaanDetail || isUpdatingAlat
            ? "Menambahkan..."
            : "Tambah Penyewaan"}
        </button>
      </form>
    </div>
  );
};

export default TambahPenyewaan;