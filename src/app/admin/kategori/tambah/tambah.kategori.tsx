"use client";

interface KategoriFormProps {
    kategoriNama: string;
    error: string;
    isLoading: boolean;
    onChangeAction: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmitAction: (e: React.FormEvent) => void;
}

export default function KategoriForm({
                                         kategoriNama,
                                         error,
                                         isLoading,
                                         onChangeAction,
                                         onSubmitAction,
                                     }: KategoriFormProps) {
    return (
        <div className="max-w-lg  w-full  mx-auto mt-10 bg-white p-6 rounded-lg shadow-md border border-gray-300">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Tambah Kategori
            </h1>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <form onSubmit={onSubmitAction}>
                <div className="mb-4">
                    <label
                        htmlFor="kategoriNama"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Nama Kategori
                    </label>
                    <input
                        id="kategoriNama"
                        name="kategoriNama"
                        type="text"
                        required
                        value={kategoriNama}
                        onChange={onChangeAction}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:border-yellow-400 focus:ring-yellow-400 placeholder-gray-400 text-sm"
                        placeholder="Masukkan nama kategori"
                    />
                </div>
                <div className="mb-4">
                    <button
                        id="submit"
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-400 text-white px-3 py-2 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Menambahkan..." : "Tambah"}
                    </button>
                </div>
            </form>
        </div>

    );
}
