import React from 'react';

const Popup = () => {
  return (
    <div className="popup-container" style={{ textAlign: 'center', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '400px', margin: 'auto' }}>
      {/* Icon */}
      <img 
        src="/chef-hat-icon.png" 
        alt="Chef Hat Icon" 
        style={{ width: '50px', height: 'auto', marginBottom: '10px' }} 
      />

      {/* Judul */}
      <h1>Anda Yakin Ingin Menghapus Ini</h1>

      {/* Deskripsi */}
      <p style={{ marginBottom: '20px' }}>
        Pastikan anda sudah benar dengan apa yang ingin di hapus.
      </p>

      {/* Tombol Aksi */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Delete
        </button>
        <button style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Popup;