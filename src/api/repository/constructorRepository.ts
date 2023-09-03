import axios, { AxiosResponse } from "axios";

import { IConstructor } from "../../types/app";

export class ConstructorRepository {
  private readonly API_ROOT = process.env.REACT_APP_API_ROOT; // Set the API root URL

  // Получить бота по ID
  public async getConstructorById(
    constructorId: number,
  ): Promise<IConstructor | undefined> {
    try {
      const constructors = await this.getConstructors();
      const constructor = constructors.find(
        (constructor) => constructor.id === constructorId,
      );
      return constructor;
    } catch (error: any) {
      throw new Error(
        `Error while getting constructor by ID: ${error.message}`,
      );
    }
  }

  // Получить все сценарии
  public async getConstructors(): Promise<IConstructor[]> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response: AxiosResponse<IConstructor[]> = await axios.get<
        IConstructor[]
      >(this.API_ROOT + `/data/constructors.json`);

      return response.data;
    } catch (error: any) {
      throw new Error(`Error while fetching constructors: ${error.message}`);
    }
  }

  // Получить сценарий по BOT ID
  public async getConstructorsByBotId(
    botId: number,
  ): Promise<IConstructor | undefined> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response: AxiosResponse<IConstructor[]> = await axios.get<
        IConstructor[]
      >(this.API_ROOT + `/data/constructors.json`);

      const constructors: IConstructor[] = response.data;
      const constructor = constructors.find(
        (constructor) => constructor.bot_id === botId,
      );

      return constructor ? constructor : undefined;
    } catch (error: any) {
      throw new Error(
        `Error while fetching constructors by bot ID: ${error.message}`,
      );
    }
  }

  // Получить сценарий по USER ID
  public async getConstructorsByUserId(
    userID: number,
  ): Promise<IConstructor[]> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response: AxiosResponse<IConstructor[]> = await axios.get<
        IConstructor[]
      >(this.API_ROOT + `/data/constructors.json`);

      const constructors: IConstructor[] = response.data;
      const filteredConstructors = constructors.filter(
        (constructor) => constructor.user_id === userID,
      );

      return filteredConstructors;
    } catch (error: any) {
      throw new Error(
        `Error while fetching constructors by user ID: ${error.message}`,
      );
    }
  }
}
