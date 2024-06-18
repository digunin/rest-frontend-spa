import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import PasswordInput from "./PasswordInput";
import { TIProps } from "./TextInput";
import {
  checkFalsyTextRender,
  MUI_helper_text_class,
  createInputField,
} from "./TextInput.test";

describe("password input test", () => {
  let defaultProps: TIProps = {
    label: "text input",
    inputField: { value: "initial-value", error: "", unTouched: true },
    onchange: jest.fn,
  };

  const error_text = "error";
  const label_text = "label-text";
  const value_text = "some-value";

  const checkPasswordVisibilityButton = (
    showPassButton: HTMLElement,
    value: string
  ) => {
    fireEvent.mouseOver(showPassButton);
    waitFor(() =>
      expect(screen.getByDisplayValue(/показать пароль/i)).toBeInTheDocument()
    );
    waitFor(() =>
      expect(screen.queryByDisplayValue(/скрыть пароль/i)).toBeFalsy()
    );
    expect(screen.getByDisplayValue(value)).toHaveAttribute("type", "password");
    fireEvent.click(showPassButton);
    fireEvent.mouseOver(showPassButton);
    waitFor(() =>
      expect(screen.getByDisplayValue(/скрыть пароль/i)).toBeInTheDocument()
    );
    waitFor(() =>
      expect(screen.queryByDisplayValue(/показать пароль/i)).toBeFalsy()
    );
    expect(screen.getByDisplayValue(value)).toHaveAttribute("type", "text");
    fireEvent.click(showPassButton);
    waitFor(() =>
      expect(screen.getByDisplayValue(/показать пароль/i)).toBeInTheDocument()
    );
    waitFor(() =>
      expect(screen.queryByDisplayValue(/скрыть пароль/i)).toBeFalsy()
    );
    expect(screen.getByDisplayValue(value)).toHaveAttribute("type", "password");
  };

  test("label render", () => {
    render(<PasswordInput {...defaultProps} label={label_text} />);
    const showPassButton = screen.getByRole("button", {
      name: /toggle password visibility/i,
    });
    expect(showPassButton).toBeInTheDocument();
    checkFalsyTextRender(defaultProps.inputField.value, label_text, "password");
    checkPasswordVisibilityButton(
      showPassButton,
      defaultProps.inputField.value
    );
    checkFalsyTextRender(defaultProps.inputField.value, label_text, "password");
  });

  test("value render", () => {
    render(
      <PasswordInput
        {...defaultProps}
        inputField={createInputField(value_text)}
      />
    );
    const showPassButton = screen.getByRole("button", {
      name: /toggle password visibility/i,
    });
    expect(showPassButton).toBeInTheDocument();
    checkFalsyTextRender(value_text, defaultProps.label as string, "password");
    checkPasswordVisibilityButton(showPassButton, value_text);
    checkFalsyTextRender(value_text, defaultProps.label as string, "password");
  });

  test("error render", () => {
    render(
      <PasswordInput
        {...defaultProps}
        inputField={createInputField(null, error_text)}
      />
    );
    const showPassButton = screen.getByRole("button", {
      name: /toggle password visibility/i,
    });
    expect(showPassButton).toBeInTheDocument();
    checkFalsyTextRender(
      defaultProps.inputField.value,
      defaultProps.label as string,
      "password"
    );
    checkPasswordVisibilityButton(
      showPassButton,
      defaultProps.inputField.value
    );
    expect(screen.queryByText(error_text)).toBeFalsy();
    checkFalsyTextRender(
      defaultProps.inputField.value,
      defaultProps.label as string,
      "password"
    );
  });

  test("error render, unTouched = false", () => {
    render(
      <PasswordInput
        {...defaultProps}
        inputField={createInputField(null, error_text, false)}
      />
    );
    const showPassButton = screen.getByRole("button", {
      name: /toggle password visibility/i,
    });
    expect(showPassButton).toBeInTheDocument();
    checkFalsyTextRender(
      defaultProps.inputField.value,
      defaultProps.label as string,
      "password"
    );
    checkPasswordVisibilityButton(
      showPassButton,
      defaultProps.inputField.value
    );
    expect(screen.getByText(error_text)).toHaveClass(MUI_helper_text_class);
    checkFalsyTextRender(
      defaultProps.inputField.value,
      defaultProps.label as string,
      "password"
    );
  });

  test("value, error render", () => {
    render(
      <PasswordInput
        {...defaultProps}
        inputField={createInputField(value_text, "error")}
      />
    );
    const showPassButton = screen.getByRole("button", {
      name: /toggle password visibility/i,
    });
    expect(showPassButton).toBeInTheDocument();
    checkFalsyTextRender(value_text, defaultProps.label as string, "password");
    checkPasswordVisibilityButton(showPassButton, value_text);
    expect(screen.queryByText(error_text)).toBeFalsy();
    checkFalsyTextRender(value_text, defaultProps.label as string, "password");
  });

  test("value, error render, unTouched = false", () => {
    render(
      <PasswordInput
        {...defaultProps}
        inputField={createInputField(value_text, error_text, false)}
      />
    );
    const showPassButton = screen.getByRole("button", {
      name: /toggle password visibility/i,
    });
    expect(showPassButton).toBeInTheDocument();
    checkFalsyTextRender(value_text, defaultProps.label as string, "password");
    checkPasswordVisibilityButton(showPassButton, value_text);
    expect(screen.getByText(error_text)).toHaveClass(MUI_helper_text_class);
    checkFalsyTextRender(value_text, defaultProps.label as string, "password");
  });
});
