"use client";

import {UpdateAlatViewProps} from "./update.type";

const UpdateAlatView = ({
                            formData,
                            error,
                            successMessage,
                            kategori,
                            isUpdating,
                            onChange,
                            onSubmit,
                        }: UpdateAlatViewProps) => {
    return (
        <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl border border-gray-300">
                <h1 className=" text-2xl font-bold text-gray-800 mb-4">Edit Alat</h1>

                {error && <p className=" text-sm text-red-500">{error}</p>}
                {successMessage && <p className=" text-sm text-green-500">{successMessage}</p>}

                <form onSubmit={onSubmit}>
                    <div className=" mb-4">
                        <label className=" block text-sm font-medium text-gray-700">Nama Alat</label>
                        <input
                            type=" text"
                            name=" alat_nama"
                            value={formData.alat_nama}
                            onChange={onChange}
                            className=" w-full px-3 py-2 border border-gray-300 rounded focus:border-yellow-400
             focus:ring-yellow-400 placeholder-gray-400 text-sm"
                            required
                        />
                    </div>

                    <div className=" mb-4">
                        <label className=" block text-sm font-medium text-gray-700">Deskripsi</label>
                        <input
                            type=" text"
                            name=" alat_deskripsi"
                            value={formData.alat_deskripsi}
                            onChange={onChange}
                            className=" w-full px-3 py-2 border border-gray-300 rounded focus:border-yellow-400
             focus:ring-yellow-400 placeholder-gray-400 text-sm"
                        />
                    </div>

                    <div className=" mb-4">
                        <label className=" block text-sm font-medium text-gray-700">Harga per Hari</label>
                        <input
                            type=" number"
                            name=" alat_hargaPerhari"
                            value={formData.alat_hargaPerhari}
                            onChange={onChange}
                            className=" w-full px-3 py-2 border border-gray-300 rounded focus:border-yellow-400
             focus:ring-yellow-400 placeholder-gray-400 text-sm"
                        />
                    </div>

                    <div className=" mb-4">
                        <label className=" block text-sm font-medium text-gray-700">Stok</label>
                        <input
                            type=" number"
                            name=" alat_stok"
                            value={formData.alat_stok}
                            onChange={onChange}
                            className=" w-full px-3 py-2 border border-gray-300 rounded focus:border-yellow-400
             focus:ring-yellow-400 placeholder-gray-400 text-sm"
                        />
                    </div>

                    <div className=" mb-4">
                        <label className=" block text-sm font-medium text-gray-700">Kategori</label>
                        <select
                            name=" alat_kategori_id"
                            value={formData.alat_kategori_id}
                            onChange={onChange}
                            className=" w-full px-3 py-2 border border-gray-300 rounded focus:border-yellow-400
             focus:ring-yellow-400 text-sm"
                            required
                        >
                            <option value="" disabled>Pilih Kategori</option>
                            {kategori.map((kat) => (
                                <option key={kat.kategori_id} value={kat.kategori_id}>
                                    {kat.kategori_nama}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        name="update"
                        type="submit"
                        disabled={isUpdating}
                        className=" w-full bg-yellow-400 hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-400 text-white
             px-3 py-2 rounded text-sm disabled:opacity-50"
                    >
                        {isUpdating ? " Mengupdate..." : " Update"}
                    </button>
                </form>
            </div>

        </div>
    );
};

export default UpdateAlatView;
