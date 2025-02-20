/// tambah.pelanggan.view.tsx
"use client";
import React from "react";
import Link from "next/link";
import {FaTrash} from "react-icons/fa";

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
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-400"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="text-red-500 text-lg font-semibold">
                    Failed to load customer data!
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="w-full p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Customer List</h1>
                    <Link
                        href="/admin/pelanggan/tambah"
                        className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-medium rounded-md transition"
                    >
                        Add Customer
                    </Link>
                </div>

                <div className="overflow-hidden border border-gray-300 rounded-lg bg-white shadow">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-3 py-2 text-left font-medium">Name</th>
                            <th className="px-3 py-2 text-left font-medium">Address</th>
                            <th className="px-3 py-2 text-left font-medium">Phone</th>
                            <th className="px-3 py-2 text-left font-medium">Email</th>
                            <th className="px-3 py-2 text-left font-medium">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {pelanggan.length > 0 ? (
                            pelanggan.map((item) => (
                                <tr
                                    key={item.pelanggan_id}
                                    className="border-t border-gray-200 hover:bg-gray-50"
                                >
                                    <td className="px-3 py-2 text-gray-700">{item.pelanggan_nama || "-"}</td>
                                    <td className="px-3 py-2 text-gray-700">{item.pelanggan_alamat || "-"}</td>
                                    <td className="px-3 py-2 text-gray-700">
                                        {item.pelanggan_notelp?.toString() || "-"}
                                    </td>
                                    <td className="px-3 py-2 text-gray-700">{item.pelanggan_email || "-"}</td>
                                    <td className="px-3 py-2">
                                        <button
                                            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md transition"
                                            onClick={() => showConfirmationPopup(item.pelanggan_id)}
                                            disabled={isDeleting}
                                        >
                                            <FaTrash size={16} />
                                        </button>
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
                                Are you sure you want to delete this customer?
                            </h2>
                            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
                            <div className="flex justify-end gap-2">
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
