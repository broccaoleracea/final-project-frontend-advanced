import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AlatState {
    nama: string;
    deskripsi: string;
    hargaPerhari: number;
    stok: number;
    kategoriId: number;
}

const initialState: AlatState = {
    nama: '',
    deskripsi: '',
    hargaPerhari: 0,
    stok: 0,
    kategoriId: 0,
};

const alatSlice = createSlice({
    name: 'alat',
    initialState,
    reducers: {
        setAlat: (state, action: PayloadAction<Partial<AlatState>>) => {
            return { ...state, ...action.payload };
        },
        resetAlat: () => initialState,
    },
});

export const { setAlat, resetAlat } = alatSlice.actions;

export default alatSlice.reducer;
