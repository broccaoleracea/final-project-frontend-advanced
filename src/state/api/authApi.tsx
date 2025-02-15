import { createApi, fetchBaseQuery, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { RootState } from './../store';
import {logout, setCredentials} from "@/state/api/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.accessToken;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        const refreshToken = (api.getState() as RootState).auth.refreshToken;
        
        const refreshResult = await baseQuery(
            {
                url: '/auth/refresh',
                method: 'POST',
                body: { refreshToken },
            },
            api,
            extraOptions
        )as { data: RefreshResponse };

        if (refreshResult.data) {
            api.dispatch(setCredentials({
                user: refreshResult.data.user,
                accessToken: refreshResult.data.accessToken,
                refreshToken: refreshResult.data.refreshToken
            }));

            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
    }

    return result;
};

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        refresh: builder.mutation<LoginResponse, RefreshTokenRequest>({
            query: (refreshToken) => ({
                url: '/auth/refresh',
                method: 'POST',
                body: refreshToken,
            }),
        }),
    }),
});

export const { useLoginMutation, useRefreshMutation } = authApi;