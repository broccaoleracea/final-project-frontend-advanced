/// tambah.pelanggan.view.tsx
"use client";
import React from "react";
import Link from "next/link";

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
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500"></div>
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
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-lg shadow-md hover:from-yellow-500 hover:to-yellow-600 transition duration-300 ease-in-out"
            >
              Add Customer
            </Link>
          </div>

          <div className="overflow-hidden border border-gray-200 rounded-lg shadow-md bg-white">
            <table className="w-full border-collapse text-lg">
              <thead className="bg-gradient-to-r from-blue-200 to-indigo-200 text-gray-800">
              <tr>
                <th className="py-5 px-8 text-left font-semibold">Name</th>
                <th className="py-5 px-8 text-left font-semibold">Address</th>
                <th className="py-5 px-8 text-left font-semibold">Phone</th>
                <th className="py-5 px-8 text-left font-semibold">Email</th>
                <th className="py-5 px-8 text-left font-semibold">Actions</th>
              </tr>
              </thead>
              <tbody>
              {pelanggan.length > 0 ? (
                  pelanggan.map((item, index) => (
                      <tr
                          key={item.pelanggan_id}
                          className={`transition-all duration-300 ${
                              index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                          } hover:bg-indigo-50`}
                      >
                        <td className="py-6 px-8 border-b text-gray-700 font-medium">
                          {item.pelanggan_nama || "-"}
                        </td>
                        <td className="py-6 px-8 border-b text-gray-700 font-medium">
                          {item.pelanggan_alamat || "-"}
                        </td>
                        <td className="py-6 px-8 border-b text-gray-700 font-medium">
                          {item.pelanggan_notelp?.toString() || "-"}
                        </td>
                        <td className="py-6 px-8 border-b text-gray-700 font-medium">
                          {item.pelanggan_email || "-"}
                        </td>
                        <td>
                          <button
                              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
                              onClick={() => showConfirmationPopup(item.pelanggan_id)}
                              disabled={isDeleting}
                          >
                            {isDeleting ? "Deleting..." : "Delete"}
                          </button>
                        </td>
                      </tr>
                  ))
              ) : (
                  <tr>
                    <td colSpan={5} className="py-6 px-8 text-center text-gray-500">
                      No customers to display.
                    </td>
                  </tr>
              )}
              </tbody>
            </table>
          </div>

          {showPopup && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Are you sure you want to delete this customer?
                  </h2>
                  {error && (
                      <div className="text-red-500 text-sm font-semibold mb-2">
                        {error}
                      </div>
                  )}
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

export default PelangganView;
