import React from "react";

const Popup = ({ onClose, onDelete }: { onClose: () => void; onDelete: () => void }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
        }}
      >
        {/* Judul */}
        <h2>Anda Yakin Ingin Menghapus Ini?</h2>
        {/* Deskripsi */}
        <p style={{ marginBottom: "20px" }}>
          Pastikan anda sudah benar dengan apa yang ingin di hapus.
        </p>
        {/* Tombol Aksi */}
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#ff0000",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={onDelete} // Panggil fungsi hapus
          >
            Delete
          </button>
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#6c757d",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={onClose} // Tutup popup
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;