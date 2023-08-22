import { ComponentType, useEffect } from "react";
import { Navigate } from "react-router-dom";

import api from "../../api/api";
import {
  useTypedDispatch,
  useTypedSelector,
} from "../../hooks/useTypedSelector.";
import {
  IInitialAppState,
  setUser,
  setUserMessage,
  setUserStatus,
} from "../../store/app/app";
import { IUser } from "../../types/app";
import { routeNames } from "../../route/routes";
import AppSpin from "../common/appSpin";

interface IWithUserProtectedRoute {
  user: IUser | null;
}

export default function withUserProtectedRoute<
  T extends IWithUserProtectedRoute,
>(WrappedComponent: ComponentType<T>) {
  return (props: Omit<T, keyof IWithUserProtectedRoute>) => {
    const dispatch = useTypedDispatch();
    const app: IInitialAppState = useTypedSelector((state) => state.app);
    const localUser: string | null = localStorage.getItem("username");

    useEffect(() => {
      async function fetchUser() {
        if (app.user) return;

        if (localUser) {
          dispatch(setUserStatus("loading"));
          dispatch(setUserMessage("Загрузка..."));

          const fetchedUser: IUser | undefined =
            await api.getUserByUserName(localUser);

          if (fetchedUser) {
            dispatch(setUserMessage("Успешная авторизация!"));
            dispatch(setUserStatus("success"));
            dispatch(setUser(fetchedUser));
          }
        }
      }
      fetchUser();
    }, [app.user, dispatch, localUser]);

    function renderContent() {
      const isAppLoading = app.status === "loading";
      const hasLocalUserAndNoAppUser = localUser && !app.user;
      const hasAppUser = app.user;
      const noAppUserAndNoLocalUser = !app.user && !localUser;

      if (isAppLoading || hasLocalUserAndNoAppUser) {
        return <AppSpin />;
      }

      if (hasAppUser) {
        return <WrappedComponent {...(props as T)} user={app.user} />;
      }

      if (noAppUserAndNoLocalUser) {
        return <Navigate to={routeNames.HOME} />;
      }
    }

    return <>{renderContent()}</>;
  };
}
