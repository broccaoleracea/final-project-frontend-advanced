"use client";
import React, {useState} from "react";
import KategoriView from "./kategori.view";
import {useKategoriDeleteMutation, useKategoriGetQuery} from "@/state/api/dataApi";
// export interface PageProps {
//     interface Kategori {
//     id: number;
//     name: string;
// }
//
// interface UseKategoriGetQueryResponse {
//     data: Kategori[] | undefined;
//     refetch: () => void;
//     isLoading: boolean;
//     isError: boolean;
// }
//
// interface UseKategoriDeleteMutationResponse {
//     del: (id: number) => Promise<{ unwrap: () => Promise<void> }>;
//     isLoading: boolean;
//     isError: boolean;
// }
//
// }

export default function KategoriPage() {
    const [error, setError] = useState("");
    const { data: kategoriResponse, refetch, isLoading: isKategoriLoading, isError: isKategoriError } = useKategoriGetQuery();
    const {del,  isLoading: isDeleting , isError:isDeletingError} = useKategoriDeleteMutation();
    const handleDelete = async (id: number) => {
        try {
            await del(id).unwrap();
            await refetch();
        } catch (err: any) {
            console.error("Error saat menghapus alat:", err);
            setError(err?.data?.message || "Gagal menghapus alat.");
        }
    };
  return (
    <div className="ml-64">
      <KategoriView />
    </div>
  );
}
