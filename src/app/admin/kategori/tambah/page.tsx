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
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <KategoriForm
            kategoriNama={kategoriNama}
            error={error}
            isLoading={isLoading}
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
      </div>
  );
}

