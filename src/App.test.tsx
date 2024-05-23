import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { renderWithProvider } from "./utils/rtl-render-helper";
import * as UseAuth from "./hooks/useAuth";

describe("App testing", () => {
  test("render with user = null", () => {
    jest
      .spyOn(UseAuth, "useAuth")
      .mockReturnValueOnce({ isAuth: false, username: "", token: "" });
    renderWithProvider(<App />);
    expect(screen.getByLabelText(/логин/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/пароль/i)).toBeInTheDocument();
  });
});
