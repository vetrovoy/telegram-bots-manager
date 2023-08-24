import React from "react";
import { Navigate } from "react-router-dom";

import Home from "../pages/home";
import Dashboard from "../pages/dashboard";
import Account from "../pages/account";
import Login from "../pages/login";
import Fallback from "../pages/fallback";
import Bots from "../pages/bot";

export enum routeNames {
  ERROR = "/404",
  HOME = "/",
  LOGIN = "/",
  DASHBOARD = "/dashboard",
  ACCOUNT = "/account",
  BOTS = "/dashboard/:slug",
}

export interface IRoute {
  path: string;
  element: React.ReactNode;
  exact?: boolean;
}

export const publicRoutes: IRoute[] = [
  {
    path: "*",
    element: <Navigate to={routeNames.ERROR} />,
  },
  {
    path: routeNames.ERROR,
    element: <Fallback />,
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
  {
    path: routeNames.BOTS,
    element: <Bots />,
  },
];

export const routes: IRoute[] = [...publicRoutes, ...privateRoutes];
