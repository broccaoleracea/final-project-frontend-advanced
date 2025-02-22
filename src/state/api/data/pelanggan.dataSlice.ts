import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PelangganDataState {
  pelanggan_data_id: number;
  pelanggan_data_jenis: string;
  pelanggan_data_file: string;
  pelanggan_data_pelanggan_id: number;
}

const initialState: PelangganDataState = {
  pelanggan_data_id: 0,
  pelanggan_data_jenis: '',
  pelanggan_data_file: '',
  pelanggan_data_pelanggan_id: 0,
};

const pelangganDataSlice = createSlice({
  name: 'pelangganData',
  initialState,
  reducers: {
    setPelangganData: (state, action: PayloadAction<Partial<PelangganDataState>>) => {
      return { ...state, ...action.payload };
    },
    resetPelangganData: () => initialState,
  },
});

export const { setPelangganData, resetPelangganData } = pelangganDataSlice.actions;

export default pelangganDataSlice.reducer;
