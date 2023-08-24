import { ComponentType, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";

import api from "../../api/api";
import {
  useTypedDispatch,
  useTypedSelector,
} from "../../hooks/useTypedSelector";

import { IInitialUserState, userActions } from "../../store/user/user";
import { IUser } from "../../types/app";
import { routeNames } from "../../route/routes";
import AppSpin from "../common/appSpin";
import { useTranslate } from "../../hooks/useTranslate";

interface IWithUserProtectedRoute {
  user: IUser | null;
}

export default function withUserProtectedRoute<
  T extends IWithUserProtectedRoute,
>(WruseredComponent: ComponentType<T>) {
  return (props: Omit<T, keyof IWithUserProtectedRoute>) => {
    const t = useTranslate();
    const dispatch = useTypedDispatch();
    const user: IInitialUserState = useTypedSelector((state) => state.user);
    const localUser: string | null = localStorage.getItem("username");

    useEffect(() => {
      fetchUser();
    }, []);

    async function fetchUser() {
      if (user.user) return;

      if (localUser) {
        dispatch(userActions.setUserStatus("loading"));
        dispatch(userActions.setUserMessage(t("Загрузка...")));

        const fetchedUser: IUser | undefined =
          await api.getUserByUserName(localUser);

        if (fetchedUser) {
          dispatch(userActions.setUserMessage(t("Успешная авторизация!")));
          dispatch(userActions.setUserStatus("success"));
          dispatch(userActions.setUser(fetchedUser));
        }
      }
    }

    function renderContent(): JSX.Element {
      const isAppLoading = user.status === "loading";
      const hasLocalUserAndNoAppUser = localUser && !user.user;
      const hasAppUser = user.user;
      const noAppUserAndNoLocalUser = !user.user && !localUser;

      if (isAppLoading || hasLocalUserAndNoAppUser) {
        return <AppSpin />;
      }

      if (hasAppUser) {
        return <WruseredComponent {...(props as T)} user={user.user} />;
      }

      if (noAppUserAndNoLocalUser) {
        return <Navigate to={routeNames.HOME} />;
      }

      return <>Произошла непредвиденная ошибка</>;
    }
    return <>{renderContent()}</>;
  };
}
