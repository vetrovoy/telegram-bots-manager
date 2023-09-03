import {
  ActionReducerMapBuilder,
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";

import { IConstructor } from "../../types/app";

import constructorReducers from "./constructor-reducers";

import constructorAsyncActions from "./constructor-async-actions";

export interface IInitialConstructorState {
  status: "loading" | "success" | "error" | "idle" | "хуй";
  message: string;
  constructors: IConstructor[];
}

const initialState: IInitialConstructorState = {
  status: "idle",
  message: "",
  constructors: [],
};

const constructorExtraReducers = (
  builder: ActionReducerMapBuilder<IInitialConstructorState>,
) => {
  return [
    builder.addCase(
      constructorAsyncActions.getConstructorsByUserId.pending,
      (state) => {
        state.message = "Загрузка...";
        state.status = "loading";
      },
    ),
    builder.addCase(
      constructorAsyncActions.getConstructorsByUserId.fulfilled,
      (state, action: PayloadAction<IInitialConstructorState>) => {
        return action.payload;
      },
    ),
    builder.addCase(
      constructorAsyncActions.getConstructorsByUserId.rejected,
      (state, action) => {
        state.status = "error";
        state.message = "Ошибка!";
      },
    ),
  ];
};

const constructor = createSlice({
  name: "constructor",
  initialState,
  reducers: {
    ...constructorReducers,
  },
  extraReducers: (builder) => {
    constructorExtraReducers(builder).map((reducer) => {
      return reducer;
    });
  },
});

export const constructorActions = constructor.actions;
export const constructorReducer = constructor.reducer;
