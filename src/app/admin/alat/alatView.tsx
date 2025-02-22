"use client";
import React from "react";
import Link from "next/link";
import {FaPlus, FaTrash} from "react-icons/fa";
import {FaPencil} from "react-icons/fa6";
import FullPageSpinner from "@/Components/Spinner/FullPageSpinner";

type AlatViewProps = {
    alatWithKategori: {
        alat_id: number;
        alat_nama: string;
        alat_stok: number;
        alat_deskripsi?: string;
        kategori_nama: string;
    }[];
    isLoading: boolean;
    isError: boolean;
    isDeleting: boolean;
    showPopup: boolean;
    showConfirmationPopup: (id: number) => void;
    setShowPopup: (show: boolean) => void;
    handleDelete: () => void;
};

const AlatView: React.FC<AlatViewProps> = ({
                                               alatWithKategori,
                                               isLoading,
                                               isError,
                                               isDeleting,
                                               showPopup,
                                               showConfirmationPopup,
                                           }) => {
    if (isLoading) {
        return (
            <FullPageSpinner/>
        );
    }

    if (isError) {
        throw new Error("Gagal memuat data!")
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="w-full p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Daftar Alat</h1>
                    <Link
                        href="/admin/alat/tambah"
                        className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black white text-sm font-medium rounded-md transition \"
                    >
                        <span className="inline-flex items-center">
                              <FaPlus className="mr-2" size={16}/> Tambah Alat
                            </span>

                    </Link>
                </div>

                <div className="overflow-hidden border border-gray-300 rounded-lg bg-white shadow">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="py-2 px-3 text-left font-medium text-gray-600">
                                Kategori
                            </th>
                            <th className="py-2 px-3 text-left font-medium text-gray-600">
                                Nama Barang
                            </th>
                            <th className="py-2 px-3 text-left font-medium text-gray-600">
                                Stok
                            </th>
                            <th className="py-2 px-3 text-left font-medium text-gray-600">
                                Deskripsi
                            </th>
                            <th className="py-2 px-3 text-left font-medium text-gray-600">
                                Aksi
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {alatWithKategori.length > 0 ? (
                            alatWithKategori.map((item, index) => (
                                <tr
                                    key={item.alat_id}
                                    className={`transition-all duration-200  ${
                                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    } hover:bg-gray-100`}
                                >
                                    <td className="px-3 py-2  border-b text-gray-700">
                                        {item.kategori_nama || "-"}
                                    </td>
                                    <td className="px-3 py-2  border-b font-medium text-gray-800">
                                        {item.alat_nama}
                                    </td>
                                    <td className="px-3 py-2  border-b text-center">
                      <span
                          className={`px-3 py-1 rounded-md text-sm ${
                              item.alat_stok > 0
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                          }`}
                      >
                        {item.alat_stok || 0}
                      </span>
                                    </td>
                                    <td className="px-3 py-2  border-b text-gray-600">
                                        {item.alat_deskripsi || "-"}
                                    </td>
                                    <td className="px-3 py-2  border-b flex gap-2">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={`/admin/alat/update/${item.alat_id}`}
                                                id="update"
                                                className="px-3 py-2 text-white rounded-md bg-blue-400 focus:ring-blue-400 hover:bg-blue-500 focus:ring-2  text-sm"
                                            >
                                                <FaPencil size={16}/>
                                            </Link>
                                            <button

                                                className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-400 text-sm"
                                                onClick={() => showConfirmationPopup(item.alat_id)}
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
                                <td
                                    colSpan={5}
                                    className="py-4 px-4 text-center text-gray-500"
                                >
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
