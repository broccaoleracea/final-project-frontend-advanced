"use client";
import { useState, useEffect } from "react";
import {
  useAlatGetQuery,
  useKategoriGetQuery,
  useAlatDeleteMutation
} from "@/state/api/dataApi";
import { useAppDispatch } from "@/hooks/hooks";
import { setAlat } from "@/state/api/data/alatSlice";

const AlatView = () => {
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const { data: alatResponse, isLoading: isAlatLoading, isError: isAlatError } =
    useAlatGetQuery();
  const { data: kategoriResponse, isLoading: isKategoriLoading, isError: isKategoriError } =
    useKategoriGetQuery();
  const [delete_alat, { isLoading: isDeleting }] = useAlatDeleteMutation();

  useEffect(() => {
    if (alatResponse) {
      dispatch(setAlat(alatResponse.data));
    }
  }, [alatResponse, dispatch]);

  // Fungsi untuk menangani aksi hapus
  const handleDelete = async (alat_id: number) => {
    try {
      await deleteAlat(alat_id).unwrap(); // Panggil mutation untuk menghapus alat
      console.log("Alat berhasil dihapus");
    } catch (err: any) {
      setError(err?.data?.message || "Gagal menghapus alat.");
    }
  };

  if (isAlatLoading || isKategoriLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-gray-200 animate-pulse h-10 rounded-lg" />
        ))}
      </div>
    );
  }

  if (isAlatError || isKategoriError) {
    return <div>Gagal memuat!</div>;
  }

  const alat = alatResponse?.data || [];
  const kategori = kategoriResponse?.data || [];

  const alatWithKategori = alat.map((item) => {
    const kategoriData = kategori.find((kat) => kat.kategori_id === item.alat_kategori_id);
    return {
      ...item,
      kategori_nama: kategoriData ? kategoriData.kategori_nama : "-",
    };
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-full p-8">
        <div className="overflow-hidden border border-gray-100 rounded-lg shadow-md bg-white">
          <table className="w-full border-collapse text-lg">
            <thead className="bg-gradient-to-r from-blue-200 to-indigo-200 text-gray-800">
              <tr>
                <th className="py-5 px-8 text-left font-semibold">Kategori</th>
                <th className="py-5 px-8 text-left font-semibold">Nama Barang</th>
                <th className="py-5 px-8 text-left font-semibold">Stok</th>
                <th className="py-5 px-8 text-left font-semibold">Deskripsi</th>
                <th className="py-5 px-8 text-left font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {alatWithKategori.length > 0 ? (
                alatWithKategori.map((item, index) => (
                  <tr
                    key={item.alat_id}
                    className={`transition-all duration-300 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                    } hover:bg-indigo-50`}
                  >
                    <td className="py-6 px-8 border-b text-gray-700 font-medium">
                      {item.kategori_nama || "-"}
                    </td>
                    <td className="py-6 px-8 border-b text-gray-700 font-semibold">
                      {item.alat_nama}
                    </td>
                    <td className="py-6 px-8 border-b text-center">
                      <span
                        className={`px-4 py-2 text-base font-semibold rounded-full shadow-md ${
                          item.alat_stok > 10 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                        }`}
                      >
                        {item.alat_stok || 0}
                      </span>
                    </td>
                    <td className="py-6 px-8 border-b text-gray-600">
                      {item.alat_deskripsi || "-"}
                    </td>
                    <td className="py-6 px-8 border-b text-center">
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
                        onClick={() => {
                          // Handle edit (bisa ditambahkan logika edit di sini)
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded-md"
                        onClick={() => handleDelete(item.alat_id)} // Panggil fungsi hapus
                        disabled={isDeleting} // Nonaktifkan tombol saat proses penghapusan
                      >
                        {isDeleting ? "Menghapus..." : "Hapus"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-6 px-8 text-center text-gray-500">
                    Tidak ada alat untuk ditampilkan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AlatView;