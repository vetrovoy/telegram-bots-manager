export interface IConstructorButtonResponse {
  id: number;
  message?: string;
  buttons_relation?: IConstructorButton["id"][];
}

export interface IConstructorButton {
  id: number;
  name: string;
  response?: IConstructorButtonResponse;
}

export interface IConstructor {
  id: number;
  name: string;
  message: string;
  buttons: IConstructorButton[];
  bot_id: IBot["id"];
  user_id: IUser["id"];
}

export interface IBot {
  id: number;
  status: "processing" | "default";
  token: string;
  bot_name: string;
  bot_username: string;
  timestamp: number;
  user_id: IUser["id"];
}

export interface IUser {
  id: number;
  username: string;
  password: string;
  language: "ru" | "en";
}
