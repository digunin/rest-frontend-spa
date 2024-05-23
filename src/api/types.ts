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
export type ResponsedSingleRecord = SingleRecord & { id: RecordID };
export type Token = { token: string };
export type Credentials = { username: string; password: string };
export type HTTPMethods = "GET" | "POST";
export type CookieName = "username" | "token";

export type JSONResponse<TResp> = {
  data: TResp;
  error_code: number;
  error_message?: string;
  error_text?: string;
};

export type NetworkStatus = "loading" | "idle" | "failed";

export type CRUD_API = {
  login: (credentials: Credentials) => Promise<Token>;
  read: (token: string) => Promise<ResponsedSingleRecord[]>;
  create: (
    record: SingleRecord,
    token: string
  ) => Promise<ResponsedSingleRecord>;
  update: (
    record: SingleRecord,
    id: RecordID,
    token: string
  ) => Promise<ResponsedSingleRecord>;
  delete: (id: RecordID, token: string) => Promise<void>;
};
