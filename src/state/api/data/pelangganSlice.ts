import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface PelangganState {
    pelanggan_id: number;
    pelanggan_nama: string;
    pelanggan_alamat: string;
    pelanggan_noTelp: string;
    pelanggan_email: string;
}

const initialState: PelangganState = {
    pelanggan_id: 0,
    pelanggan_nama: '',
    pelanggan_alamat: '',
    pelanggan_noTelp: '',
    pelanggan_email: ''
};

const pelangganSlice = createSlice({
    name: 'pelanggan',
    initialState,
    reducers: {
        setPelanggan: (state, action: PayloadAction<Partial<PelangganState>>) => {
            return { ...state, ...action.payload };
        },
        resetPelanggan: () => initialState,
    },
});

export const { setPelanggan, resetPelanggan } = pelangganSlice.actions;

export default pelangganSlice.reducer;
