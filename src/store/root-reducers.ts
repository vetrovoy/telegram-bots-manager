import { userReducer } from "./user/user";
import { botsReducer } from "./bots/bots";
import { constructorReducer } from "./constructor/constructor.";

const reducers = {
  constructors: constructorReducer,
  user: userReducer,
  bots: botsReducer,
};

export default reducers;
