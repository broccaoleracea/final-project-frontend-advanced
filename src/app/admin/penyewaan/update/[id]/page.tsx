// "use client";
// import React, { useState, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import {
//     usePenyewaanPostMutation as usePenyewaanPatchMutation,
//     usePenyewaanDetailPostMutation as usePenyewaanDetailPatchMutation,
//     useAlatGetQuery,
//     usePelangganGetQuery,
//     useAlatPatchMutation,
// } from "@/state/api/dataApi";
// import EditPenyewaanView from "./update.view";
// import { toast } from "react-toastify";
// import {Alat, Pelanggan, Penyewaan} from "@/types/dataTypes";

// export default function PenyewaanPage() {
//     const [formData, setFormData] = useState({
//         penyewaan_pelanggan_id: "",
//         penyewaan_tglSewa: "",
//         penyewaan_tglKembali: "",
//         status_Pembayaran: "Belum_Dibayar" as "Belum_Dibayar",
//         status_Pengembalian: "Belum_Kembali" as "Belum_Kembali" | "Sudah_Kembali" ,
//         penyewaan_totalHarga: 0,
//     });

//     const [detailData, setDetailData] = useState({
//         penyewaan_detail_alat_id: "",
//         penyewaan_detail_jumlah: 0,
//         penyewaan_detail_subHarga: 0,
//     });

//     const [error, setError] = useState("");
//     const [successMessage, setSuccessMessage] = useState("");

//     const router = useRouter();

//     const { data: alatResponse, isLoading: isAlatLoading } = useAlatGetQuery();
//     const { data: pelangganResponse, isLoading: isPelangganLoading, isError: isPelangganError } = usePelangganGetQuery();

//     const [editPenyewaan, { isLoading: isAddingPenyewaan }] = usePenyewaanPatchMutation();
//     const [editPenyewaanDetail, { isLoading: isAddingPenyewaanDetail }] = usePenyewaanDetailPatchMutation();
//     const [updateAlat, { isLoading: isUpdatingAlat }] = useAlatPatchMutation();

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         const { name, value } = e.target;
//         setDetailData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             setError("");
//             setSuccessMessage("");

//             if (
//                 !formData.penyewaan_pelanggan_id ||
//                 !formData.penyewaan_tglSewa ||
//                 !formData.penyewaan_tglKembali ||
//                 !detailData.penyewaan_detail_alat_id ||
//                 !detailData.penyewaan_detail_jumlah
//             ) {
//                 setError("Semua field wajib diisi.");
//                 return;
//             }

//             const penyewaanResponse = await editPenyewaan({
//                 ...formData,
//                 penyewaan_pelanggan_id: Number(formData.penyewaan_pelanggan_id),
//                 status_Pembayaran: formData.status_Pembayaran as "Belum_Dibayar" | "Lunas" | "DP",
//             }).unwrap();
//             const penyewaanId = Array.isArray(penyewaanResponse?.data)
//                 ? (penyewaanResponse.data as Penyewaan[])[0]?.penyewaan_id
//                 : (penyewaanResponse?.data as Penyewaan)?.penyewaan_id;
//             if (!penyewaanId) return toast.error("Gagal mendapatkan ID penyewaan.");

        
//             await editPenyewaanDetail({
//                 penyewaan_detail_penyewaan_id: penyewaanId.toString(),
//                 ...detailData,
//                 penyewaan_detail_alat_id: Number(detailData.penyewaan_detail_alat_id),
//             }).unwrap();

//             const selectedAlat = Array.isArray(alatResponse?.data)
//                 ? (alatResponse.data as Alat[]).find(
//                     (alat) => alat.alat_id === Number(detailData.penyewaan_detail_alat_id)
//                 )
//                 : alatResponse?.data;

//             if (selectedAlat) {
//                 await updateAlat({
//                     id: selectedAlat.alat_id,
//                     data: {
//                         ...selectedAlat,
//                         alat_stok: selectedAlat.alat_stok - Number(detailData.penyewaan_detail_jumlah),
//                     },
//                 }).unwrap();
//             }

