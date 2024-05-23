import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./Login";
import { renderWithProvider } from "../../utils/rtl-render-helper";
import { error_messages, label_text } from "../../utils/text";

test("login form render", () => {
  renderWithProvider(<Login />);
  expect(screen.queryByText(error_messages.notEmpty)).toBeFalsy();
  fireEvent.submit(screen.getByRole("form"));
  expect(screen.getAllByText(error_messages.notEmpty).length).toBe(2);
});

test("check input's type", () => {
  renderWithProvider(<Login />);
  const showPassButton = screen.getByRole("button", {
    name: /toggle password visibility/i,
  });
  const login_input = screen.getByLabelText(label_text.login);
  const password_input = screen.getByLabelText(label_text.password);

  expect(login_input).toHaveAttribute("type", "text");
  expect(password_input).toHaveAttribute("type", "password");

  fireEvent.click(showPassButton);

  expect(login_input).toHaveAttribute("type", "text");
  expect(password_input).toHaveAttribute("type", "text");
});

test("check inputed values", () => {
  renderWithProvider(<Login />);

  const login_input = screen.getByLabelText(label_text.login);
  const password_input = screen.getByLabelText(label_text.password);

  fireEvent.change(login_input, { target: { value: "user1" } });
  fireEvent.change(password_input, { target: { value: "pass1" } });
  expect(login_input).toHaveValue("user1");
  expect(password_input).toHaveValue("pass1");

  fireEvent.change(login_input, { target: { value: "" } });
  expect(login_input).toHaveValue("");
  expect(password_input).toHaveValue("pass1");

  fireEvent.change(password_input, { target: { value: "" } });
  expect(login_input).toHaveValue("");
  expect(password_input).toHaveValue("");
});

test("check error handling", () => {
  renderWithProvider(<Login />);

  expect(screen.queryByText(error_messages.notEmpty)).toBeFalsy();

  const login_input = screen.getByLabelText(label_text.login);
  const password_input = screen.getByLabelText(label_text.password);

  fireEvent.change(login_input, { target: { value: "user1" } });
  expect(login_input.parentElement?.nextSibling).not.toHaveTextContent(
    error_messages.notEmpty
  );
  expect(password_input.parentElement?.nextSibling).not.toHaveTextContent(
    error_messages.notEmpty
  );

  fireEvent.change(password_input, { target: { value: "pass" } });
  expect(login_input.parentElement?.nextSibling).not.toHaveTextContent(
    error_messages.notEmpty
  );
  expect(password_input.parentElement?.nextSibling).not.toHaveTextContent(
    error_messages.notEmpty
  );

  fireEvent.change(password_input, { target: { value: "" } });
  expect(login_input.parentElement?.nextSibling).not.toHaveTextContent(
    error_messages.notEmpty
  );
  expect(password_input.parentElement?.nextSibling).toHaveTextContent(
    error_messages.notEmpty
  );

  fireEvent.change(login_input, { target: { value: "" } });
  expect(login_input.parentElement?.nextSibling).toHaveTextContent(
    error_messages.notEmpty
  );
  expect(password_input.parentElement?.nextSibling).toHaveTextContent(
    error_messages.notEmpty
  );
});
