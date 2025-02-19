"use client"
import {createApi, fetchBaseQuery, BaseQueryFn} from '@reduxjs/toolkit/query/react';
import {logout, setCredentials} from "@/state/api/authSlice";
import Cookies from "js-cookie";

type RootState = ReturnType<typeof import("../store").store.getState>;


const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers, {getState}) => {
        const token = Cookies.get("access_token") || (getState() as RootState).auth.accessToken;
        console.log("cookie" + Cookies.get("access_token"))
        console.log("redux" + (getState() as RootState).auth.accessToken)
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    const logoutClient = () => {
        console.log("logging out")
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        api.dispatch(logout());
    }

    if (result.error && result.error.status === 401) {
        const refreshToken = Cookies.get("refresh_token") || (api.getState() as RootState).auth.access_token;
        console.log(refreshToken)
        if (refreshToken == undefined || refreshToken == null) {
            logoutClient();
            return { error: { status: 401, data: 'No refresh token available' } };
        }
        const refreshResult = (await baseQuery(
            { 
                url: "/auth/refresh",
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${refreshToken}`,
                }
            },
            api,
            extraOptions
        )) as { data: RefreshResponse };
        if (refreshResult.data) {
            api.dispatch(
                setCredentials({
                    user:"admin",
                    accessToken: refreshResult.data.access_token,
                    refreshToken: refreshResult.data.refresh_token,
                })
            );

            Cookies.set("access_token", refreshResult.data.access_token, {
                expires: 1 / 24, // 1 hour 
                secure: true,
                sameSite: "strict",
            });

            result = await baseQuery(args, api, extraOptions);
        } else {
            logoutClient();
            return { error: { status: 401, data: 'Failed to refresh token' } };
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
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: credentials,
            }),
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;
                    dispatch(setCredentials({
                        user: "admin",
                        accessToken: data.access_token,
                        refreshToken: data.refresh_token
                    }));

                    Cookies.set("access_token", data.access_token, {
                        expires: 1 / 24, // 1 hour 
                        secure: true,
                        sameSite: "strict",
                    });

                    Cookies.set("refresh_token", data.refresh_token, {
                        expires: 7, // A week
                        secure: true,
                        sameSite: "strict",
                    });
                } catch (error) {
                    console.error("Login failed:", error);
                }
            },
        }),

        refresh: builder.mutation<LoginResponse, RefreshTokenRequest>({
            query: (refreshToken) => ({
                url: '/auth/refresh',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: refreshToken,
            }),
        }),
        register: builder.mutation<RegisterResponse, RegisterRequest>({
            query: (userData) => ({
                url: '/register',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: userData,
            }),
        }),
        resetpass: builder.mutation({
            query: (userData) => ({
                url: '/reset-password',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: userData,
            }),
        }),
        forgotpass: builder.mutation({
            query: (userData) => ({
                url: '/forgot-password',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: userData,
            }),
        }),
    }),
});

export const {useLoginMutation, useRefreshMutation, useForgotpassMutation, useResetpassMutation, useRegisterMutation} = authApi;