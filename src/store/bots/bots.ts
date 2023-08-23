import {
  ActionReducerMapBuilder,
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";

import { IBot } from "../../types/app";

import botsReducers from "./bots-reducers";

import botsAsyncActions from "./bots-async-actions";

export interface IInitialBotsState {
  status: "loading" | "success" | "error" | "idle";
  message: string;
  bots: IBot[];
}

const initialState: IInitialBotsState = {
  status: "idle",
  message: "",
  bots: [],
};

const botsExtraReducers = (
  builder: ActionReducerMapBuilder<IInitialBotsState>,
) => {
  return [
    builder.addCase(botsAsyncActions.getBots.pending, (state) => {
      state.message = "Загрузка";
      state.status = "loading";
    }),
    builder.addCase(
      botsAsyncActions.getBots.fulfilled,
      (state, action: PayloadAction<IInitialBotsState>) => {
        return action.payload;
      },
    ),
    builder.addCase(botsAsyncActions.getBots.rejected, (state, action) => {
      state.status = "error";
      state.message = "Ошибка!";
    }),
  ];
};

const bots = createSlice({
  name: "user",
  initialState,
  reducers: {
    ...botsReducers,
  },
  extraReducers: (builder) => {
    botsExtraReducers(builder).map((reducer) => {
      return reducer;
    });
  },
});

export const botsActions = bots.actions;
export const botsReducer = bots.reducer;
