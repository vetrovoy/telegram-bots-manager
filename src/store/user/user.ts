import { createSlice } from "@reduxjs/toolkit";
import userReducers from "./user-reducers";
import { login } from "./user-actions";
import { IUser } from "../../types/user";

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

const user = createSlice({
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
    builder.addCase(login.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = "error";
    });
  },
});

export const { setUser, setUserMessage, setUserStatus } = user.actions;
export const userReducer = user.reducer;
