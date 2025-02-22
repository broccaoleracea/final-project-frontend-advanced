"use client";
import React from "react";

interface FormData {
    penyewaan_tglSewa: string;
    penyewaan_tglKembali: string;
    status_Pembayaran: string;
    status_Pengembalian: string;
    penyewaan_pelanggan_id: string;
    penyewaan_totalHarga: number;
}

interface DetailData {
    penyewaan_detail_alat_id: string;
    penyewaan_detail_jumlah: number;
    penyewaan_detail_subHarga: number;
}

interface UpdateViewProps {
    pelangganOptions: { pelanggan_id: number; pelanggan_nama: string }[];
    alatOptions: { alat_id: number; alat_nama: string }[];
    formData: FormData;
    detailData: DetailData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleDetailChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isUpdating: boolean;
    isPenyewaanLoading: boolean;
    error: string;
}

const EditPenyewaanView: React.FC<UpdateViewProps> = ({
    formData,
    detailData,
    handleChange,
    handleDetailChange,
    handleSubmit,
    isUpdating,
    isPenyewaanLoading,
    pelangganOptions,
    alatOptions,
    error,
}) => {
    if (isPenyewaanLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-yellow-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl border border-gray-300">
                <h2 className="text-2xl font-bold  mb-4 text-gray-800">
                    Form Edit Penyewaan
                </h2>
                
                <form onSubmit={handleSubmit}>
                    <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2 border-gray-300">
                        Data Penyewaan
                    </h3>

                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-600">Pilih Pelanggan</label>
                        <select
                            name="penyewaan_pelanggan_id"
                            value={formData.penyewaan_pelanggan_id}
                            onChange={handleChange}
                            className="px-3 py-2 border border-gray-300 rounded-md w-full text-sm focus:border-yellow-400 focus:ring-yellow-400"
                            required
                        >
                            <option value="">Pilih Pelanggan</option>
                            {pelangganOptions.map((pelanggan) => (
                                <option key={pelanggan.pelanggan_id} value={pelanggan.pelanggan_id}>
                                    {pelanggan.pelanggan_nama}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-600">Tanggal Sewa</label>
                        <input
                            type="date"
                            name="penyewaan_tglSewa"
                            value={formData.penyewaan_tglSewa}
                            onChange={handleChange}
                            className="px-3 py-2 border border-gray-300 rounded-md w-full text-sm focus:border-yellow-400 focus:ring-yellow-400"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-600">Tanggal Kembali</label>
                        <input
                            type="date"
                            name="penyewaan_tglKembali"
                            value={formData.penyewaan_tglKembali}
                            onChange={handleChange}
                            className="px-3 py-2 border border-gray-300 rounded-md w-full text-sm focus:border-yellow-400 focus:ring-yellow-400"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-600">Status Pembayaran</label>
                        <select
                            name="status_Pembayaran"
                            value={formData.status_Pembayaran}
                            onChange={handleChange}
                            className="px-3 py-2 border border-gray-300 rounded-md w-full text-sm focus:border-yellow-400 focus:ring-yellow-400"
                            required
                        >
                            <option value="Belum_Dibayar">Belum Dibayar</option>
                            <option value="Lunas">Lunas</option>
                            <option value="DP">DP</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-600">Status Pengembalian</label>
                        <select
                            name="status_Pengembalian"
                            value={formData.status_Pengembalian}
                            onChange={handleChange}
                            className="px-3 py-2 border border-gray-300 rounded-md w-full text-sm focus:border-yellow-400 focus:ring-yellow-400"
                            required
                        >
                            <option value="Belum_Kembali">Belum Kembali</option>
                            <option value="Sudah_Kembali">Sudah Kembali</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-600">Total Harga</label>
                        <input
                            type="number"
                            name="penyewaan_totalHarga"
                            value={formData.penyewaan_totalHarga}
                            className="px-3 py-2 border border-gray-300 rounded-md w-full text-sm focus:border-yellow-400 focus:ring-yellow-400"
                            disabled
                        />
                    </div>

                    <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2 border-gray-300">
                        Detail Penyewaan
                    </h3>

                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-600">Pilih Alat</label>
                        <select
                            name="penyewaan_detail_alat_id"
                            value={detailData.penyewaan_detail_alat_id}
                            onChange={handleDetailChange}
                            className="px-3 py-2 border border-gray-300 rounded-md w-full text-sm focus:border-yellow-400 focus:ring-yellow-400"
                            required
                        >
                            <option value="">Pilih Alat</option>
                            {alatOptions.map((alat) => (
                                <option key={alat.alat_id} value={alat.alat_id}>
                                    {alat.alat_nama}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-600">Jumlah</label>
                        <input
                            type="number"
                            name="penyewaan_detail_jumlah"
                            value={detailData.penyewaan_detail_jumlah}
                            onChange={handleDetailChange}
                            className="px-3 py-2 border border-gray-300 rounded-md w-full text-sm focus:border-yellow-400 focus:ring-yellow-400"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-600">Sub Harga</label>
                        <input
                            type="number"
                            name="penyewaan_detail_subHarga"
                            value={detailData.penyewaan_detail_subHarga}
                            onChange={handleDetailChange}
                            className="px-3 py-2 border border-gray-300 rounded-md w-full text-sm focus:border-yellow-400 focus:ring-yellow-400"
                            required
                        />
                    </div>

                    {error && (
                        <div className="mb-4 text-red-500 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75"
                            disabled={isUpdating}
                        >
                            {isUpdating ? "Updating..." : "Update Penyewaan"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPenyewaanView;