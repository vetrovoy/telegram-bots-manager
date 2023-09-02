import { ComponentType, useEffect } from "react";
import { Navigate } from "react-router-dom";

import api from "../../../api/api";
import {
  useTypedDispatch,
  useTypedSelector,
} from "../../../hooks/useTypedSelector";

import { IInitialUserState, userActions } from "../../../store/user/user";
import { IUser } from "../../../types/app";
import { routeNames } from "../../../route/routes";
import { useTranslate } from "../../../hooks/useTranslate";
import AppSpinner from "../layout/appSpinner";

interface IWithUserProtectedRoute {
  user: IUser | null;
}

export default function withUserProtectedRoute<
  T extends IWithUserProtectedRoute,
>(WrappedComponent: ComponentType<T>) {
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
      const isUserLoading = user.status === "loading";
      const hasLocalUserAndNoUser = localUser && !user.user;
      const hasUser = user.user;
      const noUserAndNoLocalUser = !user.user && !localUser;

      if (isUserLoading || hasLocalUserAndNoUser) {
        return <AppSpinner />;
      }

      if (hasUser) {
        return <WrappedComponent {...(props as T)} user={user.user} />;
      }

      if (noUserAndNoLocalUser) {
        return <Navigate to={routeNames.LOGIN} />;
      }

      return <Navigate to={routeNames.ERROR} />;
    }
    return <>{renderContent()}</>;
  };
}
