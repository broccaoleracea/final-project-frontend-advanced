import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface KategoriState {
    nama: string;
}

const initialState: KategoriState = {
    nama: '',
};

const kategoriSlice = createSlice({
    name: 'kategori',
    initialState,
    reducers: {
        setKategori: (state, action: PayloadAction<Partial<KategoriState>>) => {
            return { ...state, ...action.payload };
        },
        resetKategori: () => initialState,
    },
});

export const { setKategori, resetKategori } = kategoriSlice.actions;

export default kategoriSlice.reducer;
