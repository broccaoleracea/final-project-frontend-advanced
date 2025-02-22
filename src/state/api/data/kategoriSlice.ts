import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface KategoriState {
    kategori_id:number, 
    kategori_nama: string;
}

const initialState: KategoriState = {
    kategori_id:0,
    kategori_nama:''
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
