import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ZoneApi = createApi({
  reducerPath: "UserApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://backend.msmnorth.com/api/zone",
    // baseUrl:"http://localhost:4000/api/zone",
    credentials: "include", // Ensures cookies are sent with the request
    prepareHeaders: (headers) => {
      // Retrieve zoneToken from localStorage
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Zone", "Receipts"],

  endpoints: (builder) => ({


    signin: builder.mutation({
      query: (user) => ({
        url: "/signin",
        method: "POST",
        body: user,
      }),
    }),
    

    signout: builder.mutation({
      query: () => ({
        url: "/signout",
        method: "POST",
      }),
    }),

    getZoneProfile: builder.query({
      query: () => "/profile",
      providesTags: ["Zone"],
    }),

    generateReceipt: builder.mutation({
      query: (receipt) => ({
        url: '/generate-receipt',
        method: 'POST',
        body: receipt,
        providesTags: ["Zone"],
      }),
    }),

    getAllReceipts: builder.query({
      query: () => "/all-receipts",
      providesTags: ["Receipts"],
    }),

    deleteReceipt: builder.mutation({
      query: (id) => ({
        url: `/delete-receipt/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Receipts'],
    }),

    getReceiptById: builder.query({
      query: (id) => `/receipt/${id}`, // API call to get receipt by ID
    }),
   

  
  }),
});

export const {
  useSigninMutation,
  useSignoutMutation,
  useGetZoneProfileQuery,
  useGenerateReceiptMutation,
  useGetAllReceiptsQuery,
  useDeleteReceiptMutation,
  useGetReceiptByIdQuery,
} = ZoneApi;
