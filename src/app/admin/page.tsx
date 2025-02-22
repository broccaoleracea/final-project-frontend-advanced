"use client";

import React from "react";
import AdminView from "./adminView";
import { useAlatGetQuery, usePelangganDataGetQuery } from "@/state/api/dataApi";
import FullPageSpinner from "@/Components/Spinner/FullPageSpinner";

export default function Pelanggan() {
    const { data: alatResponse, isLoading, isError } = useAlatGetQuery();

    if (isLoading) {
        return <FullPageSpinner />;
    }

    if (isError || !alatResponse) {
        return (
            <div className="text-red-600 text-center py-8">
                Gagal memuat alat. Silakan coba lagi nanti.
            </div>
        );
    }
    
    const alat = alatResponse.data || [];
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
