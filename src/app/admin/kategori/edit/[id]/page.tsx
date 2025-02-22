"use client";
import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useKategoriGetQuery,
  useKategoriPatchMutation,
} from "@/state/api/dataApi";
import EditKategoriForm from "./edit.kategori.view";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/state/store";

export default function EditKategoriPage() {
  const { id } = useParams();
  const router = useRouter();

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useKategoriGetQuery(Number(id), {
    selectFromResult: ({ data, isLoading, isError, error }) => ({
      data,
      isLoading,
      isError,
      error,
    }),
  });

  const kategoriData = Array.isArray(response?.data)
    ? response.data[0]
    : response?.data;
  const dispatch = useAppDispatch();
  const [kategoriNama, setKategoriNama] = useState("");

  const [updateKategori, { isLoading: isUpdating }] =
    useKategoriPatchMutation();
    
  useEffect(() => {
    if (kategoriData) {
      setKategoriNama(kategoriData.kategori_nama || "");
    }
  }, [kategoriData]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // const formData = new FormData(e.currentTarget);
      // const kategoriNama = formData.get('kategori_nama') as string;
console.log(kategoriNama);
      try {
        await updateKategori({
          id: Number(id),
          data: { kategori_nama: kategoriNama },
        }).unwrap();

        toast.success("Penambahan kategori berhasil.");
        router.push("/admin/kategori");
      } catch (error: any) {
        toast.error(
          `Edit data gagal. ${error?.data?.message || "Terjadi kesalahan."}`
        );
      }
    },
    [id, updateKategori, router]
  );
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKategoriNama(e.target.value);
    console.log(e.target.value)
  }, []);
  return (
    <EditKategoriForm
      kategoriNama={kategoriNama}
      isLoading={isLoading}
      isUpdating={isUpdating}
      isError={isError}
      onChangeAction={handleChange}
      onSubmitAction={handleSubmit}
    />
  );
}
