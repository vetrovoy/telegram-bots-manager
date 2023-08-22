import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IUser, IBot } from "../../types/app";

import userReducers from "./user/user-reducers";
import { login } from "./user/user-actions";

export interface IInitialAppState {
  status: "loading" | "loading-inner" | "success" | "error" | "idle";
  user: IUser | null;
  message: string;
  bots: IBot[];
}

const initialState: IInitialAppState = {
  status: "idle",
  message: "",
  user: null,
  bots: [],
};
// TODO bots вынести отдельно из файла с юзера
const app = createSlice({
  name: "user",
  initialState,
  reducers: {
    ...userReducers,
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.message = "Загрузка";
      state.status = "loading";
    });
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<IInitialAppState>) => {
        return action.payload;
      },
    );
    builder.addCase(login.rejected, (state, action) => {
      state.status = "error";
    });
  },
});

export const { setUser, setUserMessage, setUserStatus, setUserBots } =
  app.actions;
// export const userActions = app.actions;

export const appReducer = app.reducer;
