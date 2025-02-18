"use client";

import React, { useState } from "react";
import { usePelangganDataPostMutation } from "@/state/api/dataApi";

const TambahPelanggan = () => {
  const [pelangganId, setPelangganId] = useState("");
  const [jenisData, setJenisData] = useState(""); // State untuk menyimpan nilai dropdown
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [postPelangganData, { isLoading, isError, isSuccess }] =
    usePelangganDataPostMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!pelangganId || !jenisData || !file) {
      setError("Semua field wajib diisi.");
      return;
    }

    const formData = new FormData();
    formData.append("pelanggan_data_pelanggan_id", pelangganId);
    formData.append("pelanggan_data_jenis", jenisData); // Nilai dari dropdown
    formData.append("pelanggan_data_file", file);

    try {
      await postPelangganData(formData).unwrap();
      setSuccessMessage("Data berhasil diunggah!");
      setError(""); // Reset error jika ada
      // Reset form setelah berhasil
      setPelangganId("");
      setJenisData("");
      setFile(null);
    } catch (err) {
      setError("Gagal mengunggah data. Silakan coba lagi.");
      console.error("Error:", err);
    }
  };

  return (
    <div>
      <h2>Form Upload Data Pelanggan</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Input untuk pelanggan_data_pelanggan_id */}
        <div>
          <label>Pelanggan ID:</label>
          <input
            type="text"
            value={pelangganId}
            onChange={(e) => setPelangganId(e.target.value)}
          />
        </div>

        {/* Dropdown untuk pelanggan_data_jenis */}
        <div>
          <label>Jenis Data:</label>
          <select
            value={jenisData}
            onChange={(e) => setJenisData(e.target.value)} // Update state saat dipilih
          >
            <option value="">-- Pilih Jenis --</option>
            <option value="KTP">KTP</option>
            <option value="SIM">SIM</option>
          </select>
        </div>

        {/* Input untuk pelanggan_data_file */}
        <div>
          <label>File:</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        {/* Tombol Submit */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Mengunggah..." : "Unggah"}
        </button>

        {/* Pesan Error */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Pesan Sukses */}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </form>
    </div>
  );
};

export default TambahPelanggan;