"use client"
import React, { useState } from "react";
import { useAlatPostMutation, useKategoriGetQuery } from "@/state/api/dataApi";
import TambahAlat from "@/app/admin/alat/tambah/alat.view";

export default function Alat() {
    const [formData, setFormData] = useState({
        alat_nama: "",
        alat_deskripsi: "",
        alat_hargaPerhari: 0,
        alat_stok: 0,
        alat_kategori_id: "",
    });

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Query untuk mendapatkan data kategori
    const { data: kategoriResponse, isLoading: isKategoriLoading, isError: isKategoriError } =
        useKategoriGetQuery();

    // Mutation untuk menambahkan alat baru
    const [createAlat, { isLoading: isCreating }] = useAlatPostMutation();

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setError(""); // Reset error message
            setSuccessMessage(""); // Reset success message

            // Validasi input
            if (!formData.alat_nama || !formData.alat_kategori_id) {
                setError("Nama alat dan kategori harus diisi.");
                return;
            }

            // Panggil mutation untuk menambahkan alat baru
            await createAlat(formData).unwrap();

            // Reset form setelah berhasil
            setFormData({
                alat_nama: "",
                alat_deskripsi: "",
                alat_hargaPerhari: 0,
                alat_stok: 0,
                alat_kategori_id: "",
            });

            setSuccessMessage("Alat berhasil ditambahkan!");
        } catch (err: any) {
            console.error("Error saat menambahkan alat:", err);
            setError(err?.data?.message || "Gagal menambahkan alat.");
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
