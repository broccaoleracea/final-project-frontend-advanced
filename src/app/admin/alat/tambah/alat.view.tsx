import React from "react";

interface TambahAlatProps {
  formData: {
    alat_nama: string;
    alat_deskripsi: string;
    alat_hargaPerhari: number;
    alat_stok: number;
    alat_kategori_id: string;
  };
  kategori: { kategori_id: string; kategori_nama: string }[];
  isCreating: boolean;
  error: string;
  successMessage: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const TambahAlat: React.FC<TambahAlatProps> = ({
                                                 formData,
                                                 kategori,
                                                 isCreating,
                                                 error,
                                                 successMessage,
                                                 onChange,
                                                 onSubmit,
                                               }) => {
  return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl border border-gray-300">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Tambah Alat
          </h2>
          {error && <div className="text-sm text-red-500 mb-4">{error}</div>}
          {successMessage && <div className="text-sm text-green-500 mb-4">{successMessage}</div>}

          <form onSubmit={onSubmit} className="text-gray-700">
            <div className="mb-4">
              <label htmlFor="alat_nama" className="block text-sm font-medium text-gray-700">
                Nama Alat
              </label>
              <input
                  type="text"
                  id="alat_nama"
                  name="alat_nama"
                  value={formData.alat_nama}
                  onChange={onChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:border-yellow-400 focus:ring-yellow-400 placeholder-gray-400 text-sm"
                  required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="alat_deskripsi" className="block text-sm font-medium text-gray-700">
                Deskripsi
              </label>
              <textarea
                  id="alat_deskripsi"
                  name="alat_deskripsi"
                  value={formData.alat_deskripsi}
                  onChange={onChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:border-yellow-400 focus:ring-yellow-400 placeholder-gray-400 text-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="alat_hargaPerhari" className="block text-sm font-medium text-gray-700">
                Harga Per Hari
              </label>
              <input
                  type="number"
                  id="alat_hargaPerhari"
                  name="alat_hargaPerhari"
                  value={formData.alat_hargaPerhari}
                  onChange={onChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:border-yellow-400 focus:ring-yellow-400 placeholder-gray-400 text-sm"
                  required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="alat_stok" className="block text-sm font-medium text-gray-700">
                Stok
              </label>
              <input
                  type="number"
                  id="alat_stok"
                  name="alat_stok"
                  value={formData.alat_stok}
                  onChange={onChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:border-yellow-400 focus:ring-yellow-400 placeholder-gray-400 text-sm"
                  required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="alat_kategori_id" className="block text-sm font-medium text-gray-700">
                Kategori
              </label>
              <select
                  id="alat_kategori_id"
                  name="alat_kategori_id"
                  value={formData.alat_kategori_id}
                  onChange={onChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:border-yellow-400 focus:ring-yellow-400 text-sm"
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

            <div className="flex justify-end mt-6">
              <button
                  type="button"
                  className="px-4 py-2 rounded text-sm font-medium text-gray-600 border border-gray-300 hover:bg-gray-100 transition"
              >
                Batal
              </button>
              <button
              name="tambah"
                  type="submit"
                  disabled={isCreating}
                  className="ml-4 px-4 py-2 rounded text-sm font-medium bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-400 text-white transition disabled:opacity-50"
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
