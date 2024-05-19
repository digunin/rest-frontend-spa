import {
  Credentials,
  HTTPMethods,
  JSONResponse,
  SingleRecord,
} from "../api/types";

export const genericFetch = <TResp>(
  url: URL | string,
  options: RequestInit
): Promise<JSONResponse<TResp>> => {
  try {
    return fetch(url, options)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        return Promise.reject(`${resp.status}, ${resp.statusText}`);
      })
      .then((resp: JSONResponse<TResp>) => {
        return Promise.resolve(resp);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  } catch (err) {
    return Promise.reject(err);
  }
};

export const createFetchOptions = (
  method: HTTPMethods,
  headersInit: HeadersInit,
  body?: SingleRecord | Credentials
) => {
  const headers = new Headers(headersInit);
  if (body) headers.append("Content-Type", "application/json");
  return {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };
};
