import { PayloadAction } from "@reduxjs/toolkit";

import { IInitialConstructorState } from "./constructor.";

const constructorReducers = {
  setConstructorStatus: (
    state: IInitialConstructorState,
    action: PayloadAction<IInitialConstructorState["status"]>,
  ) => {
    state.status = action.payload;
  },
  setConstructorMessage: (
    state: IInitialConstructorState,
    action: PayloadAction<IInitialConstructorState["message"]>,
  ) => {
    state.message = action.payload;
  },
  setConstructors: (
    state: IInitialConstructorState,
    action: PayloadAction<IInitialConstructorState["constructors"]>,
  ) => {
    state.constructors = action.payload;
  },
};

export default constructorReducers;
