import { ResponsedSingleRecord, SingleRecord, Token } from "../api/types";

export const mock_login_success = (resolveddData: Token) =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        data: resolveddData,
        error_code: 0,
      }),
  });

export const mock_login_failed = (resp: Object) =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        data: null,
        error_code: 2004,
        error_text: "Access deny",
      }),
  });

export const mock_CRUD_success = (
  data?: SingleRecord | ResponsedSingleRecord | ResponsedSingleRecord[]
) =>
  Promise.resolve({
    ok: true,
    json: () => {
      return Promise.resolve({
        data,
        error_code: 0,
      });
    },
  });

export const mock_CRUD_failed = (resolved: Object) =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        data: null,
        error_code: 2004,
        error_text: "Access deny",
        ...resolved,
      }),
  });

export const mock_Fetch_throw_error = () => {
  throw new Error("mocked error");
};

export const mocked_single_record: SingleRecord = {
  companySigDate: "2022-07-23T11:19:15.027Z",
  companySignatureName: "Приказ.sig",
  documentName: "Договор 2.pdf",
  documentStatus: "Подписан",
  documentType: "Приказ о приеме",
  employeeNumber: "1234",
  employeeSigDate: "2022-07-23T11:19:15.017Z",
  employeeSignatureName: "Приказ 2.sig",
};

export const mocked_read_response_data: ResponsedSingleRecord[] = [
  {
    companySigDate: "2022-12-23T11:19:27.017Z",
    companySignatureName: "Договор.sig",
    documentName: "Договор.pdf",
    documentStatus: "Подписан",
    documentType: "Трудовой договор",
    employeeNumber: "1234",
    employeeSigDate: "2022-12-23T11:19:27.017Z",
    employeeSignatureName: "Договор.sig",
    id: "56afec6f-c72d-4d6a-b93a-b26df5fcc48a",
  },
  {
    companySigDate: "2022-11-23T11:19:30.027Z",
    companySignatureName: "Приказ.sig",
    documentName: "Договор 2.pdf",
    documentStatus: "Подписан",
    documentType: "Приказ о приеме",
    employeeNumber: "1234",
    employeeSigDate: "2022-11-23T11:19:27.017Z",
    employeeSignatureName: "Приказ 2.sig",
    id: "ce4ab411-f895-400a-9599-db99a1c32174",
  },
  {
    companySigDate: "2022-10-23T11:19:25.017Z",
    companySignatureName: "Договор.sig",
    documentName: "Договор.pdf",
    documentStatus: "Подписан",
    documentType: "Трудовой договор",
    employeeNumber: "1234",
    employeeSigDate: "2022-10-23T11:19:25.017Z",
    employeeSignatureName: "Договор.sig",
    id: "56afec6f-c72d-4d6a-b93a-b26df5fcc48b",
  },
  {
    companySigDate: "2022-09-23T11:19:22.027Z",
    companySignatureName: "Приказ.sig",
    documentName: "Договор 2.pdf",
    documentStatus: "Подписан",
    documentType: "Приказ о приеме",
    employeeNumber: "1234",
    employeeSigDate: "2022-09-23T11:19:22.017Z",
    employeeSignatureName: "Приказ 2.sig",
    id: "ce4ab411-f895-400a-9599-db99a1c3217c",
  },
  {
    companySigDate: "2022-08-23T11:19:18.017Z",
    companySignatureName: "Договор.sig",
    documentName: "Договор.pdf",
    documentStatus: "Подписан",
    documentType: "Трудовой договор",
    employeeNumber: "1234",
    employeeSigDate: "2022-08-23T11:19:18.017Z",
    employeeSignatureName: "Договор.sig",
    id: "56afec6f-c72d-4d6a-b93a-b26df5fcc48d",
  },
];
