import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PelangganDataState {
  pelangganId: number;
  jenis: string;
  file: string;
}

const initialState: PelangganDataState = {
  pelangganId: 0,
  jenis: '',
  file: '',
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
