import { PayloadAction } from "@reduxjs/toolkit";

import { IUser } from "../../types/app";

import { IInitialUserState } from "./user";

const userReducers = {
  setUserStatus: (
    state: IInitialUserState,
    action: PayloadAction<IInitialUserState["status"]>,
  ) => {
    state.status = action.payload;
  },
  setUserMessage: (
    state: IInitialUserState,
    action: PayloadAction<IInitialUserState["message"]>,
  ) => {
    state.message = action.payload;
  },
  setUser: (state: IInitialUserState, action: PayloadAction<IUser | null>) => {
    state.user = action.payload;
  },
};

export default userReducers;
