export type SingleRecord = {
  companySigDate: string;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: string;
  employeeSignatureName: string;
};

export type RecordID = string;
export type DatabaseRow = SingleRecord & { id: RecordID };
export type DatabaseData = Array<DatabaseRow>;
export type Token = { token: string };
export type Credentials = { username: string; password: string };
export type HTTPMethods = "GET" | "POST" | "PUT" | "DELETE";
export type CookieName = "username" | "token";

export type JSONResponse<TResp> = {
  data: TResp;
  error_code: number;
  error_message?: string;
  error_text?: string;
};

export type NetworkStatus = "loading" | "idle" | "failed";
export type NetworkInteracting = { status: NetworkStatus; error: string };

export type CRUD_API = {
  login: (credentials: Credentials) => Promise<Token>;
  read: (token: string) => Promise<DatabaseData>;
  create: (
    record: SingleRecord,
    token: string,
    signal?: AbortSignal
  ) => Promise<DatabaseRow>;
  update: (
    record: SingleRecord,
    id: RecordID,
    token: string,
    signal?: AbortSignal
  ) => Promise<DatabaseRow>;
  delete: (id: RecordID, token: string, signal?: AbortSignal) => Promise<void>;
};

export const fakeCredentials: Credentials = {
  username: "user",
  password: "password",
};

export const fakeToken = "fake-token";
