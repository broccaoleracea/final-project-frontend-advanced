"use client";
import Link from "next/link";
import {FaPlus, FaTrash} from "react-icons/fa"; // Import Trash Icon
import Popup from "@/app/portal/page";
import React from "react";
import {FaPencil} from "react-icons/fa6";

interface RentalViewProps {
    rentedItems: any[];
    pelangganMap: Map<number, any>;
    alatMap: Map<number, any>;
    penyewaanDetailMap: Map<number, any[]>;
    showPopup: boolean;
    setShowPopup: (state: boolean) => void;
    showConfirmationPopup: (id: number) => void;
    handleDelete: () => void;
}

const getPaymentStatusClass = (status: string) => {
    switch (status) {
        case "Lunas":
            return "bg-green-100 text-green-700";
        case "Belum_Dibayar":
            return "bg-red-100 text-red-700";
        case "DP":
            return "bg-yellow-100 text-yellow-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
};

const getReturnStatusClass = (status: string) => {
    switch (status) {
        case "Belum_Kembali":
            return "bg-red-100 text-red-700 px-3 py-1";
        case "Sudah_Kembali":
            return "bg-green-100 text-green-700 px-3 py-1 ";
        default:
            return "bg-gray-100 text-gray-700 px-3 py-1";
    }
};

const RentalView = ({
                        rentedItems,
                        pelangganMap,
                        alatMap,
                        penyewaanDetailMap,
                        showPopup,
                        setShowPopup,
                        showConfirmationPopup,
                        handleDelete,
                    }: RentalViewProps) => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="w-full p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Daftar Penyewaan</h1>
                    <Link
                        href="/admin/penyewaan/tambah"
                        className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black white text-sm font-medium rounded-md transition \"
                    >
                        <span className="inline-flex items-center">
                              <FaPlus className="mr-2" size={16}/> Tambah Penyewaan
                            </span>

                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-hidden border border-gray-300 rounded-lg bg-white shadow">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 text-gray-700 border-gray-300">
                        <tr>
                            <th className="px-3 py-2 text-left font-medium">
                                Nama Barang
                            </th>
                            <th className="px-3 py-2 text-left font-medium">
                                Penyewa
                            </th>
                            <th className="px-3 py-2 text-left font-medium">
                                Status Pembayaran
                            </th>
                            <th className="px-3 py-2 text-left font-medium">
                                Tanggal Pinjam
                            </th>
                            <th className="px-3 py-2 text-left font-medium">
                                Tanggal Kembali
                            </th>
                            <th className="px-3 py-2 text-left font-medium">
                                Jumlah Harga
                            </th>
                            <th className="px-3 py-2 text-left font-medium">
                                Status Pengembalian
                            </th>
                            <th className="py-2 px-3 text-center font-semibold border-b border-gray-300">
                                Aksi
                            </th>
                        </tr>
                        </thead>
                        <tbody className="text-gray-800">
                        {rentedItems?.map((item, index) => {
                            const pelanggan = pelangganMap.get(item.penyewaan_pelanggan_id);
                            const details = penyewaanDetailMap.get(item.penyewaan_id) || [];

                            return details.map((detail) => {
                                const alat = alatMap.get(
                                    Number(detail.penyewaan_detail_alat_id)
                                );
                                const alatNama = alat?.alat_nama || "-";
                                const totalHarga = item.penyewaan_totalHarga.toLocaleString()

                                return (
                                    <tr
                                        key={detail.penyewaan_detail_id}
                                        className={` ${
                                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                        } hover:bg-gray-100`}
                                    >
                                        <td className="px-3 py-2">{alatNama}</td>
                                        <td className="px-3 py-2">
                                            {pelanggan?.pelanggan_nama || "-"}
                                        </td>
                                        <td
                                            className={`px-3 py-2 text-center font-medium  ${getPaymentStatusClass(
                                                item.status_pembayaran
                                            )}`}
                                        >
                                            {item.status_pembayaran.replace("_", " ")}
                                        </td>
                                        <td className="px-3 py-2">
                                            {new Date(item.penyewaan_tglSewa).toLocaleDateString() ||
                                                "-"}
                                        </td>
                                        <td className="px-3 py-2">
                                            {new Date(
                                                item.penyewaan_tglKembali
                                            ).toLocaleDateString() || "-"}
                                        </td>
                                        <td className="px-3 py-2">
                                            Rp {totalHarga.toLocaleString()}
                                        </td>
                                        <td
                                            className={`px-3 py-2 font-medium text-center ${getReturnStatusClass(
                                                item.status_pengembalian
                                            )}`}
                                        >
                                            {item.status_pengembalian.replace("_", " ")}
                                        </td>
                                        <td className="px-3 py-2 text-center">
                                            <div className="flex justify-end gap-2">
                                            <Link
                                                href={`/admin/penyewaan/update/${item.penyewaan_id}`}
                                            >
                                                <button
                                                    className="px-3 py-2 bg-blue-400 focus:ring-blue-400 hover:bg-blue-500 text-white text-sm rounded-md transition">
                                                    <FaPencil size={16}/>
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => showConfirmationPopup(item.penyewaan_id)}
                                                className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md transition"
                                            >
                                                <FaTrash size={16}/>
                                            </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            });
                        })}
                        </tbody>
                    </table>
                </div>

                {showPopup && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">
                                Yakin hendak menghapus penyewaan ini?
                            </h2>
                            <div className="flex justify-end">
                                <button
                                    className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2 hover:bg-gray-600 transition duration-300 ease-in-out"
                                    onClick={() => setShowPopup(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RentalView;
