"use client";

import { usePelangganPostMutation, usePelangganDataPostMutation } from "@/state/api/dataApi";
import React, { useState } from "react";

const Pelanggan = () => {
  // State untuk form pertama
  const [pelangganNama, setPelangganNama] = useState("");
  const [pelangganAlamat, setPelangganAlamat] = useState("");
  const [pelangganNotelp, setPelangganNotelp] = useState("");
  const [pelangganEmail, setPelangganEmail] = useState("");

  // State untuk form kedua
  const [pelangganDataJenis, setPelangganDataJenis] = useState("");
  const [pelangganDataFile, setPelangganDataFile] = useState(null);

  // State untuk multi-step logic
  const [currentStep, setCurrentStep] = useState(1);
  const [pelangganId, setPelangganId] = useState(null); // Untuk menyimpan pelanggan_id dari langkah pertama

  // Mutation hooks
  const [postPelanggan, { isLoading: isPostingPelanggan }] = usePelangganPostMutation();
  const [postPelangganData, { isLoading: isPostingPelangganData }] = usePelangganDataPostMutation();

  // Handler untuk form pertama
  const handleStep1Submit = async (e) => {
    e.preventDefault();

    try {
      // Kirim data menggunakan mutation
      const response = await postPelanggan({
        pelanggan_nama: pelangganNama,
        pelanggan_alamat: pelangganAlamat,
        pelanggan_notelp: pelangganNotelp,
        pelanggan_email: pelangganEmail,
      });

      if (response.error) {
        console.error("Error submitting form:", response.error);
        alert("Gagal menambahkan pelanggan. Silakan coba lagi.");
        return;
      }

      // Simpan pelanggan_id dari respons
      const newPelangganId = response.data.pelanggan_id;
      setPelangganId(newPelangganId);

      // Pindah ke langkah kedua
      setCurrentStep(2);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Terjadi kesalahan saat menambahkan pelanggan.");
    }
  };

  // Handler untuk form kedua
  const handleStep2Submit = async (e) => {
    e.preventDefault();

    if (!pelangganDataJenis || !pelangganDataFile) {
      alert("Semua field wajib diisi.");
      return;
    }

    // Membuat objek FormData untuk mengirim data termasuk file
    const formData = new FormData();
    formData.append("pelanggan_data_id", 4); // Default value sesuai permintaan
    formData.append("pelanggan_data_pelanggan_id", pelangganId);
    formData.append("pelanggan_data_jenis", pelangganDataJenis);
    formData.append("pelanggan_data_file", pelangganDataFile);

    try {
      // Kirim data menggunakan mutation
      const response = await postPelangganData(formData);

      if (response.error) {
        console.error("Error submitting form:", response.error);
        alert("Gagal menambahkan data pelanggan. Silakan coba lagi.");
        return;
      }

      alert("Data berhasil dikirim!");
      resetForm(); // Reset form setelah selesai
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Terjadi kesalahan saat menambahkan data pelanggan.");
    }
  };

  // Fungsi untuk mereset form
  const resetForm = () => {
    setPelangganNama("");
    setPelangganAlamat("");
    setPelangganNotelp("");
    setPelangganEmail("");
    setPelangganDataJenis("");
    setPelangganDataFile(null);
    setPelangganId(null);
    setCurrentStep(1);
  };

  return (
    <div>
      <h2>Form Tambah Pelanggan</h2>

      {/* Langkah 1 */}
      {currentStep === 1 && (
        <form onSubmit={handleStep1Submit}>
          <div>
            <label>Nama Pelanggan:</label>
            <input
              type="text"
              value={pelangganNama}
              onChange={(e) => setPelangganNama(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Alamat Pelanggan:</label>
            <input
              type="text"
              value={pelangganAlamat}
              onChange={(e) => setPelangganAlamat(e.target.value)}
              required
            />
          </div>
          <div>
            <label>No. Telepon:</label>
            <input
              type="text"
              value={pelangganNotelp}
              onChange={(e) => setPelangganNotelp(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={pelangganEmail}
              onChange={(e) => setPelangganEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={isPostingPelanggan}>
            {isPostingPelanggan ? "Submitting..." : "Selanjutnya"}
          </button>
        </form>
      )}

      {/* Langkah 2 */}
      {currentStep === 2 && (
        <form onSubmit={handleStep2Submit}>
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
          <button type="submit" disabled={isPostingPelangganData}>
            {isPostingPelangganData ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Pelanggan;