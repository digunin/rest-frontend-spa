import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RecordID, SingleRecord } from "./types";
import { http_methods, urls } from "./urls";
import { ResponsedSingleRecord } from "./types";
import { RootState } from "../store";
import { transformResponse } from "../utils/transform-response";
import { error_messages } from "../utils/text";

const { HOST_URL, READ_URL, CREATE_URL, UPDATE_URL, DEETE_URL } = urls;
const { POST, PUT, DELETE } = http_methods;

export const transform_error_response = (error: FetchBaseQueryError) => {
  return error.status === 403
    ? Promise.reject(error_messages.accessDeny)
    : Promise.reject(error.status);
};

export const databaseAPI = createApi({
  reducerPath: "database",
  tagTypes: ["Rows"],
  baseQuery: fetchBaseQuery({
    baseUrl: HOST_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).userState.token;
      if (token) {
        headers.set("x-auth", token);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    loadData: build.query<Array<ResponsedSingleRecord>, void>({
      query: () => ({
        url: READ_URL,
      }),
      providesTags: (result) => {
        return result ? result.map(({ id }) => ({ type: "Rows", id })) : [];
      },
      transformResponse: transformResponse<Array<ResponsedSingleRecord>>,
      transformErrorResponse: transform_error_response,
    }),
    createRow: build.mutation<ResponsedSingleRecord, SingleRecord>({
      query: (body) => ({
        url: CREATE_URL,
        method: POST,
        body,
      }),
      invalidatesTags: ["Rows"],
      transformResponse: transformResponse<ResponsedSingleRecord>,
      transformErrorResponse: transform_error_response,
    }),
    updateRow: build.mutation<ResponsedSingleRecord, ResponsedSingleRecord>({
      query: ({ id, ...body }) => ({
        url: `${UPDATE_URL}/${id}`,
        method: PUT,
        body,
      }),
      invalidatesTags: ["Rows"],
      transformResponse: transformResponse<ResponsedSingleRecord>,
      transformErrorResponse: transform_error_response,
    }),
    deleteRow: build.mutation<void, RecordID>({
      query: (id) => ({
        url: `${DEETE_URL}/${id}`,
        method: DELETE,
      }),
      invalidatesTags: ["Rows"],
      transformResponse: transformResponse<void>,
      transformErrorResponse: transform_error_response,
    }),
  }),
});

export const {
  useLoadDataQuery,
  useCreateRowMutation,
  useUpdateRowMutation,
  useDeleteRowMutation,
} = databaseAPI;
