import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../../api/api";

import { IInitialAppState } from "../app";
import { IUser, IBot } from "../../../types/app";

const userActions = {
  login: createAsyncThunk<IInitialAppState, IUser>(
    "user/fetchUser",
    async (userData: IUser) => {
      const usersResponse: IUser[] = await api.getUsers();

      let result: IInitialAppState = {
        status: "error",
        user: null,
        message: "Пользователь не найден!",
        bots: [],
      };

      const user: IUser | undefined = usersResponse.find(
        (v) => v.username === userData.username,
      );

      if (!user) return result;

      if (user.password === userData.password) {
        const userBots: IBot[] = await api.getUserBotsByUserName(
          userData.username,
        );

        result = {
          status: "success",
          user: user,
          message: "Вы успешно вошли на сайт.",
          bots: userBots,
        };

        localStorage.setItem("username", user.username);
        return result;
      }

      result = {
        status: "error",
        user: user,
        message: "Неверный пароль.",
        bots: [],
      };

      return result;
    },
  ),
};

export const { login } = userActions;
export default userActions;
