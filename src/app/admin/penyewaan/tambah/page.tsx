"use client";
import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
    usePenyewaanPostMutation,
    usePenyewaanDetailPostMutation,
    useAlatGetQuery,
    usePelangganGetQuery,
    useAlatPatchMutation,
} from "@/state/api/dataApi";
import TambahPenyewaanView from "./tambah.view";
import { toast } from "react-toastify";
import {Alat, Pelanggan, Penyewaan} from "@/types/dataTypes";

export default function PenyewaanPage() {
    const [formData, setFormData] = useState({
        penyewaan_pelanggan_id: "",
        penyewaan_tglSewa: "",
        penyewaan_tglKembali: "",
        status_Pembayaran: "Belum_Dibayar" as "Belum_Dibayar",
        status_Pengembalian: "Belum_Kembali" as "Belum_Kembali" | "Sudah_Kembali" | undefined,
        penyewaan_totalHarga: 0,
    });

    const [detailData, setDetailData] = useState({
        penyewaan_detail_alat_id: "",
        penyewaan_detail_jumlah: 0,
        penyewaan_detail_subHarga: 0,
    });

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const router = useRouter();

    const { data: alatResponse, isLoading: isAlatLoading } = useAlatGetQuery();
    const { data: pelangganResponse, isLoading: isPelangganLoading, isError: isPelangganError } = usePelangganGetQuery();

    const [addPenyewaan, { isLoading: isAddingPenyewaan }] = usePenyewaanPostMutation();
    const [addPenyewaanDetail, { isLoading: isAddingPenyewaanDetail }] = usePenyewaanDetailPostMutation();
    const [updateAlat, { isLoading: isUpdatingAlat }] = useAlatPatchMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setDetailData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setError("");
            setSuccessMessage("");

            if (
                !formData.penyewaan_pelanggan_id ||
                !formData.penyewaan_tglSewa ||
                !formData.penyewaan_tglKembali ||
                !detailData.penyewaan_detail_alat_id ||
                !detailData.penyewaan_detail_jumlah
            ) {
                setError("Semua field wajib diisi.");
                return;
            }
            const date1 = new Date(formData.penyewaan_tglSewa);
            const date2 = new Date(formData.penyewaan_tglKembali);

            //@ts-ignore
            const diffInMs = Math.abs(date2 - date1);

            const msInDay = 1000 * 60 * 60 * 24;
            const diffInDays = diffInMs / msInDay;
            const penyewaanResponse = await addPenyewaan({
                ...formData,
                penyewaan_pelanggan_id: Number(formData.penyewaan_pelanggan_id),
                status_Pembayaran: formData.status_Pembayaran as "Belum_Dibayar" | "Lunas" | "DP",
                penyewaan_totalHarga : detailData.penyewaan_detail_subHarga * detailData.penyewaan_detail_jumlah * diffInDays
            }).unwrap();
            const penyewaanId = Array.isArray(penyewaanResponse?.data)
                ? (penyewaanResponse.data as Penyewaan[])[0]?.penyewaan_id
                : (penyewaanResponse?.data as Penyewaan)?.penyewaan_id;
            if (!penyewaanId) return toast.error("Gagal mendapatkan ID penyewaan.");

        
            await addPenyewaanDetail({
                penyewaan_detail_penyewaan_id: penyewaanId.toString(),
                ...detailData,
                penyewaan_detail_alat_id: Number(detailData.penyewaan_detail_alat_id),
            }).unwrap();

            // Handle 'alatResponse' array check
            const selectedAlat = Array.isArray(alatResponse?.data)
                ? (alatResponse.data as Alat[]).find(
                    (alat) => alat.alat_id === Number(detailData.penyewaan_detail_alat_id)
                )
                : alatResponse?.data;

            if (selectedAlat) {
                await updateAlat({
                    id: selectedAlat.alat_id,
                    data: {
                        ...selectedAlat,
                        alat_stok: selectedAlat.alat_stok - Number(detailData.penyewaan_detail_jumlah),
                    },
                }).unwrap();
            }

            toast.success("Penyewaan berhasil ditambah!");
            router.push("/admin/penyewaan");
        } catch (error: any) {
            toast.error("Gagal menambah penyewaan. Error: " + (error?.data?.message || "Terjadi kesalahan."));
        }
    };

    return (
        <div className="ml-64">
            <TambahPenyewaanView
                formData={formData}
                detailData={detailData}
                error={error}
                successMessage={successMessage}
                isLoading={isAlatLoading || isPelangganLoading}
                isPelangganError={isPelangganError}
                isSubmitting={isAddingPenyewaan || isAddingPenyewaanDetail || isUpdatingAlat}
                alatOptions={Array.isArray(alatResponse?.data) ? alatResponse?.data : []} 
                pelangganOptions={Array.isArray(pelangganResponse?.data) ? pelangganResponse?.data : []} 
                handleChange={handleChange}
                handleDetailChange={handleDetailChange}
                handleSubmit={handleSubmit}
            />
        </div>
    );
}
