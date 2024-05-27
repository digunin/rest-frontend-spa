import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { renderWithProvider } from "./utils/rtl-render-helper";
import * as Cookie from "./utils/cookies-api";
import { label_text } from "./utils/text";
import { fakeCredentials } from "./api/fake-crudAPI";

describe("App testing", () => {
  const spyGetCookie = jest.spyOn(Cookie, "getCookies");

  test("render with user = null", () => {
    spyGetCookie.mockReturnValueOnce({ username: null, token: null });
    renderWithProvider(<App />);
    expect(
      screen.queryByRole("button", {
        name: /logout/i,
      })
    ).toBeFalsy();
    expect(screen.getByLabelText(label_text.login)).toBeInTheDocument();
    expect(screen.getByLabelText(label_text.password)).toBeInTheDocument();
  });

  test("login failed test", async () => {
    renderWithProvider(<App />);
    expect(
      screen.queryByRole("button", {
        name: /logout/i,
      })
    ).toBeFalsy();
    fireEvent.change(screen.getByLabelText(label_text.login), {
      target: { value: "anyuser" },
    });
    fireEvent.change(screen.getByLabelText(label_text.password), {
      target: { value: "any" },
    });
    fireEvent.submit(screen.getByRole("form"));
    await waitFor(() => {}, { timeout: 1000 });
    expect(screen.getByLabelText(label_text.login)).toBeInTheDocument();
    expect(screen.getByLabelText(label_text.password)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", {
        name: /logout/i,
      })
    ).toBeFalsy();
  });

  test("login success test", async () => {
    renderWithProvider(<App />);
    fireEvent.change(screen.getByLabelText(label_text.login), {
      target: { value: fakeCredentials.username },
    });
    fireEvent.change(screen.getByLabelText(label_text.password), {
      target: { value: fakeCredentials.password },
    });
    fireEvent.submit(screen.getByRole("form"));
    await waitFor(() =>
      expect(
        screen.queryByRole("button", {
          name: /logout/i,
        })
      ).toBeInTheDocument()
    );
    expect(screen.queryByLabelText(label_text.login)).toBeFalsy();
    expect(screen.queryByLabelText(label_text.password)).toBeFalsy();
  });

  test("render with existing cookies", () => {
    spyGetCookie.mockReturnValueOnce({
      username: "some-user",
      token: "some-token",
    });
    renderWithProvider(<App />);
    expect(
      screen.getByRole("button", {
        name: /logout/i,
      })
    ).toBeInTheDocument();
    expect(screen.queryByLabelText(label_text.login)).toBeFalsy();
    expect(screen.queryByLabelText(label_text.password)).toBeFalsy();
    expect(screen.getByText("some-user")).toBeInTheDocument();
  });

  test("test 'logout' button", () => {
    spyGetCookie.mockReturnValueOnce({
      username: "some-user",
      token: "some-token",
    });
    renderWithProvider(<App />);
    fireEvent.click(
      screen.getByRole("button", {
        name: /logout/i,
      })
    );
    expect(screen.queryByText("some-user")).toBeFalsy();
    expect(
      screen.queryByRole("button", {
        name: /logout/i,
      })
    ).toBeFalsy();
    expect(screen.getByLabelText(label_text.login)).toBeInTheDocument();
    expect(screen.getByLabelText(label_text.password)).toBeInTheDocument();
  });
});
