import {
  ActionReducerMapBuilder,
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";

import { IUser } from "../../types/app";

import userAsyncActions from "./user-async-actions";
import userReducers from "./user-reducers";

export interface IInitialUserState {
  status: "loading" | "success" | "error" | "idle";
  user: IUser | null;
  message: string;
}

const initialState: IInitialUserState = {
  status: "idle",
  message: "",
  user: null,
};

const userLoginExtraReducers = (
  builder: ActionReducerMapBuilder<IInitialUserState>,
) => {
  return [
    builder.addCase(userAsyncActions.login.pending, (state) => {
      state.message = "Загрузка";
      state.status = "loading";
    }),
    builder.addCase(
      userAsyncActions.login.fulfilled,
      (state, action: PayloadAction<IInitialUserState>) => {
        return action.payload;
      },
    ),
    builder.addCase(userAsyncActions.login.rejected, (state, action) => {
      state.status = "error";
      state.message = "Ошибка!";
    }),
  ];
};

const userLogoutExtraReducers = (
  builder: ActionReducerMapBuilder<IInitialUserState>,
) => {
  return [
    builder.addCase(userAsyncActions.logout.pending, (state) => {
      state.message = "Загрузка";
      state.status = "loading";
    }),
    builder.addCase(
      userAsyncActions.logout.fulfilled,
      (state, action: PayloadAction<IInitialUserState>) => {
        return action.payload;
      },
    ),
    builder.addCase(userAsyncActions.logout.rejected, (state, action) => {
      state.status = "error";
      state.message = "Ошибка!";
    }),
  ];
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    ...userReducers,
  },
  extraReducers: (builder) => {
    userLoginExtraReducers(builder).map((reducer) => {
      return reducer;
    });
    userLogoutExtraReducers(builder).map((reducer) => {
      return reducer;
    });
  },
});

export const userActions = user.actions;
export const userReducer = user.reducer;
