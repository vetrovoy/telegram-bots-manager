import { PayloadAction } from "@reduxjs/toolkit";

import { IBot } from "../../types/app";

import { IInitialBotsState } from "./bots";

const botsReducers = {
  setBotsStatus: (
    state: IInitialBotsState,
    action: PayloadAction<IInitialBotsState["status"]>,
  ) => {
    state.status = action.payload;
  },
  setBotsMessage: (
    state: IInitialBotsState,
    action: PayloadAction<IInitialBotsState["message"]>,
  ) => {
    state.message = action.payload;
  },
  setBots: (
    state: IInitialBotsState,
    action: PayloadAction<IInitialBotsState["bots"]>,
  ) => {
    state.bots = action.payload;
  },
};

export default botsReducers;
