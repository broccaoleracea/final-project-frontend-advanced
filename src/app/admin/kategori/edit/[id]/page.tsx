/// page.tsx
"use client"
import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/hooks";
import { useKategoriGetQuery, useKategoriPatchMutation } from "@/state/api/dataApi";
import { setKategori } from "@/state/api/data/kategoriSlice";
import EditKategoriForm from "./edit.kategori.view";
import {toast} from "react-toastify";

export default function EditKategoriPage() {
    const { id } = useParams();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { data: kategoriResponse, isLoading, isError } = useKategoriGetQuery(id);
    const [updateKategori, { isLoading: isUpdating }] = useKategoriPatchMutation();
    const [kategoriNama, setKategoriNama] = useState("");

    useEffect(() => {
        if (kategoriResponse?.data) {
            setKategoriNama(kategoriResponse.data.kategori_nama);
            dispatch(setKategori(kategoriResponse.data));
        }
    }, [kategoriResponse, dispatch]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setKategoriNama(e.target.value);
    }, []);

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            const payload = { id, data: { kategori_nama: kategoriNama } };
            try {
                await updateKategori(payload).unwrap();
                toast.success("Penambahan kategori berhasil.");
                router.push("/admin/kategori");
            } catch (error: any) {
                toast.error("Edit data gagal.Error :", error?.data?.message || "Terjadi kesalahan.");
            }
        },
        [id, kategoriNama, updateKategori, router]
    );

    return (
        <EditKategoriForm
            kategoriNama={kategoriNama}
            isLoading={isLoading}
            isUpdating={isUpdating}
            isError={isError}
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    );
}
