import { IBot, IUser, IConstructor } from "../types/app";

import { UserRepository } from "./repository/userRepository";
import { BotRepository } from "./repository/botRepository";
import { ConstructorRepository } from "./repository/constructorRepository";

export class ApiService {
  private userRepository: UserRepository;
  private botRepository: BotRepository;
  private constructorRepository: ConstructorRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.botRepository = new BotRepository();
    this.constructorRepository = new ConstructorRepository();
  }

  // Метод для создания пользователя
  public createUser(user: IUser): void {
    this.userRepository.createUser(user);
  }

  // Метод для удаления пользователя по ID
  public deleteUser(userId: number): void {
    this.userRepository.deleteUser(userId);
  }

  // Метод для получения пользователя по ID
  public async getUsers(): Promise<IUser[]> {
    return await this.userRepository.getUsers();
  }

  // Метод для получения пользователя по ID
  public async getUserById(userId: number): Promise<IUser | undefined> {
    return await this.userRepository.getUserById(userId);
  }

  // Метод для получения пользователя по USERNAME
  public async getUserByName(username: string): Promise<IUser | undefined> {
    return await this.userRepository.getUserByName(username);
  }

  // Метод для создания бота
  public async createBot(token: string, userId: number): Promise<IBot> {
    return await this.botRepository.createBot(token, userId);
  }

  // Метод для удаления бота по ID
  public deleteBot(botId: number): void {
    this.botRepository.deleteBot(botId);
  }

  // Метод для получения бота по ID
  public async getBotById(botId: number): Promise<IBot | undefined> {
    return await this.botRepository.getBotById(botId);
  }

  // Метод для получения ботов по USER ID
  public async getBotsByUserId(userId: number): Promise<IBot[]> {
    return await this.botRepository.getBotsByUserId(userId);
  }

  // Метод для получения всех сценариев
  public async getConstructors(): Promise<IConstructor[]> {
    return await this.constructorRepository.getConstructors();
  }

  // Метод для получения сценариев по BOT ID
  public async getConstructorsByBotId(
    botId: number,
  ): Promise<IConstructor | undefined> {
    return await this.constructorRepository.getConstructorsByBotId(botId);
  }

  // Метод для получения сценариев по USER ID
  public async getConstructorsByUserId(
    userId: number,
  ): Promise<IConstructor[]> {
    return await this.constructorRepository.getConstructorsByUserId(userId);
  }
}

const api = new ApiService();
export default api;
