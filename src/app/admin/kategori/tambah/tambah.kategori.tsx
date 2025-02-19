"use client";

interface KategoriFormProps {
    kategoriNama: string;
    error: string;
    isLoading: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export default function KategoriForm({
                                         kategoriNama,
                                         error,
                                         isLoading,
                                         onChange,
                                         onSubmit,
                                     }: KategoriFormProps) {
    return (
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-center text-4xl font-bold text-gray-900">
                Tambah Kategori
            </h2>
            <form className="space-y-4" onSubmit={onSubmit}>
                <div>
                    <label
                        htmlFor="kategoriNama"
                        className="block text-lg font-medium text-gray-700 mb-2"
                    >
                        Nama Kategori
                    </label>
                    <input
                        id="kategoriNama"
                        name="kategoriNama"
                        type="text"
                        required
                        value={kategoriNama}
                        onChange={onChange}
                        className="block w-full rounded-md border border-yellow-400 px-4 py-3 text-lg text-gray-900 placeholder-gray-500 focus:border-yellow-400 focus:ring-yellow-400"
                        placeholder="Masukkan nama kategori"
                    />
                </div>
                {error && <div className="text-red-600 text-base">{error}</div>}
                <div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-md border border-transparent bg-yellow-400 py-3 px-6 text-lg font-medium text-black hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Menambahkan..." : "Tambah"}
                    </button>
                </div>
            </form>
        </div>
    );
}
