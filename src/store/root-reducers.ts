import { userReducer } from "./user/user";
import { botsReducer } from "./bots/bots";

const reducers = {
  user: userReducer,
  bots: botsReducer,
};

export default reducers;
