import {
  SingleRecord,
  RecordID,
  ResponsedSingleRecord,
  Credentials,
  Token,
  CRUD_API,
} from "./types";
import { mocked_read_response_data } from "../utils/mock.fetch";
import { error_messages } from "../utils/text";
import { nanoid } from "nanoid";

const delay = process.env.NODE_ENV === "test" ? 0 : 500;

export const fakeToken = "fake-token";
export const fakeCredentials: Credentials = {
  username: "user",
  password: "password",
};

export const FakeAPI: CRUD_API = {
  login: async (credentials: Credentials): Promise<Token> => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        if (
          credentials.username === fakeCredentials.username &&
          credentials.password === fakeCredentials.password
        ) {
          res({ token: fakeToken });
        } else rej(error_messages.accessDeny);
      }, delay);
    });
  },
  read: async (token: string): Promise<ResponsedSingleRecord[]> => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        if (token === fakeToken) {
          res(mocked_read_response_data);
        } else rej(error_messages.accessDeny);
      }, delay);
    });
  },
  create: async (
    record: SingleRecord,
    token: string
  ): Promise<ResponsedSingleRecord> => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        if (token === fakeToken) {
          res({ ...record, id: nanoid() });
        } else rej(error_messages.accessDeny);
      }, delay);
    });
  },
  update: async (
    record: SingleRecord,
    id: RecordID,
    token: string
  ): Promise<ResponsedSingleRecord> => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        if (token === fakeToken) {
          res({ ...record, id });
        } else rej(error_messages.accessDeny);
      }, delay);
    });
  },
  delete: async (id: RecordID, token: string): Promise<void> => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        if (token === fakeToken) {
          res();
        } else rej(error_messages.accessDeny);
      }, delay);
    });
  },
};
