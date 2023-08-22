import { PayloadAction } from "@reduxjs/toolkit";

import { IUser } from "../../../types/app";
import { IInitialAppState } from "../app";

const userReducers = {
  setUserStatus: (
    state: IInitialAppState,
    action: PayloadAction<IInitialAppState["status"]>,
  ) => {
    state.status = action.payload;
  },
  setUserMessage: (
    state: IInitialAppState,
    action: PayloadAction<IInitialAppState["message"]>,
  ) => {
    state.message = action.payload;
  },
  setUserBots: (
    state: IInitialAppState,
    action: PayloadAction<IInitialAppState["bots"]>,
  ) => {
    state.bots = action.payload;
  },
  setUser: (state: IInitialAppState, action: PayloadAction<IUser | null>) => {
    state.user = action.payload;
  },
};

export default userReducers;
