import { ResponsedSingleRecord, Token } from "../api/types";

export const mock_login_success = (data: Token) =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        data,
      }),
  });

export const mock_login_failed = (resp: Object) =>
  Promise.resolve({
    ok: false,
    ...resp,
  });

export const mock_CRUD_success = (
  data?: ResponsedSingleRecord | ResponsedSingleRecord[]
) =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        data,
        error_code: 0,
      }),
  });

export const mock_CRUD_failed = (resp: Object) =>
  Promise.resolve({
    ok: false,
    ...resp,
  });

export const read_response_data = [
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
];
