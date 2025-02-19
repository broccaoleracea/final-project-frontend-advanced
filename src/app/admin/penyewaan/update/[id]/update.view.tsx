import Link from "next/link";

interface FormData {
  penyewaan_tglSewa: string;
  penyewaan_tglKembali: string;
  status_Pembayaran: string;
  status_Pengembalian: string;
  penyewaan_pelanggan_id: number;
  penyewaan_totalHarga: number;
}

interface UpdateViewProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isUpdating: boolean;
  isPenyewaanLoading: boolean;
  error: string;
}

const UpdateView = ({
                      formData,
                      handleChange,
                      handleSubmit,
                      isUpdating,
                      isPenyewaanLoading,
                      error,
                    }: UpdateViewProps) => {
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
          {/* Tanggal Pinjam */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Tanggal Pinjam</label>
            <input
                type="date"
                name="penyewaan_tglSewa"
                value={formData.penyewaan_tglSewa}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                required
            />
          </div>

          {/* Status Pembayaran */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Status Pembayaran</label>
            <select
                name="status_Pembayaran"
                value={formData.status_Pembayaran}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                required
            >
              <option value="" disabled>Pilih Status</option>
              <option value="Lunas">Lunas</option>
              <option value="Belum_Dibayar">Belum Lunas</option>
            </select>
          </div>

          {/* Status Pengembalian */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Status Pengembalian</label>
            <select
                name="status_Pengembalian"
                value={formData.status_Pengembalian}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                required
            >
              <option value="" disabled>Pilih Status</option>
              <option value="Sudah_Kembali">Dikembalikan</option>
              <option value="Belum_Kembali">Belum Dikembalikan</option>
            </select>
          </div>

          {/* Total Harga */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Total Harga</label>
            <input
                type="number"
                name="penyewaan_totalHarga"
                value={formData.penyewaan_totalHarga}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                required
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

          {/* Buttons */}
          <div className="flex gap-4">
            <button
                type="submit"
                disabled={isUpdating}
                className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out"
            >
              {isUpdating ? "Memperbarui..." : "Simpan"}
            </button>
            <Link
                href="/admin/penyewaan"
                className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-300 ease-in-out"
            >
              Batal
            </Link>
          </div>
        </form>
      </div>
  );
};

export default UpdateView;
