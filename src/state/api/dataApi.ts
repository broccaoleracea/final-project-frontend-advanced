"use client";
import { createApi, fetchBaseQuery, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import Cookies from "js-cookie";
import { logout, setCredentials } from "@/state/api/authSlice";

type RootState = ReturnType<typeof import("../store").store.getState>;

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = Cookies.get("token") || (getState() as RootState).auth.access_token;

        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        const refreshToken = (api.getState() as RootState).auth.refresh_token;

        const refreshResult = await baseQuery(
            {
                url: '/auth/refresh',
                method: 'POST',
                body: { refreshToken },
            },
            api,
            extraOptions
        ) as { data: RefreshResponse };

        if (refreshResult.data) {
            api.dispatch(setCredentials({
                user: refreshResult.data.user,
                accessToken: refreshResult.data.access_token,
                refreshToken: refreshResult.data.refresh_token
            }));

            Cookies.set("token", refreshResult.data.refresh_token, { expires: 7, secure: true, sameSite: "strict" });

            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
            Cookies.remove("token");
        }
    }

    return result;
};

const endpoints = {
    alat: 'alat',
    kategori: 'kategori',
    pelanggan_data: 'pelanggan_data',
    pelanggan: 'pelanggan',
    penyewaan_detail: 'penyewaan_detail',
    penyewaan: 'penyewaan'
};

const apiEndpoints = (builder) => {
    return Object.keys(endpoints).reduce((acc, key) => {
        const endpoint = endpoints[key];
        acc[`${key}Get`] = builder.query({
            query: (id) => ({ url: `/${endpoint}/${id}`, method: 'GET' }),
        });
        acc[`${key}Post`] = builder.mutation({
            query: (data) => ({
                url: `/${endpoint}`,
                method: 'POST',
                body: data,
            }),
        });
        acc[`${key}Put`] = builder.mutation({
            query: ({ id, data }) => ({
                url: `/${endpoint}/${id}`,
                method: 'PUT',
                body: data,
            }),
        });
        acc[`${key}Delete`] = builder.mutation({
            query: (id) => ({
                url: `/${endpoint}/${id}`,
                method: 'DELETE',
            }),
        });
        return acc;
    }, {});
};

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    endpoints: apiEndpoints,
});

export const {
    useAlatGetQuery,
    useAlatPostMutation,
    useAlatPutMutation,
    useAlatDeleteMutation,
    useKategoriGetQuery,
    useKategoriPostMutation,
    useKategoriPutMutation,
    useKategoriDeleteMutation,
    usePelangganDataGetQuery,
    usePelangganDataPostMutation,
    usePelangganDataPutMutation,
    usePelangganDataDeleteMutation,
    usePelangganGetQuery,
    usePelangganPostMutation,
    usePelangganPutMutation,
    usePelangganDeleteMutation,
    usePenyewaanDetailGetQuery,
    usePenyewaanDetailPostMutation,
    usePenyewaanDetailPutMutation,
    usePenyewaanDetailDeleteMutation,
    usePenyewaanGetQuery,
    usePenyewaanPostMutation,
    usePenyewaanPutMutation,
    usePenyewaanDeleteMutation,
} = api;
