"use client"; // Directive untuk menandai Client Component
import React, { useState } from 'react';
import KategoriView from './kategori.view';

export default function Kategori() {
  // Data barang elektronik
  const [barang, setBarang] = useState([
    { id: 1, nama: 'Lampu LED', kategori: 'pencahayaan', tersedia: true },
    { id: 2, nama: 'AC Split', kategori: 'pendingin ruangan', tersedia: true },
    { id: 3, nama: 'Kamera DSLR', kategori: 'kamera', tersedia: false },
    { id: 4, nama: 'Smartphone X', kategori: 'handphone', tersedia: true },
    { id: 5, nama: 'Laptop Pro', kategori: 'laptop', tersedia: true },
    { id: 6, nama: 'Lampu Bohlam', kategori: 'pencahayaan', tersedia: false },
    { id: 7, nama: 'Kipas Angin', kategori: 'pendingin ruangan', tersedia: true },
    { id: 8, nama: 'Kamera Mirrorless', kategori: 'kamera', tersedia: true },
    { id: 9, nama: 'Smartphone Y', kategori: 'handphone', tersedia: false },
    { id: 10, nama: 'Laptop Gaming', kategori: 'laptop', tersedia: true },
  ]);

  // State untuk melacak mode tampilan (kategori atau barang)
  const [mode, setMode] = useState('kategori'); // 'kategori' atau 'barang'
  const [selectedKategori, setSelectedKategori] = useState('');

  // Fungsi untuk menampilkan daftar barang berdasarkan kategori
  const handleKategoriClick = (kategori: string) => {
    setSelectedKategori(kategori);
    setMode('barang');
  };

  // Fungsi untuk kembali ke tampilan kategori
  const handleBackToKategori = () => {
    setMode('kategori');
    setSelectedKategori('');
  };

  // Filter barang berdasarkan kategori yang dipilih
  const filteredBarang = barang.filter((item) => item.kategori === selectedKategori);

  // Props yang dikirim ke Presentational Component
  const props = {
    mode,
    selectedKategori,
    barang: filteredBarang,
    onKategoriClick: handleKategoriClick,
    onBackToKategori: handleBackToKategori,
  };

  return <KategoriView {...props} />;
}