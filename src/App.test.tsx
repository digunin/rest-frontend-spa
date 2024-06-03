import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { renderWithProvider } from "./utils/rtl-render-helper";
import * as Cookie from "./utils/cookies-api";
import { label_text } from "./utils/text";
import { fakeCredentials, fakeToken } from "./api/fake-crudAPI";

const DELAY = 1500;

describe("App testing", () => {
  const spyGetCookie = jest.spyOn(Cookie, "getCookies");

  test("render with user = null", async () => {
    spyGetCookie.mockReturnValueOnce({ username: null, token: null });
    renderWithProvider(<App />);
    expect(
      screen.queryByRole("button", {
        name: /logout/i,
      })
    ).toBeFalsy();
    await waitFor(() =>
      expect(screen.getByLabelText(label_text.login)).toBeInTheDocument()
    );
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
    await waitFor(() =>
      expect(screen.getByLabelText(label_text.login)).toBeInTheDocument()
    );
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

  test("render database", async () => {
    spyGetCookie.mockReturnValueOnce({
      username: fakeCredentials.username,
      token: fakeToken,
    });
    renderWithProvider(<App />);
    await waitFor(() => expect(screen.getAllByRole("row").length).toBe(6), {
      timeout: DELAY,
    });
    expect(screen.getByText("1111")).toBeInTheDocument();
    expect(screen.getByText("2222")).toBeInTheDocument();
    expect(screen.getByText("3333")).toBeInTheDocument();
    expect(screen.getByText("4444")).toBeInTheDocument();
    expect(screen.getByText("5555")).toBeInTheDocument();
    expect(screen.queryByText("6666")).toBeFalsy();
  });

  test("create new row", async () => {
    spyGetCookie.mockReturnValueOnce({
      username: fakeCredentials.username,
      token: fakeToken,
    });
    renderWithProvider(<App />);
    await waitFor(() => expect(screen.getAllByRole("row").length).toBe(6), {
      timeout: DELAY,
    });
    fireEvent.click(screen.getByText(label_text.addNewRecord));
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(7);
    const editedRow = rows[1];
    const editedCells = editedRow.getElementsByTagName("input");
    const employee_number_input = editedCells[0];
    const document_type_input = editedCells[2];
    expect(employee_number_input).toHaveAttribute("type", "number");
    expect(document_type_input).toHaveAttribute("type", "text");
    fireEvent.change(employee_number_input, { target: { value: 654 } });
    fireEvent.change(document_type_input, { target: { value: "new doc" } });
    const actionButtons = editedRow.getElementsByTagName("button");
    expect(actionButtons.length).toBe(3);
    const saveButton = actionButtons[0];
    expect(saveButton).toHaveAttribute("aria-label", "Save");
    fireEvent.click(saveButton);
    await waitFor(() =>
      expect(screen.queryByRole("menuitem", { name: /save/i })).toBeFalsy()
    );
    expect(screen.queryByRole("menuitem", { name: /cancel/i })).toBeFalsy();
    expect(screen.getAllByRole("menuitem", { name: /edit/i }).length).toBe(6);
    expect(screen.getAllByRole("menuitem", { name: /delete/i }).length).toBe(6);
  });

  test("edit row", async () => {
    spyGetCookie.mockReturnValueOnce({
      username: fakeCredentials.username,
      token: fakeToken,
    });
    renderWithProvider(<App />);
    await waitFor(() => expect(screen.getAllByRole("row").length).toBe(6), {
      timeout: DELAY,
    });
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(6);
    const editedRow = rows[2];
    const edit_delete_button = editedRow.getElementsByTagName("button");
    expect(edit_delete_button.length).toBe(3);
    expect(edit_delete_button[0]).toHaveAttribute("aria-label", "Edit");
    expect(edit_delete_button[1]).toHaveAttribute("aria-label", "Delete");
    expect(edit_delete_button[2]).toHaveAttribute("aria-label", "Abort");
    fireEvent.click(edit_delete_button[0]);
    await waitFor(() =>
      expect(
        screen.queryByRole("menuitem", { name: /save/i })
      ).toBeInTheDocument()
    );
    expect(
      screen.queryByRole("menuitem", { name: /cancel/i })
    ).toBeInTheDocument();
    const editedCells = screen
      .getAllByRole("row")[2]
      .getElementsByTagName("input");
    const employee_number_input = editedCells[0];
    const document_type_input = editedCells[2];
    expect(employee_number_input).toHaveValue(2222);
    expect(document_type_input).toHaveValue("Приказ о приеме");
    fireEvent.change(employee_number_input, { target: { value: 222 } });
    fireEvent.change(document_type_input, { target: { value: "Приказ" } });
    const save_cancel_button = editedRow.getElementsByTagName("button");
    expect(save_cancel_button.length).toBe(3);
    expect(save_cancel_button[0]).toHaveAttribute("aria-label", "Save");
    expect(save_cancel_button[1]).toHaveAttribute("aria-label", "Cancel");
    expect(save_cancel_button[2]).toHaveAttribute("aria-label", "Abort");
    fireEvent.click(save_cancel_button[0]);
    await waitFor(() =>
      expect(screen.queryByRole("menuitem", { name: /save/i })).toBeFalsy()
    );
    expect(screen.queryByRole("menuitem", { name: /cancel/i })).toBeFalsy();
    expect(screen.getAllByRole("menuitem", { name: /edit/i }).length).toBe(5);
    expect(screen.getAllByRole("menuitem", { name: /delete/i }).length).toBe(5);
  });

  test("delete row test", async () => {
    spyGetCookie.mockReturnValueOnce({
      username: fakeCredentials.username,
      token: fakeToken,
    });
    renderWithProvider(<App />);
    await waitFor(() => expect(screen.getAllByRole("row").length).toBe(6), {
      timeout: DELAY,
    });
    let deleteButtons = screen.getAllByRole("menuitem", {
      name: /Delete/i,
    });
    fireEvent.click(deleteButtons[4]);
    await waitFor(() =>
      expect(screen.getByText(/удалить/i)).toBeInTheDocument()
    );
    fireEvent.click(screen.getByText(/удалить/i));
    await waitFor(() => expect(screen.getAllByRole("row").length).toBe(5), {
      timeout: DELAY,
    });
    expect(screen.getByText("1111")).toBeInTheDocument();
    expect(screen.getByText("2222")).toBeInTheDocument();
    expect(screen.getByText("3333")).toBeInTheDocument();
    expect(screen.getByText("4444")).toBeInTheDocument();
    expect(screen.queryByText("5555")).toBeFalsy();

    deleteButtons = screen.getAllByRole("menuitem", {
      name: /Delete/i,
    });
    fireEvent.click(deleteButtons[0]);
    await waitFor(() =>
      expect(screen.getByText(/удалить/i)).toBeInTheDocument()
    );
    fireEvent.click(screen.getByLabelText(label_text.askConfirm));
    fireEvent.click(screen.getByText(/удалить/i));
    await waitFor(() => expect(screen.getAllByRole("row").length).toBe(4), {
      timeout: DELAY,
    });
    expect(screen.queryByText("1111")).toBeFalsy();
    expect(screen.getByText("2222")).toBeInTheDocument();
    expect(screen.getByText("3333")).toBeInTheDocument();
    expect(screen.getByText("4444")).toBeInTheDocument();
    expect(screen.queryByText("5555")).toBeFalsy();

    deleteButtons = screen.getAllByRole("menuitem", {
      name: /Delete/i,
    });
    fireEvent.click(deleteButtons[2]);
    await waitFor(() => expect(screen.getAllByRole("row").length).toBe(3), {
      timeout: DELAY,
    });
    expect(screen.queryByText("1111")).toBeFalsy();
    expect(screen.getByText("2222")).toBeInTheDocument();
    expect(screen.getByText("3333")).toBeInTheDocument();
    expect(screen.queryByText("4444")).toBeFalsy();
    expect(screen.queryByText("5555")).toBeFalsy();

    deleteButtons = screen.getAllByRole("menuitem", {
      name: /Delete/i,
    });
    fireEvent.click(deleteButtons[1]);
    await waitFor(() => expect(screen.getAllByRole("row").length).toBe(2), {
      timeout: DELAY,
    });
    expect(screen.queryByText("1111")).toBeFalsy();
    expect(screen.getByText("2222")).toBeInTheDocument();
    expect(screen.queryByText("3333")).toBeFalsy();
    expect(screen.queryByText("4444")).toBeFalsy();
    expect(screen.queryByText("5555")).toBeFalsy();

    deleteButtons = screen.getAllByRole("menuitem", {
      name: /Delete/i,
    });
    fireEvent.click(deleteButtons[0]);
    await waitFor(() => expect(screen.getAllByRole("row").length).toBe(1), {
      timeout: DELAY,
    });
    expect(screen.queryByText("1111")).toBeFalsy();
    expect(screen.queryByText("2222")).toBeFalsy();
    expect(screen.queryByText("3333")).toBeFalsy();
    expect(screen.queryByText("4444")).toBeFalsy();
    expect(screen.queryByText("5555")).toBeFalsy();

    expect(
      screen.queryByRole("menuitem", {
        name: /Delete/i,
      })
    ).toBeFalsy();
  }, 15000);
});
