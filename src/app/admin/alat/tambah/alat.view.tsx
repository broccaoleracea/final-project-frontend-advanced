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
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
          <h2 className="text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
            FORM TAMBAH ALAT
          </h2>
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          {successMessage && (
              <div className="text-green-500 text-sm mb-4">{successMessage}</div>
          )}
          <form onSubmit={onSubmit} className="text-gray-700">
            <h3 className="text-2xl font-semibold mb-4 text-gray-700 border-b-2 pb-2 border-indigo-500">
              Tambah List Alat
            </h3>
            <div className="mb-6">
              <label htmlFor="alat_nama" className="text-sm font-medium text-gray-600">Nama Alat</label>
              <input
                  type="text"
                  id="alat_nama"
                  name="alat_nama"
                  value={formData.alat_nama}
                  onChange={onChange}
                  className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
                  required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="alat_deskripsi" className="text-sm font-medium text-gray-600">Deskripsi</label>
              <textarea
                  id="alat_deskripsi"
                  name="alat_deskripsi"
                  value={formData.alat_deskripsi}
                  onChange={onChange}
                  className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="alat_hargaPerhari" className="text-sm font-medium text-gray-600">Harga Per Hari</label>
              <input
                  type="number"
                  id="alat_hargaPerhari"
                  name="alat_hargaPerhari"
                  value={formData.alat_hargaPerhari}
                  onChange={onChange}
                  className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
                  required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="alat_stok" className="text-sm font-medium text-gray-600">Stok</label>
              <input
                  type="number"
                  id="alat_stok"
                  name="alat_stok"
                  value={formData.alat_stok}
                  onChange={onChange}
                  className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gray-100"
                  required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="alat_kategori_id" className="text-sm font-medium text-gray-600">Kategori</label>
              <select
                  id="alat_kategori_id"
                  name="alat_kategori_id"
                  value={formData.alat_kategori_id}
                  onChange={onChange}
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
