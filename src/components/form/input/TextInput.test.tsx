import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TextInput, { TIProps } from "./TextInput";

export const MUI_helper_text_class = "MuiFormHelperText-root";

export const checkFalsyTextRender = (
  value: string,
  label: string,
  inputType?: "password"
) => {
  expect(screen.getByLabelText(label)).toBeInTheDocument();
  expect(screen.queryByDisplayValue(label)).toBeFalsy();
  screen
    .queryAllByText(label)
    .map((element) => expect(element).not.toHaveClass(MUI_helper_text_class));
  expect(screen.queryByDisplayValue(value)).not.toHaveClass(
    MUI_helper_text_class
  );
  expect(screen.getByDisplayValue(value)).toHaveAttribute(
    "type",
    inputType || "text"
  );
};

describe("TextInput test", () => {
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
  const MUI_helper_text_class = "MuiFormHelperText-root";

  test("default props render", () => {
    render(<TextInput {...defaultProps} />);
    checkFalsyTextRender(defaultProps.value, defaultProps.label);
  });

  test("label render", () => {
    render(<TextInput {...defaultProps} label={label_text} />);
    checkFalsyTextRender(defaultProps.value, label_text);
  });

  test("value render", () => {
    render(<TextInput {...defaultProps} value={value_text} />);
    checkFalsyTextRender(value_text, defaultProps.label);
  });

  test("error render", () => {
    render(<TextInput {...defaultProps} error={error_text} />);
    expect(screen.queryByText(error_text)).toBeFalsy();
    checkFalsyTextRender(defaultProps.value, defaultProps.label);
  });

  test("error render, unTouched = false", () => {
    render(
      <TextInput {...defaultProps} error={error_text} unTouched={false} />
    );
    expect(screen.getByText(error_text)).toHaveClass(MUI_helper_text_class);
    checkFalsyTextRender(defaultProps.value, defaultProps.label);
  });

  test("value, error render", () => {
    render(<TextInput {...defaultProps} value={value_text} error={"error"} />);
    expect(screen.queryByText(error_text)).toBeFalsy();
    checkFalsyTextRender(value_text, defaultProps.label);
  });

  test("value, error render, unTouched = false", () => {
    render(
      <TextInput
        {...defaultProps}
        value={value_text}
        error={error_text}
        unTouched={false}
      />
    );
    expect(screen.getByText(error_text)).toHaveClass(MUI_helper_text_class);
    checkFalsyTextRender(value_text, defaultProps.label);
  });
});
