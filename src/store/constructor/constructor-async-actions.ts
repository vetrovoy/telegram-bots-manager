import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../api/api";

import { IConstructor, IUser } from "../../types/app";

import { IInitialConstructorState } from "./constructor.";

const constructorAsyncActions = {
  getConstructorsByUserId: createAsyncThunk<
    IInitialConstructorState,
    IUser["id"]
  >("constructor/getConstructors", async (userId: IUser["id"]) => {
    const userConstructors: IConstructor[] =
      await api.getConstructorsByUserId(userId);

    let result: IInitialConstructorState = {
      status: "success",
      message: "",
      constructors: userConstructors,
    };

    return result;
  }),
};

export default constructorAsyncActions;
