import {
  SingleRecord,
  RecordID,
  ResponsedSingleRecord,
  Credentials,
  Token,
  CRUD_API,
  HTTPMethods,
} from "./types";
import {
  HOST_URL,
  LOGIN_URL,
  CREATE_URL,
  READ_URL,
  UPDATE_URL,
  DEETE_URL,
} from "./urls";
import { genericFetch } from "../utils/fetch";

const getAuthHeaderInit = (token: string) => {
  return { "x-auth": token };
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

export const crudAPI: CRUD_API = {
  login: async (credentials: Credentials): Promise<Token> => {
    const options = createFetchOptions("POST", {}, credentials);
    return genericFetch<Token>(new URL(LOGIN_URL, HOST_URL), options).then(
      (resp) => {
        if (resp.error_code === 0) return resp.data;
        return Promise.reject(resp.error_text || "Неверные данные");
      }
    );
  },
  read: async (token: string): Promise<ResponsedSingleRecord[]> => {
    const options = createFetchOptions("GET", getAuthHeaderInit(token));
    return genericFetch<ResponsedSingleRecord[]>(
      new URL(READ_URL, HOST_URL),
      options
    ).then((resp) => {
      if (resp.error_code === 0) return resp.data;
      return Promise.reject(resp.error_text || "Не уддалось загрузить данные");
    });
  },
  create: async (
    record: SingleRecord,
    token: string
  ): Promise<ResponsedSingleRecord> => {
    const options = createFetchOptions(
      "POST",
      getAuthHeaderInit(token),
      record
    );
    return genericFetch<ResponsedSingleRecord>(
      new URL(CREATE_URL, HOST_URL),
      options
    ).then((resp) => {
      if (resp.error_code === 0) return resp.data;
      return Promise.reject(resp.error_text || "Не удалось добавить запись");
    });
  },
  update: async (
    record: SingleRecord,
    id: RecordID,
    token: string
  ): Promise<ResponsedSingleRecord> => {
    const options = createFetchOptions(
      "POST",
      getAuthHeaderInit(token),
      record
    );
    return genericFetch<ResponsedSingleRecord>(
      new URL(`${UPDATE_URL}/${id}`, HOST_URL),
      options
    ).then((resp) => {
      if (resp.error_code === 0) return resp.data;
      return Promise.reject(resp.error_text || "Не удалось изменить запись");
    });
  },
  delete: async (id: RecordID, token: string): Promise<void> => {
    const options = createFetchOptions("POST", getAuthHeaderInit(token));
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
