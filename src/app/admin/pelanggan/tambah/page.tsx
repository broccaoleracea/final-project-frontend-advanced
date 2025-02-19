"use client"
import React, { useState, useMemo } from "react";

import {
    usePelangganPostMutation,
    usePelangganDataPostMutation,
    usePelangganDataGetQuery,
} from "@/state/api/dataApi";
import TambahPelanggan from "@/app/admin/pelanggan/tambah/tambah.pelanggan.view";

export default function KategoriPage() {
    // State untuk data pelanggan utama
    const [formData, setFormData] = useState({
        pelanggan_nama: "",
        pelanggan_alamat: "",
        pelanggan_noTelp: "",
        pelanggan_email: "",
    });
    
    const [selectedJenis, setSelectedJenis] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    
    const [addPelanggan, { isLoading: isAddingPelanggan }] =
        usePelangganPostMutation();
    const [addPelangganData, { isLoading: isAddingPelangganData }] =
        usePelangganDataPostMutation();
    
    
    const jenisPelangganOptions = useMemo(() => {
        return ["KTP", "SIM"];
    }, []);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle file upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setError("");
            setSuccessMessage("");

            if (!formData.pelanggan_nama || !formData.pelanggan_alamat || !formData.pelanggan_noTelp || !formData.pelanggan_email || !selectedJenis || !file) {
                setError("Semua field harus diisi.");
                return;
            }
            
            const pelangganResponse = await addPelanggan(formData).unwrap();
            const pelangganId = pelangganResponse?.data?.pelanggan_id;

            if (!pelangganId) throw new Error("Gagal mendapatkan ID pelanggan.");

            const formDataWithFile = new FormData();
            formDataWithFile.append("pelanggan_data_pelanggan_id", pelangganId);
            formDataWithFile.append("pelanggan_data_jenis", selectedJenis);
            formDataWithFile.append("pelanggan_data_file", file);

            await addPelangganData(formDataWithFile).unwrap();

            setSuccessMessage("Pelanggan berhasil ditambahkan!");
            setFormData({ pelanggan_nama: "", pelanggan_alamat: "", pelanggan_noTelp: "", pelanggan_email: "" });
            setSelectedJenis("");
            setFile(null);
        } catch (err: any) {
            setError(err?.data?.message || "Gagal menambahkan pelanggan.");
        }
    };

    return (
        <div className="ml-64">
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
        </div>
    );
}
