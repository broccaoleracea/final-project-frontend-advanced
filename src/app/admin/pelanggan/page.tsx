/// page.tsx
"use client"
import React, { useState, useMemo, useCallback } from "react";
import PelangganView from "./pelanggan.view";
import {
    usePelangganDeleteMutation,
    usePelangganGetQuery,
} from "@/state/api/dataApi";

export default function PenyewaanPage() {
    const [error, setError] = useState<string>("");
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [pelangganIdToDelete, setPelangganIdToDelete] = useState<number | null>(
        null
    );

    const {
        data: pelangganResponse,
        isLoading: isPelangganLoading,
        isError: isPelangganError,
        refetch: refetchPelanggan,
    } = usePelangganGetQuery();

    const [deletePelanggan, { isLoading: isDeleting }] =
        usePelangganDeleteMutation();

    const pelanggan = useMemo(() => pelangganResponse?.data || [], [pelangganResponse]);

    const handleDelete = useCallback(async () => {
        if (pelangganIdToDelete === null) return;

        try {
            await deletePelanggan(pelangganIdToDelete).unwrap();
            await refetchPelanggan();
            setShowPopup(false);
        } catch (err: any) {
            setError(err?.data?.message || "Failed to delete customer.");
        }
    }, [pelangganIdToDelete, deletePelanggan, refetchPelanggan]);

    const showConfirmationPopup = useCallback((id: number) => {
        setPelangganIdToDelete(id);
        setShowPopup(true);
    }, []);

    return (
        <div className="ml-64">
            <PelangganView
                pelanggan={pelanggan}
                isLoading={isPelangganLoading}
                isError={isPelangganError}
                isDeleting={isDeleting}
                showPopup={showPopup}
                showConfirmationPopup={showConfirmationPopup}
                handleDelete={handleDelete}
                setShowPopup={setShowPopup}
                error={error}
            />
        </div>
    );
}
