import {
  createApi,
  BaseQueryFn,
  EndpointBuilder,
} from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/state/api/authApi";
import {
  Alat,
  Kategori,
  Pelanggan,
  Penyewaan,
  PenyewaanDetail,
} from "@/types/dataTypes";

const ENDPOINTS = {
  alat: "alat",
  kategori: "kategori",
  pelangganData: "data/pelanggan",
  pelanggan: "pelanggan",
  penyewaanDetail: "detail/penyewaan",
  penyewaan: "penyewaan",
} as const;

type EndpointKey = keyof typeof ENDPOINTS;

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T[];
}

type BuilderType = EndpointBuilder<BaseQueryFn, string, string>;

export const dataApi = createApi({
  reducerPath: "dataApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Alat", "Kategori", "PelangganData", "Pelanggan", "PenyewaanDetail", "Penyewaan"],
  endpoints: (builder) => ({
    // ALAT endpoints
    alatGet: builder.query<ApiResponse<Alat>, number | void>({
      query: (id) => ({
        url: `/alat${id ? `/${id}` : ""}`,
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
      providesTags: (result) => {
        if (result?.data) {
          if (Array.isArray(result.data)) {
            return [
              ...result.data.map((item) => ({
                type: "Alat" as const,
                id: item.alat_id,
              })),
              { type: "Alat" as const, id: "LIST" },
            ];
          } else {
            return [
              { type: "Alat" as const, id: (result.data as Alat).alat_id },
              { type: "Alat" as const, id: "LIST" },
            ];
          }
        }
        return [{ type: "Alat" as const, id: "LIST" }];
      },
    }),
    alatPost: builder.mutation<ApiResponse<Alat>, Partial<Alat> | FormData>({
      query: (data) => {
        const headers: Record<string, string> = { Accept: "application/json" };
        if (!(data instanceof FormData)) {
          headers["Content-Type"] = "application/json";
        }
        return {
          url: "/alat",
          method: "POST",
          body: data,
          headers,
        };
      },
      invalidatesTags: [{ type: "Alat", id: "LIST" }],
    }),
    alatPatch: builder.mutation<ApiResponse<Alat>, { id: number | string; data: Partial<Alat> }>({
      query: ({ id, data }) => ({
        url: `/alat/${id}`,
        method: "PATCH",
        body: data,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Alat", id },
        { type: "Alat", id: "LIST" },
      ],
    }),
    alatDelete: builder.mutation<ApiResponse<unknown>, number | string>({
      query: (id) => ({
        url: `/alat/${id}`,
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Alat", id },
        { type: "Alat", id: "LIST" },
      ],
    }),

    // KATEGORI endpoints
    kategoriGet: builder.query<ApiResponse<Kategori>, number | void>({
      query: (id) => ({
        url: `/kategori${id ? `/${id}` : ""}`,
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
      providesTags: (result) => {
        if (result?.data) {
          if (Array.isArray(result.data)) {
            return [
              ...result.data.map((item) => ({
                type: "Kategori" as const,
                id: item.kategori_id,
              })),
              { type: "Kategori" as const, id: "LIST" },
            ];
          } else {
            return [
              { type: "Kategori" as const, id: (result.data as Kategori).kategori_id },
              { type: "Kategori" as const, id: "LIST" },
            ];
          }
        }
        return [{ type: "Kategori" as const, id: "LIST" }];
      },
    }),
    kategoriPost: builder.mutation<ApiResponse<Kategori>, Partial<Kategori> | FormData>({
      query: (data) => {
        const headers: Record<string, string> = { Accept: "application/json" };
        if (!(data instanceof FormData)) {
          headers["Content-Type"] = "application/json";
        }
        return {
          url: "/kategori",
          method: "POST",
          body: data,
          headers,
        };
      },
      invalidatesTags: [{ type: "Kategori", id: "LIST" }],
    }),
    kategoriPatch: builder.mutation<ApiResponse<Kategori>, { id: number | string; data: Partial<Kategori> }>({
      query: ({ id, data }) => ({
        url: `/kategori/${id}`,
        method: "PATCH",
        body: data,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Kategori", id },
        { type: "Kategori", id: "LIST" },
      ],
    }),
    kategoriDelete: builder.mutation<ApiResponse<unknown>, number | string>({
      query: (id) => ({
        url: `/kategori/${id}`,
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Kategori", id },
        { type: "Kategori", id: "LIST" },
      ],
    }),

    // PELANGGAN endpoints
    pelangganGet: builder.query<ApiResponse<Pelanggan>, number | void>({
      query: (id) => ({
        url: `/pelanggan${id ? `/${id}` : ""}`,
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
      providesTags: (result) => {
        if (result?.data) {
          if (Array.isArray(result.data)) {
            return [
              ...result.data.map((item) => ({
                type: "Pelanggan" as const,
                id: item.pelanggan_id,
              })),
              { type: "Pelanggan" as const, id: "LIST" },
            ];
          } else {
            return [
              { type: "Pelanggan" as const, id: (result.data as Pelanggan).pelanggan_id },
              { type: "Pelanggan" as const, id: "LIST" },
            ];
          }
        }
        return [{ type: "Pelanggan" as const, id: "LIST" }];
      },
    }),
    pelangganPost: builder.mutation<ApiResponse<Pelanggan>, Partial<Pelanggan> | FormData>({
      query: (data) => {
        const headers: Record<string, string> = { Accept: "application/json" };
        if (!(data instanceof FormData)) {
          headers["Content-Type"] = "application/json";
        }
        return {
          url: "/pelanggan",
          method: "POST",
          body: data,
          headers,
        };
      },
      invalidatesTags: [{ type: "Pelanggan", id: "LIST" }],
    }),
    pelangganPatch: builder.mutation<ApiResponse<Pelanggan>, { id: number | string; data: Partial<Pelanggan> }>({
      query: ({ id, data }) => ({
        url: `/pelanggan/${id}`,
        method: "PATCH",
        body: data,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Pelanggan", id },
        { type: "Pelanggan", id: "LIST" },
      ],
    }),
    pelangganDelete: builder.mutation<ApiResponse<unknown>, number | string>({
      query: (id) => ({
        url: `/pelanggan/${id}`,
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Alat", id },
        { type: "Alat", id: "LIST" },
      ],
    }),

    // PELANGGAN DATA endpoints
    pelangganDataGet: builder.query<ApiResponse<Pelanggan>, number | void>({
      query: (id) => ({
        url: `/data/pelanggan${id ? `/${id}` : ""}`,
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
      providesTags: (result) => {
        if (result?.data) {
          if (Array.isArray(result.data)) {
            return [
              ...result.data.map((item) => ({
                type: "PelangganData" as const,
                id: item.pelanggan_id,
              })),
              { type: "PelangganData" as const, id: "LIST" },
            ];
          } else {
            return [
              { type: "PelangganData" as const, id: (result.data as Pelanggan).pelanggan_id },
              { type: "PelangganData" as const, id: "LIST" },
            ];
          }
        }
        return [{ type: "PelangganData" as const, id: "LIST" }];
      },
    }),
    pelangganDataPost: builder.mutation<ApiResponse<Pelanggan>, Partial<Pelanggan> | FormData>({
      query: (data) => {
        const headers: Record<string, string> = { Accept: "application/json" };
        if (!(data instanceof FormData)) {
          headers["Content-Type"] = "application/json";
        }
        return {
          url: "/data/pelanggan",
          method: "POST",
          body: data,
          headers,
        };
      },
      invalidatesTags: [{ type: "PelangganData", id: "LIST" }],
    }),
    pelangganDataPatch: builder.mutation<ApiResponse<Pelanggan>, { id: number | string; data: Partial<Pelanggan> }>({
      query: ({ id, data }) => ({
        url: `/data/pelanggan/${id}`,
        method: "PATCH",
        body: data,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "PelangganData", id },
        { type: "PelangganData", id: "LIST" },
      ],
    }),
    pelangganDataDelete: builder.mutation<ApiResponse<unknown>, number | string>({
      query: (id) => ({
        url: `/data/pelanggan/${id}`,
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: (result, error, id) => [
        { type: "PelangganData", id },
        { type: "PelangganData", id: "LIST" },
      ],
    }),

    // PENYEWAAN endpoints
    penyewaanGet: builder.query<ApiResponse<Penyewaan>, number | void>({
      query: (id) => ({
        url: `/penyewaan${id ? `/${id}` : ""}`,
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
      providesTags: (result) => {
        if (result?.data) {
          if (Array.isArray(result.data)) {
            return [
              ...result.data.map((item) => ({
                type: "Penyewaan" as const,
                id: item.penyewaan_id,
              })),
              { type: "Penyewaan" as const, id: "LIST" },
            ];
          } else {
            return [
              { type: "Penyewaan" as const, id: (result.data as Penyewaan).penyewaan_id },
              { type: "Penyewaan" as const, id: "LIST" },
            ];
          }
        }
        return [{ type: "Penyewaan" as const, id: "LIST" }];
      },
    }),
    penyewaanPost: builder.mutation<ApiResponse<Penyewaan>, Partial<Penyewaan> | FormData>({
      query: (data) => {
        const headers: Record<string, string> = { Accept: "application/json" };
        if (!(data instanceof FormData)) {
          headers["Content-Type"] = "application/json";
        }
        return {
          url: "/penyewaan",
          method: "POST",
          body: data,
          headers,
        };
      },
      invalidatesTags: [{ type: "Penyewaan", id: "LIST" }],
    }),
    penyewaanPatch: builder.mutation<ApiResponse<Penyewaan>, { id: number | string; data: Partial<Penyewaan> }>({
      query: ({ id, data }) => ({
        url: `/penyewaan/${id}`,
        method: "PATCH",
        body: data,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Penyewaan", id },
        { type: "Penyewaan", id: "LIST" },
      ],
    }),
    penyewaanDelete: builder.mutation<ApiResponse<unknown>, number | string>({
      query: (id) => ({
        url: `/penyewaan/${id}`,
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Penyewaan", id },
        { type: "Penyewaan", id: "LIST" },
      ],
    }),

    // PENYEWAAN DETAIL endpoints
    penyewaanDetailGet: builder.query<ApiResponse<PenyewaanDetail>, number | void>({
      query: (id) => ({
        url: `/detail/penyewaan${id ? `/${id}` : ""}`,
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
      providesTags: (result) => {
        if (result?.data) {
          if (Array.isArray(result.data)) {
            return [
              ...result.data.map((item) => ({
                type: "PenyewaanDetail" as const,
                id: item.penyewaan_detail_id,
              })),
              { type: "PenyewaanDetail" as const, id: "LIST" },
            ];
          } else {
            return [
              { type: "PenyewaanDetail" as const, id: (result.data as PenyewaanDetail).penyewaan_detail_id },
              { type: "PenyewaanDetail" as const, id: "LIST" },
            ];
          }
        }
        return [{ type: "PenyewaanDetail" as const, id: "LIST" }];
      },
    }),
    penyewaanDetailPost: builder.mutation<ApiResponse<PenyewaanDetail>, Partial<PenyewaanDetail> | FormData>({
      query: (data) => {
        const headers: Record<string, string> = { Accept: "application/json" };
        if (!(data instanceof FormData)) {
          headers["Content-Type"] = "application/json";
        }
        return {
          url: "/detail/penyewaan",
          method: "POST",
          body: data,
          headers,
        };
      },
      invalidatesTags: [{ type: "PenyewaanDetail", id: "LIST" }],
    }),
    penyewaanDetailPatch: builder.mutation<ApiResponse<PenyewaanDetail>, { id: number | string; data: Partial<PenyewaanDetail> }>({
      query: ({ id, data }) => ({
        url: `/detail/penyewaan/${id}`,
        method: "PATCH",
        body: data,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "PenyewaanDetail", id },
        { type: "PenyewaanDetail", id: "LIST" },
      ],
    }),
    penyewaanDetailDelete: builder.mutation<ApiResponse<unknown>, number | string>({
      query: (id) => ({
        url: `/detail/penyewaan/${id}`,
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: (result, error, id) => [
        { type: "PenyewaanDetail", id },
        { type: "PenyewaanDetail", id: "LIST" },
      ],
    }),
  }),
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
} = dataApi;
