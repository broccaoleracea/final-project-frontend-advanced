"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useAlatGetQuery,
  useKategoriGetQuery,
  useAlatPatchMutation,
} from "@/state/api/dataApi";
import UpdateAlatView from "./update.view";
import { FormDataType } from "@/app/admin/alat/update/[id]/update.type";
import { toast } from "react-toastify";
import FullPageSpinner from "@/components/Spinner/FullPageSpinner";

const UpdateAlatContainer: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState<FormDataType>({
    alat_nama: "",
    alat_deskripsi: "",
    alat_hargaPerhari: 0,
    alat_stok: 0,
    alat_kategori_id: "",
  });

  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  
  const {
    data: alatDetailResponse,
    isLoading: isAlatLoading,
    isError: isAlatError,
  } = useAlatGetQuery(Number(id));
  
  const {
    data: kategoriResponse,
    isLoading: isKategoriLoading,
    isError: isKategoriError,
  } = useKategoriGetQuery();
  
  const [updateAlat, { isLoading: isUpdating }] = useAlatPatchMutation();

  useEffect(() => {
    if (alatDetailResponse?.data) {
      let alatData;
      if (Array.isArray(alatDetailResponse.data)) {
        alatData = alatDetailResponse.data[0];
      } else {
        alatData = alatDetailResponse.data;
      }
      setFormData({
        alat_nama: alatData.alat_nama || "",
        alat_deskripsi: alatData.alat_deskripsi || "",
        alat_hargaPerhari: alatData.alat_hargaPerhari || 0,
        alat_stok: alatData.alat_stok || 0,
        alat_kategori_id: alatData.alat_kategori_id?.toString() || "",
      });
    }
  }, [alatDetailResponse]);


  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError("");
      setSuccessMessage("");

      if (!formData.alat_nama || !formData.alat_kategori_id) {
        setError("Nama alat dan kategori harus diisi.");
        return;
      }
      
      const payload = {
        ...formData,
        alat_kategori_id: Number(formData.alat_kategori_id),
      };

      try {
        await updateAlat({ id: Number(id), data: payload }).unwrap();
        toast.success("Alat berhasil diperbarui!");
        router.push("/admin/alat");
      } catch (err: any) {
        toast.error(
          "Gagal memperbarui alat. Error: " +
            (err?.data?.message || "Terjadi kesalahan.")
        );
      }
    },
    [formData, updateAlat, id, router]
  );

  if (isAlatLoading || isKategoriLoading) {
    return (
    <FullPageSpinner />
    );
  }

  if (isAlatError || isKategoriError || !alatDetailResponse?.data) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-red-600 text-lg font-semibold">
          Gagal memuat data!
        </div>
      </div>
    );
  }

  return (
    <UpdateAlatView
      formData={formData}
      error={error}
      successMessage={successMessage}
      kategori={kategoriResponse?.data || []}
      isUpdating={isUpdating}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export default UpdateAlatContainer;
