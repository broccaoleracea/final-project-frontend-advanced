/// page.tsx
"use client"
import React, { useEffect } from "react";
import AdminView from "./adminView";
import { useAlatGetQuery, usePelangganDataGetQuery } from "@/state/api/dataApi";
import { useAppDispatch } from "@/hooks/hooks";
import { setAlat } from "@/state/api/data/alatSlice";
import FullPageSpinner from "@/Components/Spinner/FullPageSpinner";

export default function Pelanggan() {
    const dispatch = useAppDispatch();
    const { data: alatResponse, isLoading, isError } = useAlatGetQuery();
    const { data: pelanggan } = usePelangganDataGetQuery();

    useEffect(() => {
        if (alatResponse) {
            dispatch(setAlat(alatResponse.data));
        }
    }, [alatResponse, dispatch]);

    if (isLoading) {
        return <FullPageSpinner />;
    }

    if (isError) {
        return (
            <div className="text-red-600 text-center py-8">
                Gagal memuat alat. Silakan coba lagi nanti.
            </div>
        );
    }

    const alat = alatResponse?.data || [];
    const totalStok = alat.reduce((total, item) => total + (item.alat_stok || 0), 0);
    const totalBarang = alat.length;
    const totalKategori = Array.from(new Set(alat.map((item) => item.kategori))).length;

    return (
        <div className="ml-64">
            <AdminView
                totalBarang={totalBarang}
                totalStok={totalStok}
                totalKategori={totalKategori}
            />
        </div>
    );
}
