"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { dataApi } from "@/state/api/dataApi";
import { authApi } from "@/state/api/authApi";

import authReducer from "./api/authSlice";
import alatReducer from "./api/data/alatSlice";
import kategoriReducer from "./api/data/kategoriSlice";
import pelangganDataReducer from "./api/data/pelanggan.dataSlice";
import pelangganReducer from "./api/data/pelangganSlice";
import penyewaanDetailReducer from "./api/data/penyewaan.detailSlice";
import penyewaanReducer from "./api/data/penyewaanSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers({
  auth: authReducer,
  alat: alatReducer,
  kategori: kategoriReducer,
  pelangganData: pelangganDataReducer,
  pelanggan: pelangganReducer,
  penyewaanDetail: penyewaanDetailReducer,
  penyewaan: penyewaanReducer,
  // API reducers
  [authApi.reducerPath]: authApi.reducer,
  [dataApi.reducerPath]: dataApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
          .concat(authApi.middleware)
          .concat(dataApi.middleware),
  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;