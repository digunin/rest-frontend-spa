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

export type JSONResponse<TResp> = {
  data: TResp;
  error_code: number;
  error_message: string;
};

export type Token = { token: string };

export type Credentials = { username: string; password: string };

export type HTTPMethods = "GET" | "POST";
