import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AlatState {
    alat_nama: string;
    alat_deskripsi: string;
    alat_hargaPerhari: number;
    alat_stok: number;
    alat_kategori_id: number;
}

const initialState: AlatState = {
    alat_nama: '',
    alat_deskripsi: '',
    alat_hargaPerhari: 0,
    alat_stok: 0,
    alat_kategori_id: 0,
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
