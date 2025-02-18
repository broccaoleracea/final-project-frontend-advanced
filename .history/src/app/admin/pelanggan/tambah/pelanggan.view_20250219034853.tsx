import React from "react";
import { useForm } from "react-hook-form";
import { usePelangganDataPostMutation } from "./api"; // Sesuaikan path sesuai struktur proyek Anda

const FormDataUpload = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [postPelangganData, { isLoading, isError, isSuccess }] = usePelangganDataPostMutation();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("pelanggan_data_pelanggan_id", data.pelanggan_data_pelanggan_id);
    formData.append("pelanggan_data_jenis", data.pelanggan_data_jenis);
    formData.append("pelanggan_data_file", data.pelanggan_data_file[0]); // Mengambil file pertama dari input

    try {
      await postPelangganData(formData).unwrap();
      console.log("Data berhasil diunggah!");
    } catch (error) {
      console.error("Gagal mengunggah data:", error);
    }
  };

  return (
    <div>
      <h2>Form Upload Data Pelanggan</h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        {/* Input untuk pelanggan_data_pelanggan_id */}
        <div>
          <label>Pelanggan ID:</label>
          <input
            type="text"
            {...register("pelanggan_data_pelanggan_id", { required: "ID Pelanggan wajib diisi" })}
          />
          {errors.pelanggan_data_pelanggan_id && (
            <p>{errors.pelanggan_data_pelanggan_id.message}</p>
          )}
        </div>

        {/* Input untuk pelanggan_data_jenis */}
        <div>
          <label>Jenis Data:</label>
          <input
            type="text"
            {...register("pelanggan_data_jenis", { required: "Jenis data wajib diisi" })}
          />
          {errors.pelanggan_data_jenis && (
            <p>{errors.pelanggan_data_jenis.message}</p>
          )}
        </div>

        {/* Input untuk pelanggan_data_file */}
        <div>
          <label>File:</label>
          <input
            type="file"
            {...register("pelanggan_data_file", { required: "File wajib diunggah" })}
          />
          {errors.pelanggan_data_file && (
            <p>{errors.pelanggan_data_file.message}</p>
          )}
        </div>

        {/* Tombol Submit */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Mengunggah..." : "Unggah"}
        </button>

        {/* Pesan Status */}
        {isSuccess && <p>Data berhasil diunggah!</p>}
        {isError && <p>Gagal mengunggah data. Silakan coba lagi.</p>}
      </form>
    </div>
  );
};

export default FormDataUpload;