import React from "react";

const DeletePopup = ({onClose, onDelete}: { onClose: () => void; onDelete: () => void }) => {
    return (
        <div
            style={{
                position: "fixed",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
            }}
        >
            <div
                style={{
                    backgroundColor: "#fff",
                    padding: "30px",
                    borderRadius: "12px",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
                    textAlign: "center",
                    maxWidth: "400px",
                    width: "100%",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center", // Pusatkan secara horizontal
                        alignItems: "center", // Pusatkan secara vertikal
                        flexDirection: "column", // Atur arah konten menjadi kolom
                        marginBottom: "20px", // Tambahkan jarak bawah jika diperlukan
                    }}
                >
                    {/* Gambar */}
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>

                </div>

                {/* Judul */}
                <h2
                    style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: "#333",
                        marginBottom: "10px",
                    }}
                >
                    Apakah Anda Yakin?
                </h2>

                {/* Deskripsi */}
                <p
                    style={{
                        fontSize: "16px",
                        color: "#555",
                        marginBottom: "20px",
                    }}
                >
                    Pastikan Anda sudah yakin dengan tindakan ini. Data yang dihapus tidak dapat dikembalikan.
                </p>

                {/* Tombol Aksi */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "15px",
                    }}
                >
                    {/* Tombol Hapus */}
                    <button
                        style={{
                            padding: "12px 24px",
                            backgroundColor: "#ff4d4f",
                            color: "#fff",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "16px",
                            fontWeight: "bold",
                            transition: "background-color 0.3s ease",
                        }}
                        onClick={onDelete} // Panggil fungsi hapus
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#ff7875")}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#ff4d4f")}
                    >
                        Delete
                    </button>

                    {/* Tombol Batal */}
                    <button
                        style={{
                            padding: "12px 24px",
                            backgroundColor: "#6c757d",
                            color: "#fff",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "16px",
                            fontWeight: "bold",
                            transition: "background-color 0.3s ease",
                        }}
                        onClick={onClose} // Tutup popup
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#868e96")}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#6c757d")}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeletePopup;
