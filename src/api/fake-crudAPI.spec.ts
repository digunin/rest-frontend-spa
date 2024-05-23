import "@testing-library/jest-dom";
import { fail } from "assert";
import { FakeAPI } from "./fake-crudAPI";
import {
  mocked_read_response_data,
  mocked_single_record,
} from "../utils/mock.fetch";
import { fakeCredentials, fakeToken } from "./fake-crudAPI";
import { error_messages } from "../utils/text";

describe("FakeAPI test", () => {
  const { username, password } = fakeCredentials;

  test("login success", async () => {
    const result = await FakeAPI.login({ username, password })
      .then((data) => data)
      .catch((err) => fail("promise REJECTED when resolve expect"));
    expect(result.token).toBe(fakeToken);
  });

  test("login failed", async () => {
    const result = await FakeAPI.login({ username: "", password: "" })
      .then(() => fail("promise RESOLVED when reject expect"))
      .catch((err) => err);
    expect(result).toBe(error_messages.accessDeny);
  });

  test("read success", async () => {
    const result = await FakeAPI.read(fakeToken)
      .then((data) => data)
      .catch((err) => fail("promise REJECTED when resolve expect"));
    expect(result.length).toBe(5);
  });

  test("read authorization failed", async () => {
    const result = await FakeAPI.read("")
      .then(() => fail("promise RESOLVED when reject expect"))
      .catch((err) => err);
    expect(result).toBe(error_messages.accessDeny);
  });

  test("create success", async () => {
    const result = await FakeAPI.create(mocked_single_record, fakeToken)
      .then((data) => data)
      .catch((err) => fail("promise REJECTED when resolve expect"));
    expect(result.id).toBe("qqq-www-eee-rrr-ttt");
  });

  test("create authorization failed", async () => {
    const result = await FakeAPI.create(mocked_single_record, "")
      .then(() => fail("promise RESOLVED when reject expect"))
      .catch((err) => err);
    expect(result).toBe(error_messages.accessDeny);
  });

  test("update success", async () => {
    const result = await FakeAPI.update(
      mocked_read_response_data[4],
      mocked_read_response_data[4].id,
      fakeToken
    )
      .then((data) => data)
      .catch((err) => fail("promise REJECTED when resolve expect"));
    expect(result).toEqual(mocked_read_response_data[4]);
  });

  test("update authorization failed", async () => {
    const result = await FakeAPI.update(mocked_single_record, "", "")
      .then(() => fail("promise RESOLVED when reject expect"))
      .catch((err) => err);
    expect(result).toBe(error_messages.accessDeny);
  });

  test("delete success", async () => {
    const result = await FakeAPI.delete("any", fakeToken)
      .then((data) => data)
      .catch((err) => fail("promise REJECTED when resolve expect"));
  });

  test("delete authorization failed", async () => {
    const result = await FakeAPI.delete("", "")
      .then((data) => fail("promise RESOLVED when reject expect"))
      .catch((err) => err);
    expect(result).toBe(error_messages.accessDeny);
  });
});
