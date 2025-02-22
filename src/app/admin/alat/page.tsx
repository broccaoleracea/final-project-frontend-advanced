"use client";
import React, {useCallback, useState, useMemo} from "react";
import AlatView from "./alatView";
import {
    useAlatGetQuery,
    useKategoriGetQuery,
    useAlatDeleteMutation,
} from "@/state/api/dataApi";
import DeletePopup from "@/app/portal/page";
import {toast} from "react-toastify";

export default function Alat() {
    const [showPopup, setShowPopup] = useState(false);
    const [alatIdToDelete, setAlatIdToDelete] = useState<number | null>(null);
    const [error, setError] = useState("");

    const {
        data: alatResponse,
        refetch: refetchAlat,
        isLoading: isAlatLoading,
        isError: isAlatError,
    } = useAlatGetQuery();
    const {
        data: kategoriResponse,
        isLoading: isKategoriLoading,
        isError: isKategoriError,
    } = useKategoriGetQuery();

    const [deleteAlat, {isLoading: isDeleting}] = useAlatDeleteMutation();

    const handleDelete = useCallback(async () => {
        if (alatIdToDelete === null) return;
        try {
            await deleteAlat(alatIdToDelete).unwrap();
            toast.success("Penghapusan alat berhasil.");
            await refetchAlat();
            setShowPopup(false);
        } catch (err: any) {
            toast.error("Penghapusan gagal. Error : " + err?.data?.message || "Gagal menghapus alat.");
        }
    }, [alatIdToDelete, deleteAlat, refetchAlat]);

    const showConfirmationPopup = useCallback((id: number) => {
        setAlatIdToDelete(id);
        setShowPopup(true);
    }, []);

    const alatWithKategori = useMemo(() => {
        const alat = alatResponse?.data || [];
        const kategori = kategoriResponse?.data || [];
        return alat.map((item) => {
            const kategoriData = kategori.find(
                (kat) => kat.kategori_id === item.alat_kategori_id
            );
            return {
                ...item,
                kategori_nama: kategoriData ? kategoriData.kategori_nama : "-",
            };
        });
    }, [alatResponse, kategoriResponse]);

    return (
        <>
            <AlatView
                alatWithKategori={alatWithKategori}
                isLoading={isAlatLoading || isKategoriLoading}
                isError={isAlatError || isKategoriError}
                isDeleting={isDeleting}
                showPopup={showPopup}
                showConfirmationPopup={showConfirmationPopup}
                setShowPopup={setShowPopup}
                handleDelete={handleDelete}
            />
            {showPopup && <DeletePopup onClose={() => setShowPopup(false)} onDelete={handleDelete}/>}
        </>
    );
}
