import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Credentials, JSONResponse, Token } from "./types";
import { http_methods, urls } from "./urls";
import { transformResponse } from "../utils/transform-response";
import { transform_error_response } from "./databaseAPI";

const { HOST_URL, LOGIN_URL } = urls;
const { POST } = http_methods;

export const signInAPI = createApi({
  reducerPath: "signIn",
  baseQuery: fetchBaseQuery({ baseUrl: HOST_URL }),
  endpoints: (build) => ({
    login: build.mutation<Token, Credentials>({
      query: (body) => ({
        url: LOGIN_URL,
        method: POST,
        body,
      }),
      transformResponse: transformResponse<Token>,
      transformErrorResponse: transform_error_response,
    }),
  }),
});

export const { useLoginMutation } = signInAPI;
