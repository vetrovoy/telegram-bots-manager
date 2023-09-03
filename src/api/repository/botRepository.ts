import axios, { AxiosResponse } from "axios";

import { IBot } from "../../types/app";

export class BotRepository {
  private readonly API_ROOT = process.env.REACT_APP_API_ROOT; // Set the API root URL

  private generateBotId(): number {
    const digits: string = "0123456789";
    let id: number = 0;

    for (let i: number = 0; i < 6; i++) {
      const randomIndex: number = Math.floor(Math.random() * digits.length);
      id += parseInt(digits[randomIndex]);
    }

    return id;
  }

  // Добавить бота
  public async createBot(token: string, user_id: number): Promise<IBot> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const bots = await this.getBots();

      const isBotExist = bots.find((bot) => bot.token === token);

      if (isBotExist) {
        throw new Error(`A bot with token ${token} already exists`);
      }

      const botId: number = this.generateBotId();
      const bot: IBot = {
        token: token,
        id: botId,
        status: "processing",
        bot_name: `${user_id}_${botId}bot`,
        bot_username: `@${user_id}_${botId}bot`,
        timestamp: new Date().getTime(),
        user_id: user_id,
      };

      return bot;
    } catch (error: any) {
      throw new Error(`Error while creating bot: ${error.message}`);
    }
  }

  // Удалить бота по ID
  public async deleteBot(botId: number): Promise<void> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const bots = await this.getBots();

      const updatedBots = bots.filter((bot) => bot.id !== botId);

      // Логика обновления базы данных с удаленным ботом

      console.log(`Bot deleted successfully.`);
    } catch (error: any) {
      throw new Error(`Error while deleting bot: ${error.message}`);
    }
  }

  // Получить бота по ID
  public async getBotById(botId: number): Promise<IBot | undefined> {
    try {
      const bots = await this.getBots();
      const bot = bots.find((bot) => bot.id === botId);
      return bot;
    } catch (error: any) {
      throw new Error(`Error while getting bot by ID: ${error.message}`);
    }
  }

  // Получить всех ботов пользователя по ID пользователя
  public async getBotsByUserId(userId: number): Promise<IBot[]> {
    try {
      const bots = await this.getBots();
      const userBots = bots.filter((bot) => bot.user_id === userId);
      return userBots;
    } catch (error: any) {
      throw new Error(`Error while getting bots by username: ${error.message}`);
    }
  }

  // Получить всех ботов
  public async getBots(): Promise<IBot[]> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response: AxiosResponse<IBot[]> = await axios.get<IBot[]>(
        this.API_ROOT + `/data/bots.json`,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(`Error while fetching bots: ${error.message}`);
    }
  }

  public async updateBot(botId: number, updates: Partial<IBot>): Promise<IBot> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const bots = await this.getBots();

      const botIndex = bots.findIndex((bot) => bot.id === botId);

      if (botIndex === -1) {
        throw new Error(`Bot with id ${botId} not found`);
      }

      const updatedBot = { ...bots[botIndex], ...updates };

      bots[botIndex] = updatedBot;

      // Логика обновления базы данных с обновленным ботом

      return updatedBot;
    } catch (error: any) {
      throw new Error(`Error while updating bot: ${error.message}`);
    }
  }

  public async getActiveBots(): Promise<IBot[]> {
    try {
      const bots = await this.getBots();
      const activeBots = bots.filter((bot) => bot.status === "processing");
      return activeBots;
    } catch (error: any) {
      throw new Error(`Error while getting active bots: ${error.message}`);
    }
  }

  public async getInactiveBots(): Promise<IBot[]> {
    try {
      const bots = await this.getBots();
      const inactiveBots = bots.filter((bot) => bot.status !== "processing");
      return inactiveBots;
    } catch (error: any) {
      throw new Error(`Error while getting inactive bots: ${error.message}`);
    }
  }

  public async searchBots(keyword: string): Promise<IBot[]> {
    try {
      const bots = await this.getBots();
      const matchedBots = bots.filter(
        (bot) =>
          bot.token.includes(keyword) ||
          bot.bot_name.includes(keyword) ||
          bot.bot_username.includes(keyword),
      );
      return matchedBots;
    } catch (error: any) {
      throw new Error(`Error while searching bots: ${error.message}`);
    }
  }

  public async countBots(): Promise<number> {
    try {
      const bots = await this.getBots();
      const count = bots.length;
      return count;
    } catch (error: any) {
      throw new Error(`Error while counting bots: ${error.message}`);
    }
  }

  public async getBotByToken(token: string): Promise<IBot | undefined> {
    try {
      const bots = await this.getBots();
      const bot = bots.find((bot) => bot.token === token);
      return bot;
    } catch (error: any) {
      throw new Error(`Error while getting bot by token: ${error.message}`);
    }
  }

  public async authenticateBot(token: string): Promise<IBot | undefined> {
    try {
      const bot = await this.getBotByToken(token);

      if (bot) {
        // Perform authentication logic
        // ...
      }

      return bot;
    } catch (error: any) {
      throw new Error(`Error while authenticating bot: ${error.message}`);
    }
  }
}
