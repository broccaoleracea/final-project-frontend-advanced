import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PenyewaanDetailState {
    penyewaan_detail_id: number;
    penyewaan_detail_penyewaan_id: number;
    penyewaan_detail_alat_id: number;
    penyewaan_detail_jumlah: string;
    penyewaan_detail_subHarga: number;
}

const initialState: PenyewaanDetailState = {
    penyewaan_detail_id: 0,
    penyewaan_detail_penyewaan_id: 0,
    penyewaan_detail_alat_id: 0,
    penyewaan_detail_jumlah: '',
    penyewaan_detail_subHarga: 0
};

const penyewaanDetailSlice = createSlice({
    name: 'penyewaanDetail',
    initialState,
    reducers: {
        setPenyewaanDetail: (state, action: PayloadAction<Partial<PenyewaanDetailState>>) => {
            return { ...state, ...action.payload };
        },
        resetPenyewaanDetail: () => initialState,
    },
});

export const { setPenyewaanDetail, resetPenyewaanDetail } = penyewaanDetailSlice.actions;

export default penyewaanDetailSlice.reducer;
