import { JSONResponse } from "../api/types";
import prod_mode from "../utils/isProdMode";

const prodTransform = <T>(response: JSONResponse<T>): T | Promise<T> => {
  const { error_code, data, error_message, error_text } = response;
  return error_code === 0 ? data : Promise.reject(error_text || error_message);
};

const devTransform = <T>(response: T): T | Promise<T> => {
  return response;
};

export const transformResponse = prod_mode ? prodTransform : devTransform;
