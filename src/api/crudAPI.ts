import {
  SingleRecord,
  RecordID,
  ResponsedSingleRecord,
  Credentials,
  Token,
  CRUD_API,
  HTTPMethods,
} from "./types";
import { urls, http_methods } from "./urls";
import { genericFetch } from "../utils/fetch";

const { HOST_URL, LOGIN_URL, CREATE_URL, READ_URL, UPDATE_URL, DEETE_URL } =
  urls;
const { GET, POST, PUT, DELETE } = http_methods;

const getAuthHeaderInit = (token: string) => {
  return { "x-auth": token };
};

export const createFetchOptions = (
  method: HTTPMethods,
  headersInit: HeadersInit,
  body?: SingleRecord | Credentials,
  signal?: AbortSignal
) => {
  const headers = new Headers(headersInit);
  if (body) headers.append("Content-Type", "application/json");
  return {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    signal,
  };
};

export const crudAPI: CRUD_API = {
  login: async (credentials): Promise<Token> => {
    const options = createFetchOptions(POST, {}, credentials);
    return genericFetch<Token>(new URL(LOGIN_URL, HOST_URL), options).then(
      (resp) => {
        if (resp.error_code === 0) return resp.data;
        return Promise.reject(resp.error_text || "Неверные данные");
      }
    );
  },
  read: async (token): Promise<ResponsedSingleRecord[]> => {
    const options = createFetchOptions(GET, getAuthHeaderInit(token));
    return genericFetch<ResponsedSingleRecord[]>(
      new URL(READ_URL, HOST_URL),
      options
    ).then((resp) => {
      if (resp.error_code === 0) return resp.data;
      return Promise.reject(resp.error_text || "Не уддалось загрузить данные");
    });
  },
  create: async (record, token, signal): Promise<ResponsedSingleRecord> => {
    const options = createFetchOptions(
      POST,
      getAuthHeaderInit(token),
      record,
      signal
    );
    return genericFetch<ResponsedSingleRecord>(
      new URL(CREATE_URL, HOST_URL),
      options
    ).then((resp) => {
      if (resp.error_code === 0) return resp.data;
      return Promise.reject(resp.error_text || "Не удалось добавить запись");
    });
  },
  update: async (record, id, token, signal): Promise<ResponsedSingleRecord> => {
    const options = createFetchOptions(
      PUT,
      getAuthHeaderInit(token),
      record,
      signal
    );
    return genericFetch<ResponsedSingleRecord>(
      new URL(`${UPDATE_URL}/${id}`, HOST_URL),
      options
    ).then((resp) => {
      if (resp.error_code === 0) return resp.data;
      return Promise.reject(resp.error_text || "Не удалось изменить запись");
    });
  },
  delete: async (id, token, signal): Promise<void> => {
    const options = createFetchOptions(
      DELETE,
      getAuthHeaderInit(token),
      undefined,
      signal
    );
    return genericFetch<undefined>(
      new URL(`${DEETE_URL}/${id}`, HOST_URL),
      options
    ).then((resp) => {
      if (resp.error_code === 0) return Promise.resolve();
      if (resp.error_code === 1) return Promise.reject(resp.error_message);
      return Promise.reject(resp.error_text);
    });
  },
};
