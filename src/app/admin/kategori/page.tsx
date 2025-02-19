"use client";
import React, {useState} from "react";
import KategoriView from "./kategori.view";
import {useKategoriDeleteMutation, useKategoriGetQuery} from "@/state/api/dataApi";
import FullPageSpinner from "@/Components/Spinner/FullPageSpinner";
import {toast} from "react-toastify";

export default function KategoriPage() {
    const [error, setError] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [kategoriIdToDelete, setKategoriIdToDelete] = useState<number | null>(null);

    const {
        data: kategoriResponse,
        isLoading: isKategoriLoading,
        refetch,
        isError: isKategoriError,
        refetch: refetchKategori,
    } = useKategoriGetQuery();

    const [del, {isLoading: isDeleting}] = useKategoriDeleteMutation();

    const handleDelete = async () => {
        if (kategoriIdToDelete === null) return;
        try {
            console.log("Menghapus kategori dengan ID:", kategoriIdToDelete);
            await del(kategoriIdToDelete).unwrap();
            toast.success("Penghapusan data berhasil.");
            await refetchKategori();
            setShowPopup(false);
        } catch (err: any) {
            toast.error(err?.data?.message || "Gagal menghapus kategori.");
        }
    };

    const showConfirmationPopup = (id: number) => {
        setKategoriIdToDelete(id);
        setShowPopup(true);
    };

    if (isKategoriLoading) {
        return <FullPageSpinner/>;
    }

    if (isKategoriError) {
        return (
            <div className="text-red-600 text-center py-8">
                Gagal memuat data. Silakan coba lagi nanti.
            </div>
        );
    }

    const kategori = kategoriResponse?.data || [];

    return (
        <div className="ml-64">
            <KategoriView
                kategori={kategori}
                isDeleting={isDeleting}
                showPopup={showPopup}
                setShowPopup={setShowPopup}
                error={error}
                handleDelete={handleDelete}
                showConfirmationPopup={showConfirmationPopup}
            />
        </div>
    );
}
