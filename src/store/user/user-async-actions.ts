import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../api/api";

import { IUser } from "../../types/app";

import { IInitialUserState } from "./user";

const userAsyncActions = {
  login: createAsyncThunk<IInitialUserState, IUser>(
    "user/loginUser",
    async (userData: IUser) => {
      const usersResponse: IUser[] = await api.getUsers();

      let result: IInitialUserState = {
        status: "error",
        user: null,
        message: "Пользователь не найден!",
      };

      const user: IUser | undefined = usersResponse.find(
        (v) => v.username === userData.username,
      );

      if (!user) return result;

      if (user.password === userData.password) {
        result = {
          status: "success",
          user: user,
          message: "Вы успешно вошли на сайт.",
        };

        localStorage.setItem("username", user.username);
        return result;
      }

      result = {
        status: "error",
        user: user,
        message: "Неверный пароль.",
      };

      return result;
    },
  ),
  logout: createAsyncThunk<IInitialUserState>("user/logoutUser", async () => {
    return await new Promise((resolve) =>
      setTimeout(() => {
        localStorage.setItem("username", "");

        const result: IInitialUserState = {
          status: "success",
          user: null,
          message: "Успешно!",
        };

        resolve(result);
      }, 1000),
    );
  }),
};

export default userAsyncActions;
