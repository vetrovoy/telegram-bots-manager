import React from "react";
import { Navigate } from "react-router-dom";

import Home from "../pages/home";
import Dashboard from "../pages/dashboard";
import Account from "../pages/account";
import Login from "../pages/login";

export enum routeNames {
  HOME = "/",
  LOGIN = "/",
  DASHBOARD = "/dashboard",
  ACCOUNT = "/account",
}

export interface IRoute {
  path: string;
  element: React.ReactNode;
  exact?: boolean;
}

export const publicRoutes: IRoute[] = [
  {
    path: "*",
    element: <Navigate to={routeNames.HOME} />,
  },
  {
    path: routeNames.HOME,
    element: <Home />,
  },
  {
    path: routeNames.LOGIN,
    element: <Login />,
  },
];

export const privateRoutes: IRoute[] = [
  ...publicRoutes,
  {
    path: routeNames.DASHBOARD,
    element: <Dashboard />,
  },
  {
    path: routeNames.ACCOUNT,
    element: <Account />,
  },
];

export const routes: IRoute[] = [...publicRoutes, ...privateRoutes];
