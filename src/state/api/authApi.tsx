"use client";
import { createApi, fetchBaseQuery, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { logout, setCredentials } from "@/state/api/authSlice";
import Cookies from "js-cookie";

type RootState = ReturnType<typeof import("../store").store.getState>;

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = Cookies.get("token") || (getState() as RootState).auth.accessToken;

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

export const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCredentials({
                        user: data.user,
                        accessToken: data.access_token,
                        refreshToken: data.refresh_token
                    }));
                    // Cookies.set("token", data.access_token, { expires: 7, secure: true, sameSite: "strict" });
                    Cookies.set("token", data.access_token, { expires: 7, secure: true, sameSite: "strict" });
                } catch (error) {
                    console.error("Login failed:", error);
                }
            },
        }),
        refresh: builder.mutation<LoginResponse, RefreshTokenRequest>({
            // Refresh account access token which works perfectly without any issues whatsoever 
            // -kat
            query: (refreshToken) => ({
                url: '/auth/refresh',
                method: 'POST',
                body: refreshToken,
            }),
        }),
        register: builder.mutation<RegisterResponse, RegisterRequest>({
            // Account regiestr 
            query: (userData) => ({
                url: '/register',
                method: 'POST',
                body: userData,
            }),
        }),
    }),
});

export const { useLoginMutation, useRefreshMutation, useRegisterMutation } = authApi;
