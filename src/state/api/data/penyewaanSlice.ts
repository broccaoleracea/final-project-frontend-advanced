import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PenyewaanState {
    pelangganId: number;
    tglSewa: string;
    tglKembali: string;
    statusPembayaran: string;
    statusPengembalian: string;
    totalHarga: number;
}

const initialState: PenyewaanState = {
    pelangganId: 0,
    tglSewa: '',
    tglKembali: '',
    statusPembayaran: '',
    statusPengembalian: '',
    totalHarga: 0,
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