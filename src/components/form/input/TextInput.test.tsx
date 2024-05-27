import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TextInput, { TIProps } from "./TextInput";
import { InputField } from "../../../store/form/types";

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

export const defaultProps: TIProps = {
  label: "text input",
  inputField: { value: "initial-value", error: "", unTouched: true },
  onchange: jest.fn,
};

export const createInputField = (
  value?: string | null,
  error?: string | null,
  untouched?: boolean
): InputField => {
  return {
    value: value || defaultProps.inputField.value,
    error: error || defaultProps.inputField.error,
    unTouched: untouched ?? defaultProps.inputField.unTouched,
  };
};

describe("TextInput test", () => {
  const error_text = "error";
  const label_text = "label-text";
  const value_text = "some-value";
  const MUI_helper_text_class = "MuiFormHelperText-root";

  test("default props render", () => {
    render(<TextInput {...defaultProps} />);
    checkFalsyTextRender(defaultProps.inputField.value, defaultProps.label);
  });

  test("label render", () => {
    render(<TextInput {...defaultProps} label={label_text} />);
    checkFalsyTextRender(defaultProps.inputField.value, label_text);
  });

  test("value render", () => {
    render(
      <TextInput {...defaultProps} inputField={createInputField(value_text)} />
    );
    checkFalsyTextRender(value_text, defaultProps.label);
  });

  test("error render", () => {
    render(
      <TextInput
        {...defaultProps}
        inputField={createInputField(null, error_text)}
      />
    );
    expect(screen.queryByText(error_text)).toBeFalsy();
    checkFalsyTextRender(defaultProps.inputField.value, defaultProps.label);
  });

  test("error render, unTouched = false", () => {
    render(
      <TextInput
        {...defaultProps}
        inputField={createInputField(null, error_text, false)}
      />
    );
    expect(screen.getByText(error_text)).toHaveClass(MUI_helper_text_class);
    checkFalsyTextRender(defaultProps.inputField.value, defaultProps.label);
  });

  test("value, error render", () => {
    render(
      <TextInput
        {...defaultProps}
        inputField={createInputField(value_text, "error")}
      />
    );
    expect(screen.queryByText(error_text)).toBeFalsy();
    checkFalsyTextRender(value_text, defaultProps.label);
  });

  test("value, error render, unTouched = false", () => {
    render(
      <TextInput
        {...defaultProps}
        inputField={createInputField(value_text, error_text, false)}
      />
    );
    expect(screen.getByText(error_text)).toHaveClass(MUI_helper_text_class);
    checkFalsyTextRender(value_text, defaultProps.label);
  });
});
