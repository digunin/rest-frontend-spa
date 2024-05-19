import {
  SingleRecord,
  RecordID,
  ResponsedSingleRecord,
  Credentials,
  Token,
} from "./types";
import {
  HOST_URL,
  LOGIN_URL,
  CREATE_URL,
  READ_URL,
  UPDATE_URL,
  DEETE_URL,
} from "./urls";
import { createFetchOptions, genericFetch } from "../utils/fetch";

const getAuthHeaderInit = (token: string) => {
  return { "x-auth": token };
};

export const crudAPI = {
  login: async (credentials: Credentials): Promise<Token> => {
    const options = createFetchOptions("POST", {}, credentials);
    return genericFetch<Token>(new URL(LOGIN_URL, HOST_URL), options)
      .then((resp) => resp.data)
      .catch((err) => err);
  },
  read: async (token: string): Promise<ResponsedSingleRecord[]> => {
    const options = createFetchOptions("GET", getAuthHeaderInit(token));
    return genericFetch<ResponsedSingleRecord[]>(
      new URL(READ_URL, HOST_URL),
      options
    )
      .then((resp) => resp.data)
      .catch((err) => err);
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
    )
      .then((resp) => resp.data)
      .catch((err) => err);
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
    )
      .then((resp) => resp.data)
      .catch((err) => err);
  },
  delete: async (id: RecordID, token: string): Promise<void> => {
    const options = createFetchOptions("POST", getAuthHeaderInit(token));
    return genericFetch<undefined>(
      new URL(`${DEETE_URL}/${id}`, HOST_URL),
      options
    ).then((resp) => {
      if (resp.error_code === 0) return Promise.resolve();
      return Promise.reject(resp.error_message);
    });
  },
};
