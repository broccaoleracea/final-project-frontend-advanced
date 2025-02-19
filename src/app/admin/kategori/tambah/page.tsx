/// page.tsx
"use client"
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useKategoriPostMutation } from "@/state/api/dataApi";
import KategoriForm from "@/app/admin/kategori/tambah/tambah.kategori";
import {toast} from "react-toastify";


export default function TambahKategoriPage() {
  const [kategoriNama, setKategoriNama] = useState("");
  const [error, setError] = useState("");
  const [postKategori, { isLoading }] = useKategoriPostMutation();
  const router = useRouter();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKategoriNama(e.target.value);
  }, []);

  const handleSubmit = useCallback(
      async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
          await postKategori({ kategori_nama: kategoriNama }).unwrap();
            toast.success("Penambahan kategori berhasil.");
          router.push("/admin/kategori");
        } catch (err: any) {
          toast.error(err?.data?.message || "Gagal menambahkan kategori.");
        }
      },
      [kategoriNama, postKategori, router]
  );

  return (
<<<<<<< HEAD
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-center text-4xl font-bold text-gray-900">Tambah Kategori</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label name="namakat" htmlFor="kategoriNama" className="block text-lg font-medium text-gray-700 mb-2">
                Nama Kategori
              </label>
              <input
                  id="kategoriNama"
                  name="kategoriNama"
                  type="text"
                  required
                  value={kategoriNama}
                  onChange={(e) => setKategoriNama(e.target.value)}
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
=======
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <KategoriForm
            kategoriNama={kategoriNama}
            error={error}
            isLoading={isLoading}
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
>>>>>>> 5ca844feb509b5fa1853ada8c571546455895ef8
      </div>
  );
}

