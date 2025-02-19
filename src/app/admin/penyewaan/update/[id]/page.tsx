"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import { usePenyewaanGetQuery, usePenyewaanPatchMutation } from "@/state/api/dataApi";
import { useParams } from "next/navigation";
import UpdateView from "@/app/admin/penyewaan/update/[id]/update.view";


const UpdatePenyewaanPage = () => {
  const { id } = useParams();
  const numericId = useMemo(() => parseFloat(id), [id]); // Memoize ID parsing

  const [formData, setFormData] = useState({
    penyewaan_tglSewa: "",
    penyewaan_tglKembali: "",
    status_Pembayaran: "",
    status_Pengembalian: "",
    penyewaan_pelanggan_id: numericId,
    penyewaan_totalHarga: 0,
  });

  const [error, setError] = useState("");

  const { data: penyewaanData, isLoading: isPenyewaanLoading } = usePenyewaanGetQuery(id);
  const [updatePenyewaan, { isLoading: isUpdating }] = usePenyewaanPatchMutation();

  useEffect(() => {
    if (penyewaanData && !isPenyewaanLoading) {
      setFormData((prev) => ({
        ...prev,
        penyewaan_tglSewa: penyewaanData.data?.penyewaan_tglSewa || "",
        penyewaan_tglKembali: penyewaanData.data?.penyewaan_tglKembali || "",
        status_Pembayaran: penyewaanData.data?.status_Pembayaran || "",
        status_Pengembalian: penyewaanData.data?.status_Pengembalian || "",
        penyewaan_totalHarga: parseFloat(penyewaanData.data?.penyewaan_totalHarga) || 0,
      }));
    }
  }, [penyewaanData, isPenyewaanLoading]);

  
  const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      },
      []
  );
  
  const handleSubmit = useCallback(
      async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          await updatePenyewaan({ id, data: formData }).unwrap();
          alert("Data berhasil diperbarui!");
        } catch (err: any) {
          console.error("Full error details:", err);
          setError(err?.data?.message || "Gagal memperbarui data.");
        }
      },
      [formData, id, updatePenyewaan]
  );

  return (
      <UpdateView
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isUpdating={isUpdating}
          isPenyewaanLoading={isPenyewaanLoading}
          error={error}
      />
  );
};

export default UpdatePenyewaanPage;
