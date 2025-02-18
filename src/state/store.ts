// store.ts
"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi } from "../state/api/authApi";
import { api } from "@/state/api/dataApi";
import authReducer from "./api/authSlice"
import alatReducer from "./api/data/alatSlice";
import kategoriReducer from "./api/data/kategoriSlice";
import pelangganDataReducer from "./api/data/pelanggan.dataSlice";
import pelangganReducer from "./api/data/pelangganSlice";
import penyewaanDetailReducer from "./api/data/penyewaan.detailSlice";
import penyewaanReducer from "./api/data/penyewaanSlice";

const rootReducer = combineReducers({
  alat: alatReducer,
  kategori: kategoriReducer,
  pelangganData: pelangganDataReducer,
  pelanggan: pelangganReducer,
  penyewaanDetail: penyewaanDetailReducer,
  penyewaan: penyewaanReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    root: rootReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware, api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;