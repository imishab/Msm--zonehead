import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ZoneApi = createApi({
  reducerPath: "UserApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://msm-backend-no1z.onrender.com/api/zone",
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


   

  
  }),
});

export const {
  useSigninMutation,
  useSignoutMutation,
  useGetZoneProfileQuery,
  useGenerateReceiptMutation,
  useGetAllReceiptsQuery,
} = ZoneApi;
