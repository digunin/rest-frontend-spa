import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Credentials, JSONResponse, Token } from "./types";
import { http_methods, urls } from "./urls";

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
      transformResponse: (response: JSONResponse<Token>) => {
        const { data, error_text } = response;
        return data ? data : Promise.reject(error_text);
      },
      transformErrorResponse: (response) => {
        return Promise.reject(response.status);
      },
    }),
  }),
});

export const { useLoginMutation } = signInAPI;
