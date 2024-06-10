import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { RenderOptions, render } from "@testing-library/react";
import rootReducer from "../store/rootReducer";
import { signInAPI } from "../api/authAPI";
import { databaseAPI } from "../api/databaseAPI";

export const renderWithProvider = (
  element: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(signInAPI.middleware)
        .concat(databaseAPI.middleware),
  });
  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
  };
  return render(element, { wrapper, ...options });
};
