/// tambah.pelanggan.view.tsx
"use client";
import React from "react";
import Link from "next/link";
import {FaPlus, FaTrash} from "react-icons/fa";
import FullPageSpinner from "@/Components/Spinner/FullPageSpinner";
import {throws} from "node:assert";

interface Pelanggan {
    pelanggan_id: number;
    pelanggan_nama: string;
    pelanggan_alamat: string;
    pelanggan_notelp?: string;
    pelanggan_email: string;
}

interface PelangganViewProps {
    pelanggan: Pelanggan[];
    isLoading: boolean;
    isError: boolean;
    isDeleting: boolean;
    showPopup: boolean;
    showConfirmationPopup: (id: number) => void;
    handleDelete: () => void;
    setShowPopup: (state: boolean) => void;
    error: string;
}

const PelangganView: React.FC<PelangganViewProps> = ({
                                                         pelanggan,
                                                         isLoading,
                                                         isError,
                                                         isDeleting,
                                                         showPopup,
                                                         showConfirmationPopup,
                                                         handleDelete,
                                                         setShowPopup,
                                                         error,
                                                     }) => {
    if (isLoading) {
        return (
            <FullPageSpinner/>
        );
    }

    if (isError) {
        throw new Error("Gagal memuat data penlanggan!")
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="w-full p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Daftar Pelanggan</h1>
                    <Link
                        href="/admin/pelanggan/tambah"
                        className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black white text-sm font-medium rounded-md transition \"
                    >
                        <span className="inline-flex items-center">
                              <FaPlus className="mr-2" size={16}/> Tambah Pelanggan
                            </span>

                    </Link>
                </div>

                <div className="overflow-hidden border border-gray-300 rounded-lg bg-white shadow">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-3 py-2 text-left font-medium">Nama</th>
                            <th className="px-3 py-2 text-left font-medium">Alamat</th>
                            <th className="px-3 py-2 text-left font-medium">No. Telepon</th>
                            <th className="px-3 py-2 text-left font-medium">Email</th>
                            <th className="px-3 py-2 text-left font-medium">Aksi</th>
                        </tr>
                        </thead>
                        <tbody>
                        {pelanggan.length > 0 ? (
                            pelanggan.map((item, index) => (
                                <tr
                                    key={item.pelanggan_id}
                                    className={`transition-all duration-200 ${
                                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    } hover:bg-gray-100`}
                                >
                                    <td className="px-3 py-2 text-gray-700">{item.pelanggan_nama || "-"}</td>
                                    <td className="px-3 py-2 text-gray-700">{item.pelanggan_alamat || "-"}</td>
                                    <td className="px-3 py-2 text-gray-700">
                                        {item.pelanggan_notelp?.toString() || "-"}
                                    </td>
                                    <td className="px-3 py-2 text-gray-700">{item.pelanggan_email || "-"}</td>
                                    <td className="px-3 py-2">
                                        <div className="flex justify-end gap-2">
                                        <button
                                            className="px-3 py-2 bg-red-500  hover:bg-red-600 text-white text-sm rounded-md transition"
                                            onClick={() => showConfirmationPopup(item.pelanggan_id)}
                                            disabled={isDeleting}
                                        >
                                            <FaTrash size={16}/>
                                        </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-3 py-2 text-center text-gray-500">
                                    No customers to display.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                {showPopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">
                                Yakin hendak menghapus pelanggan ini?
                            </h2>
                            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
                            <div className="flex justify-center gap-2">
                                <button
                                    className="px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm rounded-md transition"
                                    onClick={() => setShowPopup(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md transition"
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

export default PelangganView;
