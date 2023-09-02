export type TConstructorButton = {
  id: number;
  name: string;
  response?: string;
};

export type TConstructor = {
  message: string;
  buttons: TConstructorButton[];
};

export interface IBot {
  id: number;
  status: "processing" | "default";
  token: string;
  bot_name: string;
  bot_username: string;
  username: string;
  timestamp: number;
  constructor?: TConstructor;
}

export interface IUser {
  id: number;
  username: string;
  password: string;
  language: "ru" | "en";
}
