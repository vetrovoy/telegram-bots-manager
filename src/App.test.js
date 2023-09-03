import { screen } from "@testing-library/react";

import React from "react";
import { render } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "antd";

import App from "./App";
import { routes } from "./route/routes";
import AppMessagesHolder from "./components/app/layout/appMessagesHolder";

jest.mock("react-router-dom", () => ({
  Route: jest.fn(({ children }) => <>{children}</>),
  Routes: jest.fn(({ children }) => <div data-testid="routes">{children}</div>),
}));

describe("Компонент App", () => {
  it("рендерит без ошибок", () => {
    render(<App />);
  });

  it("рендерит компонент AppMessagesHolder", () => {
    render(<App />);
    expect(screen.getByTestId("app-messages-holder")).toBeInTheDocument();
  });

  it("рендерит компонент Routes", () => {
    render(<App />);
    expect(screen.getByTestId("routes")).toBeInTheDocument();
  });

  it("рендерит все маршруты корректно", () => {
    render(<App />);
    expect(Route).toHaveBeenCalledTimes(routes.length);
    routes.forEach((route, index) => {
      expect(Route).toHaveBeenNthCalledWith(index + 1, { ...route });
    });
  });
});
