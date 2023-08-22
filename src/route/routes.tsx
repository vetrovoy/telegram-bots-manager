import React from "react";
import { Navigate } from "react-router-dom";

import Home from "../pages/home";
import Dashboard from "../pages/dashboard";
import Account from "../pages/account";
import Login from "../pages/login";

import withUserProtectedRoute from "../components/route/withUserProtectedRoute";

export enum routeNames {
  HOME = "/",
  LOGIN = "/",
  DASHBOARD = "/dashboard",
  ACCOUNT = "/account",
}

const DashboardProtected = withUserProtectedRoute(Dashboard);
const AccountProtected = withUserProtectedRoute(Account);

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
    element: <DashboardProtected />,
  },
  {
    path: routeNames.ACCOUNT,
    element: <AccountProtected />,
  },
];

export const routes: IRoute[] = [...publicRoutes, ...privateRoutes];
