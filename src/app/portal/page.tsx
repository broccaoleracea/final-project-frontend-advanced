"use client";
import React from "react";

const DeleteConfirmationPopup = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.popupOverlay}>
      <div style={styles.popupContent}>
        <h2>Konfirmasi Penghapusan</h2>
        <p>Apakah Anda yakin ingin menghapus data ini?</p>
        <div style={styles.buttonContainer}>
          <button onClick={onCancel} style={styles.cancelButton}>
            Tidak
          </button>
          <button onClick={onConfirm} style={styles.confirmButton}>
            Ya
          </button>
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  popupOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popupContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "300px",
  },
  buttonContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
  },
  cancelButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#ccc",
    cursor: "pointer",
  },
  confirmButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#e74c3c",
    color: "#fff",
    cursor: "pointer",
  },
};

export default DeleteConfirmationPopup;