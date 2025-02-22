"use client";

import React, { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
    usePelangganPostMutation,
    usePelangganDataPostMutation,
    useKategoriGetQuery,
} from "@/state/api/dataApi";
import TambahPelanggan from "@/app/admin/pelanggan/tambah/tambah.pelanggan.view";
import { toast } from "react-toastify";
import {Pelanggan} from "@/types/dataTypes";

interface PelangganFormData {
    pelanggan_nama: string;
    pelanggan_alamat: string;
    pelanggan_noTelp: string;
    pelanggan_email: string;
}

export default function TambahPelangganContainer() {
    const router = useRouter();

    
    const [formData, setFormData] = useState<PelangganFormData>({
        pelanggan_nama: "",
        pelanggan_alamat: "",
        pelanggan_noTelp: "",
        pelanggan_email: "",
    });
    
    const [selectedJenis, setSelectedJenis] = useState<string>("");
    
    const [file, setFile] = useState<File | null>(null);
    
    const [error, setError] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    
    const { data: kategoriResponse, isLoading: isKategoriLoading, isError: isKategoriError } =
        useKategoriGetQuery();
    
    const [addPelanggan, { isLoading: isAddingPelanggan }] = usePelangganPostMutation();
    // Mutation hook for uploading pelanggan data (e.g. file).
    const [addPelangganData, { isLoading: isAddingPelangganData }] =
        usePelangganDataPostMutation();

    
    const jenisPelangganOptions = useMemo<string[]>(() => ["KTP", "SIM"], []);
    
    const handleChange = useCallback(
        (
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
        },
        []
    );


    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    }, []);


    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setError("");
            setSuccessMessage("");

            // Validate that all fields are filled.
            if (
                !formData.pelanggan_nama ||
                !formData.pelanggan_alamat ||
                !formData.pelanggan_noTelp ||
                !formData.pelanggan_email ||
                !selectedJenis ||
                !file
            ) {
                setError("Semua field harus diisi.");
                return;
            }

            try {
                const pelangganResponse = await addPelanggan(formData).unwrap();
                const pelangganId = Array.isArray(pelangganResponse?.data)
                    ? (pelangganResponse.data as Pelanggan[])[0]?.pelanggan_id
                    : (pelangganResponse?.data as Pelanggan)?.pelanggan_id;
                if (!pelangganId) return toast.error("Gagal mendapatkan ID pelanggan.");
                
                const formDataWithFile = new FormData();
                formDataWithFile.append("pelanggan_data_pelanggan_id", String(pelangganId));
                formDataWithFile.append("pelanggan_data_jenis", selectedJenis);
                formDataWithFile.append("pelanggan_data_file", file);
                
                await addPelangganData(formDataWithFile).unwrap();
                
                setFormData({
                    pelanggan_nama: "",
                    pelanggan_alamat: "",
                    pelanggan_noTelp: "",
                    pelanggan_email: "",
                });
                setSelectedJenis("");
                setFile(null);

                toast.success("Pelanggan berhasil ditambah!");
                router.push("/admin/pelanggan");
            } catch (err: any) {
                console.error("Error saat menambahkan pelanggan:", err);
                toast.error(err?.data?.message || "Gagal menambahkan pelanggan.");
            }
        },
        [formData, selectedJenis, file, addPelanggan, addPelangganData, router]
    );

    if (isKategoriLoading) return <div>Loading kategori...</div>;
    if (isKategoriError) return <div>Gagal memuat kategori!</div>;


    const kategori = kategoriResponse?.data || [];

    return (
        
            <TambahPelanggan
                formData={formData}
                selectedJenis={selectedJenis}
                file={file}
                error={error}
                successMessage={successMessage}
                jenisPelangganOptions={jenisPelangganOptions}
                isAdding={isAddingPelanggan || isAddingPelangganData}
                onChange={handleChange}
                onJenisChange={setSelectedJenis}
                onFileChange={handleFileChange}
                onSubmit={handleSubmit}
            />

    );
}
