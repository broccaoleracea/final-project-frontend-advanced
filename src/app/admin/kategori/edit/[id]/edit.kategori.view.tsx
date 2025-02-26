"use client";

interface EditKategoriFormProps {
  kategoriNama: string;
  isLoading: boolean;
  isUpdating: boolean;
  isError: boolean;
  onChangeAction: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitAction: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function EditKategoriForm({
  kategoriNama: initialValue,
  isLoading,
  isUpdating,
  isError,
  onChangeAction,
  onSubmitAction,
}: EditKategoriFormProps) {
  if (isLoading) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-white p-6 rounded-lg shadow-md">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-12 bg-gray-200 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-600 text-center">Gagal memuat kategori.</div>
    );
  }

  return (
      <div className="flex items-center mx-auto w-full h-full min-h-screen my-auto bg-gray-100 ">
    <div className=" max-w-lg w-full  mx-auto  bg-white p-6 rounded-lg shadow-md border border-gray-300">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Edit Kategori
      </h2>
      <form onSubmit={onSubmitAction} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Nama Kategori
          </label>
          <input
            id="kategoriNama"
            name="kategoriNama"
            type="text"
            value={initialValue}
            onChange={onChangeAction}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-400"
            required
          />
        </div>

        <button
          name="update"
          type="submit"
          disabled={isUpdating}
          className="w-full bg-yellow-400 text-black py-2 px-4 rounded-lg hover:bg-yellow-500 transition disabled:opacity-50"
        >
          {isUpdating ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </form>
    </div>
      </div>
  );
}
