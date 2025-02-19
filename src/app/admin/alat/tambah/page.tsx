"use client"
import React, { useState } from "react";
import { useAlatPostMutation, useKategoriGetQuery } from "@/state/api/dataApi";
import TambahAlat from "@/app/admin/alat/tambah/alat.view";
import { toast } from "react-toastify";
import {useRouter} from "next/navigation"


export default function Alat() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        alat_nama: "",
        alat_deskripsi: "",
        alat_hargaPerhari: 0,
        alat_stok: 0,
        alat_kategori_id: "",
    });

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    
    const { data: kategoriResponse, isLoading: isKategoriLoading, isError: isKategoriError } =
        useKategoriGetQuery();
    
    const [createAlat, { isLoading: isCreating }] = useAlatPostMutation();
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setError(""); // Reset error message
            setSuccessMessage(""); // Reset success message
            
            if (!formData.alat_nama || !formData.alat_kategori_id) {
                toast.error("Nama alat dan kategori harus diisi.");
                return;
            }
            
            await createAlat(formData).unwrap();

            // Reset form setelah berhasil
            setFormData({
                alat_nama: "",
                alat_deskripsi: "",
                alat_hargaPerhari: 0,
                alat_stok: 0,
                alat_kategori_id: "",
            });

            toast.success("Alat berhasil ditambah!");
            router.push("/admin/alat");
        } catch (err: any) {
            console.error("Error saat menambahkan alat:", err);
            toast.error("Penambahan alat gagal. Error : " + err?.data?.message || "Gagal menambahkan alat.");
        }
    };

    if (isKategoriLoading) return <div>Loading kategori...</div>;
    if (isKategoriError) return <div>Gagal memuat kategori!</div>;

    const kategori = kategoriResponse?.data || [];

    return (
        <div className="ml-64">
            <TambahAlat
                formData={formData}
                kategori={kategori}
                isCreating={isCreating}
                error={error}
                successMessage={successMessage}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
        </div>
    );
}
