"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  usePelangganGetQuery,
  usePenyewaanGetQuery,
  usePenyewaanPatchMutation,
} from "@/state/api/dataApi";
import { useParams } from "next/navigation";
import {router} from "next/client";

interface FormData {
  penyewaan_tglSewa: string;
  penyewaan_tglKembali: string;
  status_Pembayaran: string;
  status_Pengembalian: string;
  penyewaan_pelanggan_id: number;
  penyewaan_totalHarga: number;
}

const UpdateView = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState<FormData>({
    penyewaan_tglSewa: "",
    penyewaan_tglKembali: "",
    status_Pembayaran: "",
    status_Pengembalian: "",
    penyewaan_pelanggan_id: 0, // Set default to 0 until data loads
    penyewaan_totalHarga: 0,
  });

  const [error, setError] = useState("");
  const { data: penyewaanData, isLoading: isPenyewaanLoading } = usePenyewaanGetQuery(id);
  const [updatePenyewaan, { isLoading: isUpdating }] = usePenyewaanPatchMutation();

  useEffect(() => {
    if (penyewaanData && penyewaanData.data && !isPenyewaanLoading) {
      const {
        penyewaan_tglSewa,
        penyewaan_tglKembali,
        status_Pembayaran,
        status_Pengembalian,
        penyewaan_pelanggan_id,
        penyewaan_totalHarga,
      } = penyewaanData.data;

      setFormData({
        penyewaan_tglSewa: penyewaan_tglSewa || "",
        penyewaan_tglKembali: penyewaan_tglKembali || "",
        status_Pembayaran: status_Pembayaran || "",
        status_Pengembalian: status_Pengembalian || "",
        penyewaan_pelanggan_id: penyewaan_pelanggan_id || 0, // Use actual pelanggan ID from API
        penyewaan_totalHarga: parseFloat(penyewaan_totalHarga) || 0,
      });
    }
  }, [penyewaanData, isPenyewaanLoading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "penyewaan_totalHarga" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePenyewaan({ id, data: formData }).unwrap();
      alert("Data berhasil diperbarui!");
      router.push("/admin/penyewaan")
    } catch (err: any) {
      setError(err?.data?.message || "Gagal memperbarui data.");
    }
  };

  if (isPenyewaanLoading) {
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500"></div>
        </div>
    );
  }

  return (
      <div className="p-4 min-h-screen bg-gray-100 ml-80">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Penyewaan</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Tanggal Pinjam</label>
            <input
                type="date"
                name="penyewaan_tglSewa"
                value={formData.penyewaan_tglSewa}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Tanggal Kembali</label>
            <input
                type="date"
                name="penyewaan_tglKembali"
                value={formData.penyewaan_tglKembali}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Status Pembayaran</label>
            <select
                name="status_Pembayaran"
                value={formData.status_Pembayaran}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
            >
              <option value="" disabled>Pilih Status</option>
              <option value="Lunas">Lunas</option>
              <option value="Belum_Dibayar">Belum Lunas</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Status Pengembalian</label>
            <select
                name="status_Pengembalian"
                value={formData.status_Pengembalian}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
            >
              <option value="" disabled>Pilih Status</option>
              <option value="Sudah_Kembali">Dikembalikan</option>
              <option value="Belum_Kembali">Belum Dikembalikan</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Total Harga</label>
            <input
                type="number"
                name="penyewaan_totalHarga"
                value={formData.penyewaan_totalHarga}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
            />
          </div>

          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

          <div className="flex gap-4">
            <button
                type="submit"
                disabled={isUpdating}
                className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600"
            >
              {isUpdating ? "Memperbarui..." : "Simpan"}
            </button>
            <Link
                href="/admin/penyewaan"
                className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600"
            >
              Batal
            </Link>
          </div>
        </form>
      </div>
  );
};

export default UpdateView;
