export interface Kategori {
    kategori_id: number;
    kategori_nama: string;
}

export interface Alat {
    alat_id: number;
    alat_kategori_id: number;
    alat_nama: string;
    alat_deskripsi: string;
    alat_hargaPerhari: number;
    alat_stok: number;
    kategori?: Kategori;
}

export interface Pelanggan {
    pelanggan_id: number;
    pelanggan_nama: string;
    pelanggan_alamat: string;
    pelanggan_notelp: string;
    pelanggan_email: string;
}

export interface PelangganData {
    pelanggan_data_id: number;
    pelanggan_data_pelanggan_id: number;
    pelanggan_data_jenis: "KTP" | "SIM";
    pelanggan_data_file: string;
    pelanggan?: Pelanggan;
}

export interface Penyewaan {
    penyewaan_id: number;
    penyewaan_pelanggan_id: number;
    penyewaan_tglSewa: string;
    penyewaan_tglKembali: string;
    status_Pembayaran: "Lunas" | "Belum_Dibayar" | "DP";
    status_Pengembalian: "Sudah_Kembali" | "Belum_Kembali";
    penyewaan_totalHarga: number;
    pelanggan?: Pelanggan;
    penyewaan_detail?: PenyewaanDetail
}

export interface PenyewaanDetail {
    penyewaan_detail_id: number;
    penyewaan_detail_penyewaan_id: string; // The api requires this to be a string. Somehow.
    penyewaan_detail_alat_id: number;
    penyewaan_detail_jumlah: number;
    penyewaan_detail_subHarga: number;
    penyewaan?: Penyewaan;
    alat?: Alat; 
}
