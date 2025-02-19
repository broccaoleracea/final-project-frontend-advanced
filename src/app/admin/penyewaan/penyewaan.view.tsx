/// penyewaan.view.tsx
"use client";

import Link from "next/link";

interface PenyewaanItem {
    penyewaan_id: number;
    alat_id: number;
    penyewaan_pelanggan_id: number;
    penyewaan_tglSewa: string;
    penyewaan_tglKembali: string;
    status_pembayaran: string;
    status_pengembalian: string;
}

interface PenyewaanViewProps {
    isLoading: boolean;
    isError: boolean;
    rentedItems: PenyewaanItem[];
    pelangganMap: Map<number, { pelanggan_nama: string }>;
    alatMap: Map<number, { alat_nama: string; harga_perhari: number }>;
    calculateTotalPrice: (hargaPerHari: number, tglPinjam: string, tglKembali: string) => number;
    handleDelete: (id: number) => void;
    isDeleting: boolean;
}

const PenyewaanView = ({
                           isLoading,
                           isError,
                           rentedItems,
                           pelangganMap,
                           alatMap,
                           calculateTotalPrice,
                           handleDelete,
                           isDeleting,
                       }: PenyewaanViewProps) => {
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100 flex justify-center items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-gray-100 flex justify-center items-center">
                <div className="text-red-600 text-lg font-semibold">Gagal memuat data!</div>
            </div>
        );
    }

    return (
        <div className="p-4 min-h-screen bg-gray-100 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Barang yang Disewa</h1>
                <Link
                    href="/admin/penyewaan/tambah"
                    className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-lg shadow-md hover:from-yellow-500 hover:to-yellow-600 transition duration-300"
                >
                    Tambah Penyewaan
                </Link>
            </div>

            <div className="overflow-hidden border border-gray-200 rounded-lg shadow-md bg-white">
                <table className="w-full border-collapse text-lg">
                    <thead className="bg-gradient-to-r from-blue-200 to-indigo-200 text-gray-800">
                    <tr>
                        <th className="py-4 px-6 text-left font-semibold">Nama Barang</th>
                        <th className="py-4 px-6 text-left font-semibold">Penyewa</th>
                        <th className="py-4 px-6 text-left font-semibold">Status Pembayaran</th>
                        <th className="py-4 px-6 text-left font-semibold">Tanggal Pinjam</th>
                        <th className="py-4 px-6 text-left font-semibold">Tanggal Kembali</th>
                        <th className="py-4 px-6 text-left font-semibold">Jumlah Harga</th>
                        <th className="py-4 px-6 text-left font-semibold">Status Pengembalian</th>
                        <th className="py-4 px-6 text-left font-semibold">Aksi</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rentedItems.map((item) => {
                        const alat = alatMap.get(item.alat_id);
                        const pelanggan = pelangganMap.get(item.penyewaan_pelanggan_id);
                        const hargaPerHari = alat?.harga_perhari || 0;
                        const totalHarga = calculateTotalPrice(hargaPerHari, item.penyewaan_tglSewa, item.penyewaan_tglKembali);

                        return (
                            <tr
                                key={item.penyewaan_id}
                                className={`transition-all duration-300 ${
                                    item.status_pengembalian === "Dikembalikan"
                                        ? "bg-green-50 hover:bg-green-100"
                                        : "bg-yellow-50 hover:bg-yellow-100"
                                }`}
                            >
                                <td className="py-4 px-6 border-b text-gray-700 font-medium">{alat?.alat_nama || "-"}</td>
                                <td className="py-4 px-6 border-b text-gray-700 font-medium">{pelanggan?.pelanggan_nama || "-"}</td>
                                <td className={`py-4 px-6 border-b font-medium ${item.status_pembayaran === "Lunas" ? "text-green-700" : "text-red-700"}`}>
                                    {item.status_pembayaran || "-"}
                                </td>
                                <td className="py-4 px-6 border-b text-gray-700 font-medium">{new Date(item.penyewaan_tglSewa).toLocaleDateString()}</td>
                                <td className="py-4 px-6 border-b text-gray-700 font-medium">{new Date(item.penyewaan_tglKembali).toLocaleDateString()}</td>
                                <td className="py-4 px-6 border-b text-gray-700 font-medium">Rp {totalHarga.toLocaleString()}</td>
                                <td className={`py-4 px-6 border-b font-medium ${item.status_pengembalian === "Dikembalikan" ? "text-green-700" : "text-yellow-700"}`}>
                                    {item.status_pengembalian || "-"}
                                </td>
                                <td className="py-4 px-6 border-b text-gray-700 font-medium">
                                    <div className="flex gap-2">
                                        <Link href={`/admin/penyewaan/update/${item.penyewaan_id}`} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                            Edit
                                        </Link>
                                        <button onClick={() => handleDelete(item.penyewaan_id)} disabled={isDeleting} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                                            {isDeleting ? "Menghapus..." : "Hapus"}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PenyewaanView;
