import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { RenderOptions, render } from "@testing-library/react";
import rootReducer from "../store/rootReducer";

export const renderWithProvider = (
  element: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => {
  const store = configureStore({
    reducer: rootReducer,
  });
  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
  };
  return render(element, { wrapper, ...options });
};
