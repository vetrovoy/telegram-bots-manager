import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../api/api";

import { IBot, IUser } from "../../types/app";

import { IInitialBotsState } from "./bots";

const botsAsyncActions = {
  getBots: createAsyncThunk<IInitialBotsState, IUser>(
    "bots/getBots",
    async (userData: IUser) => {
      const userBots: IBot[] = await api.getUserBotsByUserName(
        userData.username,
      );

      let result: IInitialBotsState = {
        status: "idle",
        message: "",
        bots: userBots,
      };

      return result;
    },
  ),
};

export default botsAsyncActions;
