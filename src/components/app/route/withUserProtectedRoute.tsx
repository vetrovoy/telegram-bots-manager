import { ComponentType, useEffect } from "react";
import { Navigate } from "react-router-dom";

import {
  useTypedDispatch,
  useTypedSelector,
} from "../../../hooks/useTypedSelector";

import { IUser } from "../../../types/app";
import { routeNames } from "../../../route/routes";

import AppSpinner from "../layout/appSpinner";
import constructorAsyncActions from "../../../store/constructor/constructor-async-actions";
import botsAsyncActions from "../../../store/bots/bots-async-actions";
import userAsyncActions from "../../../store/user/user-async-actions";

interface IWithUserProtectedRoute {
  user: IUser | null;
}

export default function withUserProtectedRoute<
  T extends IWithUserProtectedRoute,
>(WrappedComponent: ComponentType<T>) {
  return (props: Omit<T, keyof IWithUserProtectedRoute>) => {
    const dispatch = useTypedDispatch();
    const user = useTypedSelector((state) => state.user);
    const bots = useTypedSelector((state) => state.bots);
    const constructors = useTypedSelector((state) => state.constructors);

    const localUserId = parseInt(localStorage.getItem("userId") || "") || null;

    useEffect(() => {
      if (localUserId && !user.user) {
        dispatch(userAsyncActions.auth(localUserId));
      }
    }, [localUserId, user.user, dispatch]);

    useEffect(() => {
      if (localUserId && bots.bots.length === 0) {
        dispatch(botsAsyncActions.getBotsByUserId(localUserId));
      }
    }, [localUserId, bots.bots, dispatch]);

    useEffect(() => {
      if (localUserId && constructors.constructors.length === 0) {
        dispatch(constructorAsyncActions.getConstructorsByUserId(localUserId));
      }
    }, [localUserId, constructors.constructors, dispatch]);

    function renderContent(): JSX.Element {
      const isUserLoading = user.status === "loading";
      const haslocalUserIdAndNoUser = localUserId && !user.user;
      const hasUser = user.user;
      const noUserAndNolocalUserId = !user.user && !localUserId;

      if (isUserLoading || haslocalUserIdAndNoUser) {
        return <AppSpinner />;
      }

      if (hasUser) {
        return <WrappedComponent {...(props as T)} user={user.user} />;
      }

      if (noUserAndNolocalUserId) {
        return <Navigate to={routeNames.LOGIN} />;
      }

      return <Navigate to={routeNames.ERROR} />;
    }
    return <>{renderContent()}</>;
  };
}
