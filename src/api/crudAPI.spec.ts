import "dotenv/config";
import "@testing-library/jest-dom";
import { crudAPI } from "./crudAPI";
import {
  mock_CRUD_failed,
  mock_CRUD_success,
  mock_Fetch_throw_error,
  mock_login_failed,
  mock_login_success,
  mocked_read_response_data,
  mocked_single_record,
} from "../utils/mock.fetch";
import { fail } from "assert";

describe("crudAPI test", () => {
  global.fetch = jest.fn();
  const spyOnFetch = jest.spyOn(global, "fetch");
  const fn = jest.fn;

  test("login success", async () => {
    spyOnFetch.mockImplementationOnce(
      fn(() => mock_login_success({ token: "fake" })) as jest.Mock
    );
    const result = await crudAPI
      .login({ username: "", password: "" })
      .then((data) => data)
      .catch((err) => fail("promise REJECTED when resolve expect"));
    expect(result.token).toBe("fake");
  });

  test("login failed", async () => {
    spyOnFetch.mockImplementationOnce(
      fn(() => mock_login_failed({})) as jest.Mock
    );
    const result = await crudAPI
      .login({ username: "", password: "" })
      .then(() => fail("promise RESOLVED when reject expect"))
      .catch((err) => err);
    expect(result).toBe("Access deny");
  });

  test("read success", async () => {
    spyOnFetch.mockImplementationOnce(
      fn(() => mock_CRUD_success(mocked_read_response_data)) as jest.Mock
    );
    const result = await crudAPI
      .read("")
      .then((data) => data)
      .catch((err) => fail("promise REJECTED when resolve expect"));
    expect(result.length).toBe(5);
  });

  test("read authorization failed", async () => {
    spyOnFetch.mockImplementationOnce(
      fn(() => mock_CRUD_failed({})) as jest.Mock
    );
    const result = await crudAPI
      .read("")
      .then(() => fail("promise RESOLVED when reject expect"))
      .catch((err) => err);
    expect(result).toBe("Access deny");
  });

  test("create success", async () => {
    spyOnFetch.mockImplementationOnce(
      fn(() => mock_CRUD_success(mocked_single_record)) as jest.Mock
    );
    const result = await crudAPI
      .create(mocked_single_record, "")
      .then((data) => data)
      .catch((err) => fail("promise REJECTED when resolve expect"));
    expect(result).toEqual(mocked_single_record);
  });

  test("create authorization failed", async () => {
    spyOnFetch.mockImplementationOnce(
      fn(() => mock_CRUD_failed({})) as jest.Mock
    );
    const result = await crudAPI
      .create(mocked_single_record, "")
      .then(() => fail("promise RESOLVED when reject expect"))
      .catch((err) => err);
    expect(result).toBe("Access deny");
  });

  test("update success", async () => {
    spyOnFetch.mockImplementationOnce(
      fn(() => mock_CRUD_success(mocked_read_response_data[1])) as jest.Mock
    );
    const result = await crudAPI
      .update(mocked_single_record, "", "")
      .then((data) => data)
      .catch((err) => fail("promise REJECTED when resolve expect"));
    expect(result).toEqual(mocked_read_response_data[1]);
  });

  test("update authorization failed", async () => {
    spyOnFetch.mockImplementationOnce(
      fn(() => mock_CRUD_failed({})) as jest.Mock
    );
    const result = await crudAPI
      .update(mocked_single_record, "", "")
      .then(() => fail("promise RESOLVED when reject expect"))
      .catch((err) => err);
    expect(result).toBe("Access deny");
  });

  test("delete success", async () => {
    spyOnFetch.mockImplementationOnce(
      fn(() => mock_CRUD_success()) as jest.Mock
    );
    const result = await crudAPI
      .delete("", "")
      .then((data) => data)
      .catch((err) => fail("promise REJECTED when resolve expect"));
  });

  test("delete authorization failed", async () => {
    spyOnFetch.mockImplementationOnce(
      fn(() => mock_CRUD_failed({})) as jest.Mock
    );
    const result = await crudAPI
      .delete("", "")
      .then((data) => fail("promise RESOLVED when reject expect"))
      .catch((err) => err);
    expect(result).toBe("Access deny");
  });

  test("delete failed (wrong id)", async () => {
    spyOnFetch.mockImplementationOnce(
      fn(() =>
        mock_CRUD_failed({ error_code: 1, error_message: "Document not found" })
      ) as jest.Mock
    );
    const result = await crudAPI
      .delete("", "")
      .then((data) => fail("promise RESOLVED when reject expect"))
      .catch((err) => err);
    expect(result).toBe("Document not found");
  });

  test("login fetching error", async () => {
    spyOnFetch.mockImplementationOnce(
      fn(() => mock_Fetch_throw_error()) as jest.Mock
    );
    const result = await crudAPI
      .login({ username: "", password: "" })
      .then((data) => fail("promise RESOLVED when reject expect"))
      .catch((err) => err);
    expect(result).toBe("Network error");
  });

  test("read fetching error", async () => {
    spyOnFetch.mockImplementationOnce(
      fn(() => mock_Fetch_throw_error()) as jest.Mock
    );
    const result = await crudAPI
      .read("")
      .then((data) => fail("promise RESOLVED when reject expect"))
      .catch((err) => err);
    expect(result).toBe("Network error");
  });

  test("create fetching error", async () => {
    spyOnFetch.mockImplementationOnce(
      fn(() => mock_Fetch_throw_error()) as jest.Mock
    );
    const result = await crudAPI
      .create(mocked_single_record, "")
      .then((data) => fail("promise RESOLVED when reject expect"))
      .catch((err) => err);
    expect(result).toBe("Network error");
  });

  test("update fetching error", async () => {
    spyOnFetch.mockImplementationOnce(
      fn(() => mock_Fetch_throw_error()) as jest.Mock
    );
    const result = await crudAPI
      .update(mocked_single_record, "", "")
      .then((data) => fail("promise RESOLVED when reject expect"))
      .catch((err) => err);
    expect(result).toBe("Network error");
  });

  test("delete fetching error", async () => {
    spyOnFetch.mockImplementationOnce(
      fn(() => mock_Fetch_throw_error()) as jest.Mock
    );
    const result = await crudAPI
      .delete("", "")
      .then((data) => fail("promise RESOLVED when reject expect"))
      .catch((err) => err);
    expect(result).toBe("Network error");
  });
});
