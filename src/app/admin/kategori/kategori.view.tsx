"use client";
import React, { FC, useState } from "react";
import DeletePopup from "@/portal/page";
import {FaTrash} from "react-icons/fa";
import {FaPencil} from "react-icons/fa6";

interface KategoriViewProps {
  kategori: any[];
  isDeleting: boolean;
  showPopup: boolean;
  setShowPopup: (value: boolean) => void;
  error: string;
  handleDelete: () => void;
  showConfirmationPopup: (id: number) => void;
}

const KategoriView: FC<KategoriViewProps> = ({
  kategori,
  isDeleting,
  showPopup,
  setShowPopup,
  error,
  handleDelete,
  showConfirmationPopup,
}) => {
  return (
    <div className="p-4 min-h-screen  overflow-y-auto">
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
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {kategori.map((item) => (
          <div
            key={item.kategori_id}
            className="p-6 bg-white rounded-lg shadow-md border border-gray-200 hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer relative"
          >
            <div className="absolute top-4 right-4 flex gap-2">
              <a
                href={`/admin/kategori/edit/${item.kategori_id}`}
                className="text-white px-3 py-2 rounded-md text-sm bg-blue-400 focus:ring-blue-400 hover:bg-blue-500 transition duration-300"
              >
                <FaPencil size={16} />
              </a>
              <button
                className="px-3 py-2 bg-red-500 disabled:bg-red-300 text-white rounded-md text-sm"
                onClick={() => showConfirmationPopup(item.kategori_id)}
                disabled={isDeleting}
              >
                <FaTrash size={16} />
              </button>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              {item.kategori_nama}
            </h3>
          </div>
        ))}

        {kategori.length === 0 && (
          <div className="col-span-full text-center py-8 text-gray-500">
            Tidak ada kategori yang tersedia.
          </div>
        )}
      </div>
      
      {showPopup && (
        <DeletePopup
          onClose={() => setShowPopup(false)}
          onDelete={handleDelete}
        />
      )}
      
      {error && <div className="text-red-600 text-center py-4">{error}</div>}
    </div>
  );
};

export default KategoriView;
