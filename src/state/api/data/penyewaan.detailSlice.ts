import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PenyewaanDetailState {
    penyewaanId: number;
    alatId: number;
    jumlah: number;
    subHarga: number;
}

const initialState: PenyewaanDetailState = {
    penyewaanId: 0,
    alatId: 0,
    jumlah: 0,
    subHarga: 0,
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
