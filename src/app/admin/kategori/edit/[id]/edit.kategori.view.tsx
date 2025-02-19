"use client";

interface EditKategoriFormProps {
  kategoriNama: string;
  isLoading: boolean;
  isUpdating: boolean;
  isError: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function EditKategoriForm({
                                           kategoriNama,
                                           isLoading,
                                           isUpdating,
                                           isError,
                                           onChange,
                                           onSubmit,
                                         }: EditKategoriFormProps) {
  if (isLoading) {
    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
    );
  }

  if (isError) {
    return <div className="text-red-600 text-center">Gagal memuat kategori.</div>;
  }

  return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Edit Kategori</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Nama Kategori</label>
            <input
                id="kategoriNama"
                name="kategoriNama"
                type="text"
                value={kategoriNama}
                onChange={onChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-400"
                required
            />
          </div>

          <button
              type="submit"
              disabled={isUpdating}
              className="w-full bg-yellow-400 text-black py-2 px-4 rounded-lg hover:bg-yellow-500 transition disabled:opacity-50"
          >
            {isUpdating ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </form>
      </div>
  );
}
