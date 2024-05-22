import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import PasswordInput from "./PasswordInput";
import { TIProps } from "./TextInput";
import { checkFalsyTextRender, MUI_helper_text_class } from "./TextInput.test";

describe("password input test", () => {
  let defaultProps: TIProps = {
    label: "text input",
    value: "initial-value",
    error: "",
    unTouched: true,
    onchange: jest.fn,
  };

  const error_text = "error";
  const label_text = "label-text";
  const value_text = "some-value";

  const checkPasswordVisibilityButton = (showPassButton: HTMLElement) => {
    fireEvent.mouseOver(showPassButton);
    waitFor(() =>
      expect(screen.getByDisplayValue(/показать пароль/i)).toBeInTheDocument()
    );
    waitFor(() =>
      expect(screen.queryByDisplayValue(/скрыть пароль/i)).toBeFalsy()
    );
    fireEvent.click(showPassButton);
    fireEvent.mouseOver(showPassButton);
    waitFor(() =>
      expect(screen.getByDisplayValue(/скрыть пароль/i)).toBeInTheDocument()
    );
    waitFor(() =>
      expect(screen.queryByDisplayValue(/показать пароль/i)).toBeFalsy()
    );
    fireEvent.click(showPassButton);
    waitFor(() =>
      expect(screen.getByDisplayValue(/показать пароль/i)).toBeInTheDocument()
    );
    waitFor(() =>
      expect(screen.queryByDisplayValue(/скрыть пароль/i)).toBeFalsy()
    );
  };

  test("label render", () => {
    render(<PasswordInput {...defaultProps} label={label_text} />);
    const showPassButton = screen.getByRole("button", {
      name: /toggle password visibility/i,
    });
    expect(showPassButton).toBeInTheDocument();
    checkFalsyTextRender(defaultProps.value, label_text, "password");
    checkPasswordVisibilityButton(showPassButton);
    checkFalsyTextRender(defaultProps.value, label_text, "password");
  });

  test("value render", () => {
    render(<PasswordInput {...defaultProps} value={value_text} />);
    const showPassButton = screen.getByRole("button", {
      name: /toggle password visibility/i,
    });
    expect(showPassButton).toBeInTheDocument();
    checkFalsyTextRender(value_text, defaultProps.label, "password");
    checkPasswordVisibilityButton(showPassButton);
    checkFalsyTextRender(value_text, defaultProps.label, "password");
  });

  test("error render", () => {
    render(<PasswordInput {...defaultProps} error={error_text} />);
    const showPassButton = screen.getByRole("button", {
      name: /toggle password visibility/i,
    });
    expect(showPassButton).toBeInTheDocument();
    checkFalsyTextRender(defaultProps.value, defaultProps.label, "password");
    checkPasswordVisibilityButton(showPassButton);
    expect(screen.queryByText(error_text)).toBeFalsy();
    checkFalsyTextRender(defaultProps.value, defaultProps.label, "password");
  });

  test("error render, unTouched = false", () => {
    render(
      <PasswordInput {...defaultProps} error={error_text} unTouched={false} />
    );
    const showPassButton = screen.getByRole("button", {
      name: /toggle password visibility/i,
    });
    expect(showPassButton).toBeInTheDocument();
    checkFalsyTextRender(defaultProps.value, defaultProps.label, "password");
    checkPasswordVisibilityButton(showPassButton);
    expect(screen.getByText(error_text)).toHaveClass(MUI_helper_text_class);
    checkFalsyTextRender(defaultProps.value, defaultProps.label, "password");
  });

  test("value, error render", () => {
    render(
      <PasswordInput {...defaultProps} value={value_text} error={"error"} />
    );
    const showPassButton = screen.getByRole("button", {
      name: /toggle password visibility/i,
    });
    expect(showPassButton).toBeInTheDocument();
    checkFalsyTextRender(value_text, defaultProps.label, "password");
    checkPasswordVisibilityButton(showPassButton);
    expect(screen.queryByText(error_text)).toBeFalsy();
    checkFalsyTextRender(value_text, defaultProps.label, "password");
  });

  test("value, error render, unTouched = false", () => {
    render(
      <PasswordInput
        {...defaultProps}
        value={value_text}
        error={error_text}
        unTouched={false}
      />
    );
    const showPassButton = screen.getByRole("button", {
      name: /toggle password visibility/i,
    });
    expect(showPassButton).toBeInTheDocument();
    checkFalsyTextRender(value_text, defaultProps.label, "password");
    checkPasswordVisibilityButton(showPassButton);
    expect(screen.getByText(error_text)).toHaveClass(MUI_helper_text_class);
    checkFalsyTextRender(value_text, defaultProps.label, "password");
  });
});
