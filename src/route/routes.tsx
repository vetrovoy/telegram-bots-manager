import React from "react";
import { Navigate } from "react-router-dom";

import Home from "../pages/home";
import Dashboard from "../pages/dashboard";
import Constructors from "../pages/constructors";
import Constructor from "../pages/slug/constructor";
import Account from "../pages/account";
import Login from "../pages/login";
import Fallback from "../pages/fallback";
import Bots from "../pages/slug/bot";

export enum routeNames {
  ERROR = "/404",
  HOME = "/",
  LOGIN = "/",
  DASHBOARD = "/dashboard",
  CONSTRUCTORS = "/constructors",
  CONSTRUCTOR = "/constructors/",
  ACCOUNT = "/account",
  BOTS = "/dashboard/",
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
    path: routeNames.CONSTRUCTORS,
    element: <Constructors />,
  },
  {
    path: routeNames.CONSTRUCTOR + ":slug",
    element: <Constructor />,
  },
  {
    path: routeNames.ACCOUNT,
    element: <Account />,
  },
  {
    path: routeNames.BOTS + ":slug",
    element: <Bots />,
  },
];

export const routes: IRoute[] = [...publicRoutes, ...privateRoutes];
