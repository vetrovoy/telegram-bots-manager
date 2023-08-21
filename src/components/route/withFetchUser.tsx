import Api from "../../api/api";
import { message } from "antd";
import React, { ComponentType, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  useTypedDispatch,
  useTypedSelector,
} from "../../hooks/useTypedSelector.";
import { setUser, setUserMessage, setUserStatus } from "../../store/user/user";
import { IUser } from "../../types/user";
import { routeNames } from "../../route/routes";
import Appspin from "../appSpin";
import AppSpin from "../appSpin";

interface WithUserProps {
  user: IUser | null;
}

export default function withFetchUser<T extends WithUserProps>(
  WrappedComponent: ComponentType<T>
) {
  return (props: Omit<T, keyof WithUserProps>) => {
    const api = new Api();

    const dispatch = useTypedDispatch();
    const user = useTypedSelector((state) => state.user);
    const localUser: string | null = localStorage.getItem("username");

    useEffect(() => {
      if (user.user) return;

      fetchUser();
    }, [user.user]);

    async function fetchUser() {
      if (localUser) {
        dispatch(setUserStatus("loading"));
        dispatch(setUserMessage("Загрузка..."));

        const fetchedUser: IUser | undefined = await api.getUserByUserName(
          localUser
        );

        if (fetchedUser) {
          dispatch(setUser(fetchedUser));
          dispatch(setUserStatus("success"));
          dispatch(setUserMessage("Успешная авторизация!"));
        }
      }
    }

    return (
      <>
        {user.status === "loading" ? (
          <AppSpin />
        ) : user.user || localUser ? (
          <WrappedComponent {...(props as T)} user={user} />
        ) : (
          <Navigate to={routeNames.HOME} />
        )}
      </>
    );
  };
}
