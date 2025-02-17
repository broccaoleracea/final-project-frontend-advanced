"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import { useAppDispatch } from "@/hooks/hooks";
import {
    useKategoriGetQuery,
    useKategoriPatchMutation,
} from "@/state/api/dataApi";
import {setKategori} from "@/state/api/data/kategoriSlice";

export default function EditKategoriForm() {
    const { id } = useParams(); 
    const router = useRouter();
    const dispatch = useAppDispatch();
    
    const { data: kategoriResponse, isLoading, isError } = useKategoriGetQuery(id);
    const [updateKategori, { isLoading: isUpdating }] = useKategoriPatchMutation();

    // Form state
    const [kategoriNama, setKategoriNama] = useState("");

    
    useEffect(() => {
        if (kategoriResponse?.data) {
        console.log(kategoriResponse?.data?.kategori_nama)
            setKategoriNama(kategoriResponse?.data?.kategori_nama);
            dispatch(setKategori(kategoriResponse.data));
        }
    }, [kategoriResponse, dispatch]);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = { id, data: { kategori_nama: kategoriNama } };
            console.log("Payload:", payload);
        try {
                await updateKategori(payload).unwrap();
                router.push("/admin/kategori");
        } catch (error: any) {
            console.error("Update failed:", error?.data?.message || "Terjadi kesalahan.");
        }
    };

    // Skeleton Loader
    const SkeletonLoader = () => (
        <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
        </div>
    );

    if (isLoading) return <SkeletonLoader />;
    if (isError) return <div className="text-red-600">Gagal memuat kategori.</div>;

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Edit Kategori</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Kategori Name Input */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Nama Kategori</label>
                    <input
                        id="kategoriNama"
                        name="kategoriNama"
                        type="text"
                        value={kategoriNama}
                        onChange={(e) => setKategoriNama(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-yellow-400"
                        required
                    />
                </div>
                
                <button
                    type="submit"
                    disabled={isUpdating}
                    className="w-full bg-yellow-400 text-black py-2 px-4 rounded-lg hover:bg-yellow-500 transition disabled:opacity-50"
                >
                    {isUpdating ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
            </form>
        </div>
    );
}
