import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PenyewaanState {
    penyewaan_id: number;
    penyewaan_pelanggan_id: number;
    penyewaan_tglSewa: string;
    penyewaan_tglKembali: string;
    penyewaan_statusPembayaran: string;
    penyewaan_statusPengembalian: string;
    penyewaan_totalHarga: number;
}

const initialState: PenyewaanState = {
    penyewaan_id:0,
    penyewaan_pelanggan_id:0,
    penyewaan_tglSewa: '',
    penyewaan_tglKembali: '',
    penyewaan_statusPembayaran:'',
    penyewaan_statusPengembalian: '',
    penyewaan_totalHarga: 0
};

const penyewaanSlice = createSlice({
    name: 'penyewaan',
    initialState,
    reducers: {
        setPenyewaan: (state, action: PayloadAction<Partial<PenyewaanState>>) => {
            return { ...state, ...action.payload };
        },
        resetPenyewaan: () => initialState,
    },
});

export const { setPenyewaan, resetPenyewaan } = penyewaanSlice.actions;

export default penyewaanSlice.reducer;
``