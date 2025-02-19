/// page.tsx
"use client"
import PenyewaanView from "./penyewaan.view";
import { useMemo } from "react";
import {
    usePenyewaanGetQuery,
    usePenyewaanDeleteMutation,
    usePelangganGetQuery,
    useAlatGetQuery,
} from "@/state/api/dataApi";

export default function PenyewaanPage() {
    // Fetch data
    const { data: penyewaanResponse, isLoading: isPenyewaanLoading, isError: isPenyewaanError, refetch } = usePenyewaanGetQuery();
    const { data: pelangganResponse, isLoading: isPelangganLoading, isError: isPelangganError } = usePelangganGetQuery();
    const { data: alatResponse, isLoading: isAlatLoading, isError: isAlatError } = useAlatGetQuery();
    const [deletePenyewaan, { isLoading: isDeleting }] = usePenyewaanDeleteMutation();

    // Memoized maps for lookups
    const pelangganMap = useMemo(() => new Map(pelangganResponse?.data?.map(p => [p.pelanggan_id, p])), [pelangganResponse]);
    const alatMap = useMemo(() => new Map(alatResponse?.data?.map(a => [a.alat_id, a])), [alatResponse]);

    // Handle deletion
    const handleDelete = async (id: number) => {
        try {
            await deletePenyewaan(id).unwrap();
            refetch();
        } catch (error) {
            console.error("Error deleting penyewaan:", error);
        }
    };

    // Calculate total price
    const calculateTotalPrice = (hargaPerHari: number, tglPinjam: string, tglKembali: string): number => {
        const startDate = new Date(tglPinjam);
        const endDate = new Date(tglKembali);
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return 0;
        const dayDifference = Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
        return hargaPerHari * dayDifference;
    };

    return (
        <PenyewaanView
            isLoading={isPenyewaanLoading || isPelangganLoading || isAlatLoading}
            isError={isPenyewaanError || isPelangganError || isAlatError}
            rentedItems={penyewaanResponse?.data || []}
            pelangganMap={pelangganMap}
            alatMap={alatMap}
            calculateTotalPrice={calculateTotalPrice}
            handleDelete={handleDelete}
            isDeleting={isDeleting}
        />
    );
}
