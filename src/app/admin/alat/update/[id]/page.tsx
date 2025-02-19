"use client";

import { useEffect, useState } from "react";
import {useParams, useRouter} from "next/navigation";
import { useAlatGetQuery, useKategoriGetQuery, useAlatPatchMutation } from "@/state/api/dataApi";
import UpdateAlatView from "./update.view";
import {FormDataType, UpdateAlatProps} from "@/app/admin/alat/update/[id]/update.type";


const UpdateAlatContainer = () => {
  const {id}=useParams()
  const [formData, setFormData] = useState<FormDataType>({
    alat_nama: "",
    alat_deskripsi: "",
    alat_hargaPerhari: 0,
    alat_stok: 0,
    alat_kategori_id: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  const { data: alatDetailResponse, isLoading: isAlatLoading, isError: isAlatError } =
      useAlatGetQuery(id);
  const { data: kategoriResponse, isLoading: isKategoriLoading, isError: isKategoriError } =
      useKategoriGetQuery();
  const [updateAlat, { isLoading: isUpdating }] = useAlatPatchMutation();

  useEffect(() => {
    if (alatDetailResponse?.data) {
      const alatData = alatDetailResponse.data;
      setFormData({
        alat_nama: alatData.alat_nama || "",
        alat_deskripsi: alatData.alat_deskripsi || "",
        alat_hargaPerhari: alatData.alat_hargaPerhari || 0,
        alat_stok: alatData.alat_stok || 0,
        alat_kategori_id: alatData.alat_kategori_id?.toString() || "",
      });
    }
  }, [alatDetailResponse]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!formData.alat_nama || !formData.alat_kategori_id) {
      setError("Nama alat dan kategori harus diisi.");
      return;
    }

    try {
      await updateAlat({ id: id, data: formData }).unwrap();
      setSuccessMessage("Alat berhasil diperbarui!");
      setTimeout(() => router.push("/admin/alat"), 1000);
    } catch (err: any) {
      setError(err?.data?.message || "Gagal memperbarui alat.");
    }
  };

  if (isAlatLoading || isKategoriLoading) {
    return (
        <div className="min-h-screen flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500"></div>
        </div>
    );
  }

  if (isAlatError || isKategoriError || !alatDetailResponse?.data) {
    return (
        <div className="min-h-screen flex justify-center items-center">
          <div className="text-red-600 text-lg font-semibold">Gagal memuat data!</div>
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