//             toast.success("Penyewaan berhasil ditambah!");
//             router.push("/admin/penyewaan");
//         } catch (error: any) {
//             toast.error("Gagal menambah penyewaan. Error: " + (error?.data?.message || "Terjadi kesalahan."));
//         }
//     };

//     return (
//         <EditPenyewaanView
//         formData={formData}
//         detailData={detailData}
//         isUpdating={isAddingPenyewaan || isAddingPenyewaanDetail || isUpdatingAlat}
//         isPenyewaanLoading={isAlatLoading || isPelangganLoading || isPelangganError}
//         error={error}
//         pelangganOptions={Array.isArray(pelangganResponse?.data) ? pelangganResponse.data : []}
//         alatOptions={Array.isArray(alatResponse?.data) ? alatResponse.data : []}  // <-- Add this
//         handleChange={handleChange}
//         handleDetailChange={handleDetailChange}
//         handleSubmit={handleSubmit}
//       />
      
//     );
// }
"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  usePenyewaanGetQuery, // Hook to fetch penyewaan details
  usePelangganGetQuery,
  useAlatGetQuery,
  usePenyewaanPatchMutation,
  usePenyewaanDetailPatchMutation,
  useAlatPatchMutation,
  usePenyewaanDetailGetQuery,
} from "@/state/api/dataApi";
import EditPenyewaanView from "./update.view";
import { toast } from "react-toastify";
import { Alat, Penyewaan, PenyewaanDetail } from "@/types/dataTypes";

