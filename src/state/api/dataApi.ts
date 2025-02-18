"use client";
import {
    createApi,
    fetchBaseQuery,
    BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import {logout, setCredentials} from "@/state/api/authSlice";
import {baseQueryWithReauth} from "@/state/api/authApi";

type RootState = ReturnType<typeof import("../store").store.getState>;

const endpoints = {
<<<<<<< HEAD
  alat: "alat",
  kategori: "kategori",
  pelanggan_data: "/data/pelanggan",
  pelanggan: "pelanggan",
  penyewaan_detail: "penyewaan/detail",
  penyewaan: "penyewaan",
=======
    alat: "alat",
    kategori: "kategori",
    pelangganData: "data/pelanggan",
    pelanggan: "pelanggan",
    penyewaanDetail: "detail/penyewaan",
    penyewaan: "penyewaan",
>>>>>>> 0f85289146b5bff922b371d97e7d1b53ffecfc5b
};

const apiEndpoints = (builder) => {
    return Object.keys(endpoints).reduce((acc, key) => {
        const endpoint = endpoints[key];
        console.log(endpoint, key);

        acc[`${key}Get`] = builder.query({
            query: (id) => ({
                url: `/${endpoint}${id ? `/${id}` : ''}`,
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }),
        });
        
        acc[`${key}Post`] = builder.mutation({
            query: (data) => {
                const headers = {
                    'Accept': 'application/json',
                };

                
                if (!(data instanceof FormData)) {
                    headers['Content-Type'] = 'application/json';
                }

                return {
                    url: `/${endpoint}`,
                    method: "POST",
                    body: data,
                    headers,
                };
            },
        });


        acc[`${key}Patch`] = builder.mutation({
            query: ({id, data}) => ({
                url: `/${endpoint}/${id}`,
                method: "PATCH",
                body: data,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }),
        });

        acc[`${key}Delete`] = builder.mutation({
            query: (id) => ({
                url: `/${endpoint}/${id}`,
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }),
        });

        return acc;
    }, {});
};


export const api = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReauth,
    endpoints: apiEndpoints,
});

export const {
    useAlatGetQuery,
    useAlatPostMutation,
    useAlatPatchMutation,
    useAlatDeleteMutation,
    useKategoriGetQuery,
    useKategoriPostMutation,
    useKategoriPatchMutation,
    useKategoriDeleteMutation,
    usePelangganDataGetQuery,
    usePelangganDataPostMutation,
    usePelangganDataPatchMutation,
    usePelangganDataDeleteMutation,
    usePelangganGetQuery,
    usePelangganPostMutation,
    usePelangganPatchMutation,
    usePelangganDeleteMutation,
    usePenyewaanDetailGetQuery,
    usePenyewaanDetailPostMutation,
    usePenyewaanDetailPatchMutation,
    usePenyewaanDetailDeleteMutation,
    usePenyewaanGetQuery,
    usePenyewaanPostMutation,
    usePenyewaanPatchMutation,
    usePenyewaanDeleteMutation,
} = api;
