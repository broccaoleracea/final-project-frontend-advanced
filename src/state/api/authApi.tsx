"use client";
import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from "@/state/api/authSlice";
import Cookies from "js-cookie";

type RootState = ReturnType<typeof import("../store").store.getState>;

interface ApiRefreshResponse {
  success: boolean;
  access_token: string;
  message: string;
}

interface ApiError {
  status: number;
  data: string;
}

const COOKIE_KEYS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
} as const;

export const baseQueryWithReauth: BaseQueryFn = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  const logoutClient = () => {
    Object.values(COOKIE_KEYS).forEach((key) => Cookies.remove(key));
    api.dispatch(logout());
  };

  if (result.error && result.error.status === 401) {
    console.log("401 error")
    const refreshToken =
      Cookies.get(COOKIE_KEYS.REFRESH_TOKEN) ||
      (api.getState() as RootState).auth.refreshToken;

    if (!refreshToken) {
      logoutClient();
      return {
        error: {
          status: 401,
          data: "No refresh token available",
        } as ApiError,
      };
    }

    try {
        console.log("ssdfasdf")
      const refreshResult = (await baseQuery(
        {
          url: "/auth/refresh",
          method: "POST",
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        },
        api,
        extraOptions
      )) as { data: ApiRefreshResponse };

      if (refreshResult.data && refreshResult.data.success) {
        api.dispatch(
          setCredentials({
            user: "admin",
            accessToken: refreshResult.data.access_token,
            refreshToken: refreshToken,
          })
        );

        result = await baseQuery(args, api, extraOptions);
      } else {
        logoutClient();
        return {
          error: {
            status: 401,
            data: "Failed to refresh token",
          } as ApiError,
        };
      }
    } catch (error) {
      logoutClient();
      return {
        error: {
          status: 401,
          data: "Error during token refresh",
        } as ApiError,
      };
    }
  }

  return result;
};

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token =
      Cookies.get("accessToken") || (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: credentials,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({
              user: "admin",
              accessToken: data.access_token,
              refreshToken: data.refresh_token,
            })
          );

          Cookies.set("accessToken", data.access_token, {
            expires: 1 / 24, // 1 hour
            secure: true,
            sameSite: "strict",
          });

          Cookies.set("refreshToken", data.refresh_token, {
            expires: 4 / 27, // 4 hours
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
        url: "/auth/refresh",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: refreshToken,
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: userData,
      }),
    }),
    resetPassword: builder.mutation({
      query: (userData) => ({
        url: "/reset-password",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: userData,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (userData) => ({
        url: "/forgot-password",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: userData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRegisterMutation,
} = authApi;
