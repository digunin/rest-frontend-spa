import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { renderWithProvider } from "./utils/rtl-render-helper";
import * as Cookie from "./utils/cookies-api";
import { label_text } from "./utils/text";
import { fakeCredentials, fakeToken } from "./api/types";
import { server } from "./mocks/node";

describe("App testing", () => {
  const spyGetCookie = jest.spyOn(Cookie, "getCookies");
  jest.spyOn(console, "error").mockImplementation();

  beforeAll(() => server.listen());
  beforeEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("render with user = null", async () => {
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
    await waitFor(() => screen.getByLabelText(label_text.login));
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

  test("render with existing cookies", async () => {
    spyGetCookie.mockReturnValueOnce({
      username: "some-user",
      token: fakeToken,
    });
    renderWithProvider(<App />);
    await waitFor(() =>
      expect(
        screen.getByRole("button", {
          name: /logout/i,
        })
      ).toBeInTheDocument()
    );
    expect(screen.queryByLabelText(label_text.login)).toBeFalsy();
    expect(screen.queryByLabelText(label_text.password)).toBeFalsy();
    expect(screen.getByText("some-user")).toBeInTheDocument();
  });

  test("test 'logout' button", async () => {
    spyGetCookie.mockReturnValueOnce({
      username: "some-user",
      token: fakeToken,
    });
    renderWithProvider(<App />);
    await waitFor(() =>
      expect(
        screen.getByRole("button", {
          name: /logout/i,
        })
      ).toBeInTheDocument()
    );
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
    await waitFor(() => expect(screen.getByText("1111")).toBeInTheDocument());
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
    await waitFor(() =>
      expect(screen.getByText(label_text.addNewRecord)).toBeInTheDocument()
    );
    fireEvent.click(screen.getByText(label_text.addNewRecord));

    expect(
      screen.getByRole("row").getElementsByClassName("editing-input").length
    ).toBe(6);
    const editedCells = screen.getByRole("row").getElementsByTagName("input");

    fireEvent.change(editedCells[0], { target: { value: "654" } });
    fireEvent.change(editedCells[2], { target: { value: "value of new row" } });
    fireEvent.change(editedCells[3], { target: { value: "value of new row" } });
    fireEvent.change(editedCells[4], { target: { value: "value of new row" } });
    fireEvent.change(editedCells[6], { target: { value: "value of new row" } });
    fireEvent.change(editedCells[7], { target: { value: "value of new row" } });

    fireEvent.click(screen.getByRole("menuitem", { name: /save/i }));
    await waitFor(() => expect(screen.getByText("654")).toBeInTheDocument());
    fireEvent.click(screen.getByText("654"));
    await waitFor(() =>
      expect(screen.getAllByDisplayValue("value of new row").length).toBe(5)
    );
    expect(
      screen.getByRole("row").getElementsByClassName("editing-input").length
    ).toBe(0);
  });

  test("edit row", async () => {
    spyGetCookie.mockReturnValueOnce({
      username: fakeCredentials.username,
      token: fakeToken,
    });
    renderWithProvider(<App />);
    await waitFor(() => expect(screen.getByText("3333")).toBeInTheDocument());
    fireEvent.click(screen.getByText("2222"));
    fireEvent.click(screen.getByRole("menuitem", { name: /edit/i }));
    await waitFor(() =>
      expect(
        screen.queryByRole("menuitem", { name: /save/i })
      ).toBeInTheDocument()
    );
    expect(
      screen.queryByRole("menuitem", { name: /cancel/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("row").getElementsByClassName("editing-input").length
    ).toBe(6);
    const editedCells = screen.getByRole("row").getElementsByTagName("input");
    fireEvent.change(editedCells[2], {
      target: { value: "value of editing row" },
    });
    fireEvent.change(editedCells[3], {
      target: { value: "value of editing row" },
    });
    fireEvent.change(editedCells[4], {
      target: { value: "value of editing row" },
    });
    fireEvent.change(editedCells[6], {
      target: { value: "value of editing row" },
    });
    fireEvent.change(editedCells[7], {
      target: { value: "value of editing row" },
    });

    fireEvent.click(screen.getByRole("menuitem", { name: /save/i }));
    await waitFor(() =>
      expect(screen.queryByRole("menuitem", { name: /save/i })).toBeFalsy()
    );
    expect(screen.queryByRole("menuitem", { name: /cancel/i })).toBeFalsy();
    expect(screen.getByRole("menuitem", { name: /edit/i })).toBeInTheDocument();
    expect(
      screen.getByRole("menuitem", { name: /delete/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("row").getElementsByClassName("editing-input").length
    ).toBe(0);
    await waitFor(() =>
      expect(screen.getAllByDisplayValue("value of editing row").length).toBe(5)
    );
  });

  test("delete row test", async () => {
    spyGetCookie.mockReturnValueOnce({
      username: fakeCredentials.username,
      token: fakeToken,
    });
    renderWithProvider(<App />);
    await waitFor(() => expect(screen.getByText("1111")).toBeInTheDocument());
    fireEvent.click(screen.getByText("5555"));
    await waitFor(() =>
      expect(
        screen.getByRole("menuitem", {
          name: /delete/i,
        })
      ).toBeInTheDocument()
    );
    fireEvent.click(
      screen.getByRole("menuitem", {
        name: /delete/i,
      })
    );
    await waitFor(() =>
      expect(screen.getByText(/удалить/i)).toBeInTheDocument()
    );
    fireEvent.click(screen.getByText(/удалить/i));
    await waitFor(() => expect(screen.queryByText("5555")).toBeFalsy());
    expect(screen.getByText("1111")).toBeInTheDocument();
    expect(screen.getByText("2222")).toBeInTheDocument();
    expect(screen.getByText("3333")).toBeInTheDocument();
    expect(screen.getByText("4444")).toBeInTheDocument();

    fireEvent.click(screen.getByText("1111"));
    await waitFor(() =>
      expect(
        screen.getByRole("menuitem", {
          name: /delete/i,
        })
      ).toBeInTheDocument()
    );

    fireEvent.click(
      screen.getByRole("menuitem", {
        name: /delete/i,
      })
    );
    await waitFor(() =>
      expect(screen.getByText(/удалить/i)).toBeInTheDocument()
    );
    fireEvent.click(screen.getByLabelText(label_text.askConfirm));
    fireEvent.click(screen.getByText(/удалить/i));
    await waitFor(() => expect(screen.queryByText("1111")).toBeFalsy());
    expect(screen.getByText("2222")).toBeInTheDocument();
    expect(screen.getByText("3333")).toBeInTheDocument();
    expect(screen.getByText("4444")).toBeInTheDocument();
    expect(screen.queryByText("5555")).toBeFalsy();

    fireEvent.click(screen.getByText("4444"));
    await waitFor(() =>
      expect(
        screen.getByRole("menuitem", {
          name: /delete/i,
        })
      ).toBeInTheDocument()
    );
    fireEvent.click(
      screen.getByRole("menuitem", {
        name: /delete/i,
      })
    );
    await waitFor(() => expect(screen.queryByText("4444")).toBeFalsy());
    expect(screen.queryByText("1111")).toBeFalsy();
    expect(screen.getByText("2222")).toBeInTheDocument();
    expect(screen.getByText("3333")).toBeInTheDocument();
    expect(screen.queryByText("5555")).toBeFalsy();

    fireEvent.click(screen.getByText("3333"));
    await waitFor(() =>
      expect(
        screen.getByRole("menuitem", {
          name: /delete/i,
        })
      ).toBeInTheDocument()
    );
    fireEvent.click(
      screen.getByRole("menuitem", {
        name: /delete/i,
      })
    );
    await waitFor(() => expect(screen.queryByText("3333")).toBeFalsy());
    expect(screen.queryByText("1111")).toBeFalsy();
    expect(screen.getByText("2222")).toBeInTheDocument();
    expect(screen.queryByText("4444")).toBeFalsy();
    expect(screen.queryByText("5555")).toBeFalsy();

    fireEvent.click(screen.getByText("2222"));
    await waitFor(() =>
      expect(
        screen.getByRole("menuitem", {
          name: /delete/i,
        })
      ).toBeInTheDocument()
    );
    fireEvent.click(
      screen.getByRole("menuitem", {
        name: /delete/i,
      })
    );
    await waitFor(() => expect(screen.queryByText("2222")).toBeFalsy());
    expect(screen.queryByText("1111")).toBeFalsy();
    expect(screen.queryByText("3333")).toBeFalsy();
    expect(screen.queryByText("4444")).toBeFalsy();
    expect(screen.queryByText("5555")).toBeFalsy();
  });
});
