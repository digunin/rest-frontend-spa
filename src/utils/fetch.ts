import { JSONResponse } from "../api/types";

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
        if (resp.status === 400) return Promise.reject("Bad request");
        return Promise.reject(`${resp.status}, ${resp.statusText}`);
      })
      .then((resp: JSONResponse<TResp>) => {
        return Promise.resolve(resp);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  } catch (err) {
    return Promise.reject("Network error");
  }
};
