"use client";

import React from "react";
import AdminView from "./adminView";
import { useAlatGetQuery, useKategoriGetQuery, usePelangganDataGetQuery } from "@/state/api/dataApi";
import FullPageSpinner from "@/components/Spinner/FullPageSpinner";

export default function Pelanggan() {
    const { data: kategoriResponse } = useKategoriGetQuery();
    const { data: alatResponse, isLoading, isError } = useAlatGetQuery();

    if (isLoading) {
        return <FullPageSpinner />;
    }

    if (isError || !alatResponse || !kategoriResponse) {
        throw new Error("Gagal memuat data.")
        ;
    }


    const alat = alatResponse.data || [];
    const kategori = kategoriResponse.data || [];
    const totalStok = alat.reduce((total, item) => total + (item.alat_stok || 0), 0);
    const totalBarang = alat.length;
    const totalKategori = kategori.length;

    return (
            <AdminView
                totalBarang={totalBarang}
                totalStok={totalStok}
                totalKategori={totalKategori}
            />
    );
}
