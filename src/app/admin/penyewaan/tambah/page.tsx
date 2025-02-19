"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
    usePenyewaanPostMutation,
    usePenyewaanDetailPostMutation,
    useAlatGetQuery,
    useAlatPostMutation,
    usePelangganGetQuery, useAlatPatchMutation,
} from "@/state/api/dataApi";
import TambahPenyewaanView from "./tambah.view";
import {toast} from "react-toastify";

export default function PenyewaanPage() {
    const [formData, setFormData] = useState({
        penyewaan_pelanggan_id: "",
        penyewaan_tglSewa: "",
        penyewaan_tglKembali: "",
        status_Pembayaran: "Belum_Dibayar",
        status_Pengembalian: "Belum_Kembali",
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
    const { data: pelangganResponse, isLoading: isPelangganLoading, isError: isPelangganError } =
        usePelangganGetQuery();

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

            const penyewaanResponse = await addPenyewaan(formData).unwrap();
            const penyewaanId = penyewaanResponse?.data?.penyewaan_id;
            if (!penyewaanId) throw new Error("Gagal mendapatkan ID penyewaan.");

            await addPenyewaanDetail({
                penyewaan_detail_penyewaan_id: penyewaanId.toString(),
                ...detailData,
            }).unwrap();

            const selectedAlat = alatResponse?.data.find(
                (alat) => alat.alat_id === Number(detailData.penyewaan_detail_alat_id)
            );
            if (selectedAlat) {
                await updateAlat({
                    id: selectedAlat.alat_id,
                    data: {
                        ...selectedAlat,
                        alat_stok: selectedAlat.alat_stok - detailData.penyewaan_detail_jumlah, 
                    },
                }).unwrap();
            }


            toast.success("Penyewaan berhasil ditambah!");
            useRouter().push("/admin/kategori");
        } catch (err: any) {
            toast.error(err?.data?.message || "Gagal menambahkan penyewaan.");
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
                alatOptions={alatResponse?.data || []}
                pelangganOptions={pelangganResponse?.data || []}
                handleChange={handleChange}
                handleDetailChange={handleDetailChange}
                handleSubmit={handleSubmit}
            />
        </div>
    );
}