export default function PenyewaanPage() {
  const { id } = useParams(); // Assume you're passing an ID for the penyewaan
  const router = useRouter();

  // Initial state 
  const [formData, setFormData] = useState({
    penyewaan_pelanggan_id: "",
    penyewaan_tglSewa: "",
    penyewaan_tglKembali: "",
    status_Pembayaran: "Belum_Dibayar" as "Belum_Dibayar" | "Lunas" | "DP",
    status_Pengembalian: "Belum_Kembali" as "Belum_Kembali" | "Sudah_Kembali",
    penyewaan_totalHarga: 0,
  });

  const [detailData, setDetailData] = useState({
    penyewaan_detail_alat_id: "",
    penyewaan_detail_jumlah: 0,
    penyewaan_detail_subHarga: 0,
  });


  const {
    data: penyewaanResponse,
    isLoading: isPenyewaanLoading,
    isError: isPenyewaanError,
  } = usePenyewaanGetQuery(Number(id));
  //@ts-ignore
    const penyewaanDetailResponse = penyewaanResponse?.data.penyewaan_detail[0];

  //@ts-ignore
  // const penyewaanId = penyewaanDetailAllResponse?.data?.penyewaan_detail_penyewaan_id;
  
    useEffect(() => {
        if (penyewaanResponse?.data) {
            const penyewaanData = penyewaanResponse.data;
            setFormData({
                //@ts-ignore
                penyewaan_pelanggan_id: penyewaanData.penyewaan_pelanggan_id.toString(),
                //@ts-ignore
                penyewaan_tglSewa: penyewaanData.penyewaan_tglSewa,
                //@ts-ignore
                penyewaan_tglKembali: penyewaanData.penyewaan_tglKembali,
                //@ts-ignore
                status_Pembayaran: penyewaanData.status_pembayaran,
                //@ts-ignore
                status_Pengembalian: penyewaanData.status_pengembalian,
                //@ts-ignore
                penyewaan_totalHarga: penyewaanData.penyewaan_totalHarga,
            });
        }
    }, [penyewaanResponse]);
    
    useEffect(() => {
        
        if (penyewaanDetailResponse) {
            let detailObj: PenyewaanDetail;
            
                detailObj = penyewaanDetailResponse;
            
            setDetailData({
                penyewaan_detail_alat_id: detailObj.penyewaan_detail_alat_id.toString(),
                penyewaan_detail_jumlah: detailObj.penyewaan_detail_jumlah,
                penyewaan_detail_subHarga: detailObj.penyewaan_detail_subHarga,
            });
        }
    }, [penyewaanDetailResponse]);


  const { data: alatResponse, isLoading: isAlatLoading } = useAlatGetQuery();
  const { data: pelangganResponse, isLoading: isPelangganLoading } = usePelangganGetQuery();

  const [editPenyewaan, { isLoading: isUpdatingPenyewaan }] = usePenyewaanPatchMutation();
  const [editPenyewaanDetail, { isLoading: isUpdatingDetail }] = usePenyewaanDetailPatchMutation();
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

            if (
                !formData.penyewaan_pelanggan_id ||
                !formData.penyewaan_tglSewa ||
                !formData.penyewaan_tglKembali ||
                !detailData.penyewaan_detail_alat_id ||
                !detailData.penyewaan_detail_jumlah
            ) {
                toast.error("Semua field wajib diisi.");
                return;
            }
            const date1 = new Date(formData.penyewaan_tglSewa);
            const date2 = new Date(formData.penyewaan_tglKembali);
            
            //@ts-ignore
            const diffInMs = Math.abs(date2 - date1);
            
            const msInDay = 1000 * 60 * 60 * 24;
            const diffInDays = diffInMs / msInDay;
            const penyewaanResponse = await editPenyewaan({
                id: Number(id),
                data: {
                    ...formData,
                    penyewaan_pelanggan_id: Number(formData.penyewaan_pelanggan_id),
                    status_Pembayaran: formData.status_Pembayaran as "Belum_Dibayar" | "Lunas" | "DP",
                    penyewaan_totalHarga : detailData.penyewaan_detail_subHarga * detailData.penyewaan_detail_jumlah * diffInDays 
                }
            }).unwrap();
            const penyewaanId = Array.isArray(penyewaanResponse?.data)
                ? (penyewaanResponse.data as Penyewaan[])[0]?.penyewaan_id
                : (penyewaanResponse?.data as Penyewaan)?.penyewaan_id;
            if (!penyewaanId) return toast.error("Gagal mendapatkan ID penyewaan.");

        
            await editPenyewaanDetail({
                id: penyewaanDetailResponse.penyewaan_detail_id,
                data: {
                    ...detailData,
                    penyewaan_detail_alat_id: Number(detailData.penyewaan_detail_alat_id),
                    penyewaan_detail_penyewaan_id: id?.toString(),
                },
            }).unwrap();

            const selectedAlat = Array.isArray(alatResponse?.data)
                ? (alatResponse.data as Alat[]).find(
                    (alat) => alat.alat_id === Number(detailData.penyewaan_detail_alat_id)
                )
                : alatResponse?.data;

            if (selectedAlat) {
                await updateAlat({
                    id: selectedAlat.alat_id,
                    data: {
                        ...selectedAlat,
                        alat_stok: selectedAlat.alat_stok - Number(detailData.penyewaan_detail_jumlah),
                    },
                }).unwrap();
            }

            toast.success("Penyewaan berhasil diedit!");
            router.push("/admin/penyewaan");
        } catch (error: any) {
            toast.error("Gagal menambah penyewaan. Error: " + (error?.data?.message || "Terjadi kesalahan."));
        }
    };
      

  return (
    <div className="ml-64">
      <EditPenyewaanView
        formData={formData}
        detailData={detailData}
        isUpdating={isUpdatingPenyewaan || isUpdatingDetail || isUpdatingAlat}
        isPenyewaanLoading={isPenyewaanLoading || isAlatLoading || isPelangganLoading}
        error={""} 
        pelangganOptions={Array.isArray(pelangganResponse?.data) ? pelangganResponse.data : []}
        alatOptions={Array.isArray(alatResponse?.data) ? alatResponse.data : []}
        handleChange={handleChange}
        handleDetailChange={handleDetailChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
