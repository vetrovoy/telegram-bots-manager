import Api from "../../api/api";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { AxiosResponse } from "axios";
import { IInitialUserState } from "./user";
import { IUser } from "../../types/user";

const api = new Api();

const userActions = {
  login: createAsyncThunk("user/fetchUser", async (userObj: IUser) => {
    const response: AxiosResponse<IUser[]> = await api.getUsers();

    let result: IInitialUserState = {
      status: "error",
      user: null,
      message: "Пользователь не найден!",
    };

    const user: IUser | undefined = response.data.find(
      (v) => v.username === userObj.username
    );

    if (!user) return result;

    if (user.password === userObj.password) {
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
  }),
};

export const { login } = userActions;
export default userActions;
