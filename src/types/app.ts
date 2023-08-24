export interface IBot {
  id: number;
  status: "processing" | "default";
  token: string;
  bot_name: string;
  bot_username: string;
  username: string;
  timestamp: number;
}

export interface IUser {
  id: number;
  username: string;
  password: string;
  language: "ru" | "en";
}
