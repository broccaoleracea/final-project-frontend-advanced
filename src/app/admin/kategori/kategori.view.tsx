"use client";
import { useState } from "react";
import {
  useKategoriGetQuery,
  useAlatGetQuery,
  useKategoriDeleteMutation,
} from "@/state/api/dataApi";
import Popup from "@/app/portal/page";
import FullPageSpinner from "@/Components/Spinner/FullPageSpinner";

const KategoriView = () => {
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [kategoriIdToDelete, setKategoriIdToDelete] = useState<number | null>(null);

  // Fetch data kategori
  const {
    data: kategoriResponse,
    isLoading: isKategoriLoading,
    refetch,
    isError: isKategoriError,
    refetch: refetchKategori,
  } = useKategoriGetQuery();
  

  // Mutation untuk menghapus kategori
  const [del, { isLoading: isDeleting }] = useKategoriDeleteMutation();

  const handleDelete = async () => {
    if (kategoriIdToDelete === null) return;
    try {
      console.log("Menghapus kategori dengan ID:", kategoriIdToDelete);
      await del(kategoriIdToDelete).unwrap();
      await refetchKategori();
      console.log("Kategori berhasil dihapus");
      setShowPopup(false);
    } catch (err: any) {
      console.error("Error saat menghapus kategori:", err);
      setError(err?.data?.message || "Gagal menghapus kategori.");
    }
  };

  const showConfirmationPopup = (id: number) => {
    setKategoriIdToDelete(id);
    setShowPopup(true);
  };

  if (isKategoriLoading || isAlatLoading) {
    return <FullPageSpinner />;
  }

  if (isKategoriError || isAlatError) {
    return (
      <div className="text-red-600 text-center py-8">
        Gagal memuat data. Silakan coba lagi nanti.
      </div>
    );
  }

  const kategori = kategoriResponse?.data || [];
  const alat = alatResponse?.data || [];

  return (
    <div className="p-4 min-h-screen bg-gray-100 overflow-y-auto">
      {/* Hero Section */}
      <div className="bg-yellow-400 w-full py-10 px-6 rounded-xl shadow-lg mb-8 text-center mt-10">
        <h1 className="text-3xl font-extrabold text-black">
          Selamat Datang di Halaman Kategori
        </h1>
        <p className="text-gray-700 mt-2">
          Temukan kategori barang elektronik favorit Anda.
        </p>
      </div>

      {/* Tombol Tambah Kategori */}
      <div className="w-full px-6 mb-8">
        <a
          href="/admin/kategori/tambah"
          className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-lg shadow-md hover:from-yellow-500 hover:to-yellow-600 transition duration-300 ease-in-out text-center block"
        >
          Tambah Kategori
        </a>
      </div>

      {/* Tampilan Kategori */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {kategori.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-white rounded-lg shadow-md border border-gray-200 hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer relative"
          >
            {/* Tombol Edit dan Hapus */}
            <div className="absolute top-4 right-4 flex gap-2">
              <a
                href={`/admin/kategori/edit/${item.kategori_id}`}
                className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition duration-300"
              >
                Edit
              </a>
              <button
                className="px-3 py-1 bg-red-500 disabled:bg-red-300 text-white rounded-md text-sm"
                onClick={() => showConfirmationPopup(item.kategori_id)}
                disabled={isDeleting}
              >
                {isDeleting ? "Menghapus..." : "Hapus"}
              </button>
            </div>
            {/* Konten Kategori */}
            <h3 className="text-xl font-semibold text-gray-900">
              {item.kategori_nama}
            </h3>
          </div>
        ))}
        {/* Empty State */}
        {kategori.length === 0 && (
          <div className="col-span-full text-center py-8 text-gray-500">
            Tidak ada kategori yang tersedia.
          </div>
        )}
      </div>

      {/* Popup Konfirmasi */}
      {showPopup && (
        <Popup
          onClose={() => setShowPopup(false)}
          onDelete={handleDelete}
        />
      )}

      {/* Error Feedback */}
      {error && (
        <div className="text-red-600 text-center py-4">
          {error}
        </div>
      )}
    </div>
  );
};

export default KategoriView;