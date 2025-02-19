"use client";

import { UpdateAlatViewProps } from "./update.type";

const UpdateAlatView = ({
                          formData,
                          error,
                          successMessage,
                          kategori,
                          isUpdating,
                          onChange,
                          onSubmit,
                        }: UpdateAlatViewProps) => {
  return (
      <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Edit Alat</h1>

        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nama Alat</label>
            <input
                type="text"
                name="alat_nama"
                value={formData.alat_nama}
                onChange={onChange}
                className="w-full p-2 border rounded text-gray-800 focus:border-gray-800 border-gray-500"
                required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
            <input
                type="text"
                name="alat_deskripsi"
                value={formData.alat_deskripsi}
                onChange={onChange}
                className="w-full p-2 border rounded text-gray-800 focus:border-gray-800 border-gray-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Harga per Hari</label>
            <input
                type="number"
                name="alat_hargaPerhari"
                value={formData.alat_hargaPerhari}
                onChange={onChange}
                className="w-full p-2 border rounded text-gray-800 focus:border-gray-800 border-gray-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Stok</label>
            <input
                type="number"
                name="alat_stok"
                value={formData.alat_stok}
                onChange={onChange}
                className="w-full p-2 border rounded text-gray-800 focus:border-gray-800 border-gray-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Kategori</label>
            <select
                name="alat_kategori_id"
                value={formData.alat_kategori_id}
                onChange={onChange}
                className="w-full p-2 border rounded text-gray-800 focus:border-gray-800 border-gray-500"
                required
            >
              <option value="" disabled>Pilih Kategori</option>
              {kategori.map((kat) => (
                  <option key={kat.kategori_id} value={kat.kategori_id}>
                    {kat.kategori_nama}
                  </option>
              ))}
            </select>
          </div>

          <button
              type="submit"
              disabled={isUpdating}
              className="w-full bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
          >
            {isUpdating ? "Mengupdate..." : "Update"}
          </button>
        </form>
      </div>
  );
};

export default UpdateAlatView;
