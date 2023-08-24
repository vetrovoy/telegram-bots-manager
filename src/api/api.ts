import axios, { AxiosResponse } from "axios";

import { IUser, IBot } from "../types/app";

const API_ROOT = "http://localhost:3000/";

export class Api {
  public async getUsers(): Promise<IUser[]> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response: AxiosResponse<IUser[]> = await axios.get<IUser[]>(
        API_ROOT + `/data/users.json`,
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Error while fetching users: ${error.message}`);
    }
  }
  public async getUserByUserName(username: string): Promise<IUser | undefined> {
    const response = await this.getUsers();

    const result: IUser | undefined = response.find(
      (v) => v.username === username,
    );

    return result;
  }
  public async getUserBotsByUserName(username: string): Promise<IBot[]> {
    const response = await this.getBots();
    const result: IBot[] | undefined = response.filter(
      (v) => v.username === username,
    );

    return result ? result : [];
  }
  public async getBots(): Promise<IBot[]> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response: AxiosResponse<IBot[]> = await axios.get<IBot[]>(
        API_ROOT + `/data/bots.json`,
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Error while fetching users: ${error.message}`);
    }
  }
  public async createBot(token: string, username: string): Promise<IBot> {
    return new Promise((resolve) =>
      setTimeout(async () => {
        const bots = await this.getBots();

        const isBotExist = bots.find((b) => b.token === token);

        if (!isBotExist) {
          const botId: number = this.generateBotId();
          const bot: IBot = {
            id: botId,
            status: "processing",
            token: token,
            username: username,
            bot_name: `${username}_${botId}bot`,
            bot_username: `@${username}_${botId}bot`,
            timestamp: new Date().getTime(),
          };
          resolve(bot);
        }
      }, 1000),
    );
  }
  private generateBotId(): number {
    const digits: string = "0123456789";
    let id: number = 0;

    for (let i: number = 0; i < 6; i++) {
      const randomIndex: number = Math.floor(Math.random() * digits.length);
      id += parseInt(digits[randomIndex]);
    }

    return id;
  }
}

const api = new Api();
export default api;
