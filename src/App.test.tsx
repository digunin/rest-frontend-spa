import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { renderWithProvider } from "./utils/rtl-render-helper";

test("hello world render", () => {
  renderWithProvider(<App />);
  expect(screen.getByText("Hello, World!")).toBeInTheDocument();
});
