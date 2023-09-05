import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../api/api";

import { IBot, IUser } from "../../types/app";

import { IInitialBotsState } from "./bots";

const botsAsyncActions = {
  getBotsByUserId: createAsyncThunk<IInitialBotsState, IUser["id"]>(
    "bots/getBotsByUserId",
    async (userId: IUser["id"]) => {
      const userBots: IBot[] = await api.getBotsByUserId(userId);

      let result: IInitialBotsState = {
        status: "idle",
        message: "",
        bots: userBots,
      };

      console.log(result);

      return result;
    },
  ),
};

export default botsAsyncActions;
