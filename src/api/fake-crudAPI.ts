import {
  SingleRecord,
  RecordID,
  ResponsedSingleRecord,
  Credentials,
  Token,
  CRUD_API,
} from "./types";
import { mocked_read_response_data } from "../utils/mock.fetch";

const delay = 500;
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
        } else rej("Access deny");
      }, delay);
    });
  },
  read: async (token: string): Promise<ResponsedSingleRecord[]> => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        if (token === fakeToken) {
          res(mocked_read_response_data);
        } else rej("Access deny");
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
          res({ ...record, id: "qqq-www-eee-rrr-ttt" });
        } else rej("Access deny");
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
        } else rej("Access deny");
      }, delay);
    });
  },
  delete: async (id: RecordID, token: string): Promise<void> => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        if (token === fakeToken) {
          res();
        } else rej("Access deny");
      }, delay);
    });
  },
};
