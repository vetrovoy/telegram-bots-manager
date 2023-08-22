import api from "../../api/api";
import { message } from "antd";
import React, { ComponentType, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
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

interface WithUserProps {
  user: IUser | null;
}

export default function withFetchUser<T extends WithUserProps>(
  WrappedComponent: ComponentType<T>
) {
  return (props: Omit<T, keyof WithUserProps>) => {
    const dispatch = useTypedDispatch();
    const app: IInitialAppState = useTypedSelector((state) => state.app);
    const localUser: string | null = localStorage.getItem("username");

    useEffect(() => {
      if (app.user) return;

      fetchUser();
    }, [app.user]);

    async function fetchUser() {
      if (localUser) {
        dispatch(setUserStatus("loading"));
        dispatch(setUserMessage("Загрузка..."));

        const fetchedUser: IUser | undefined = await api.getUserByUserName(
          localUser
        );

        if (fetchedUser) {
          dispatch(setUserMessage("Успешная авторизация!"));
          dispatch(setUserStatus("success"));
          dispatch(setUser(fetchedUser));
        }
      }
    }
    
    return (
      <>
        {app.status === "loading" || (localUser && !app.user) ? (
          <AppSpin />
        ) : app.user ? (
          <WrappedComponent {...(props as T)} user={app.user} />
        ) : (
          !app.user && !localUser && <Navigate to={routeNames.HOME} />
        )}
      </>
    );
  };
}
