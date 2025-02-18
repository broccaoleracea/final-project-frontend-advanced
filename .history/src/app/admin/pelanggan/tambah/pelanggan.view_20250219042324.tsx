import React, { useState } from "react";
import { usePelangganDataPostMutation } from "./api"; // Sesuaikan path dengan file API Anda

const TambahPelanggan = () => {
  const [pelangganDataId, setPelangganDataId] = useState(4); // Default value sesuai permintaan
  const [pelangganDataPelangganId, setPelangganDataPelangganId] = useState("");
  const [pelangganDataJenis, setPelangganDataJenis] = useState("");
  const [pelangganDataFile, setPelangganDataFile] = useState(null);

  const [postPelangganData, { isLoading, isError, isSuccess }] =
    usePelangganDataPostMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Membuat objek FormData untuk mengirim data termasuk file
    const formData = new FormData();
    formData.append("pelanggan_data_id", pelangganDataId);
    formData.append("pelanggan_data_pelanggan_id", pelangganDataPelangganId);
    formData.append("pelanggan_data_jenis", pelangganDataJenis);
    if (pelangganDataFile) {
      formData.append("pelanggan_data_file", pelangganDataFile);
    }

    try {
      // Kirim data menggunakan mutation
      await postPelangganData(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Pelanggan Data ID:</label>
        <input
          type="number"
          value={pelangganDataId}
          onChange={(e) => setPelangganDataId(e.target.value)}
          readOnly // Jika ini adalah nilai tetap, bisa di-set sebagai readonly
        />
      </div>

      <div>
        <label>Pelanggan ID:</label>
        <input
          type="text"
          value={pelangganDataPelangganId}
          onChange={(e) => setPelangganDataPelangganId(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Jenis Data:</label>
        <input
          type="text"
          value={pelangganDataJenis}
          onChange={(e) => setPelangganDataJenis(e.target.value)}
          required
        />
      </div>

      <div>
        <label>File:</label>
        <input
          type="file"
          onChange={(e) => setPelangganDataFile(e.target.files[0])}
          required
        />
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit"}
      </button>

      {/* Feedback untuk pengguna */}
      {isSuccess && <p>Data berhasil dikirim!</p>}
      {isError && <p>Gagal mengirim data. Silakan coba lagi.</p>}
    </form>
  );
};

export default TambahPelanggan;