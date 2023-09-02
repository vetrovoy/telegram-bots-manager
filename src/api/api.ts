import { IBot, IUser } from "../types/app";

import { UserRepository } from "./repository/userRepository";
import { BotRepository } from "./repository/botRepository";

export class ApiService {
  private userRepository: UserRepository;
  private botRepository: BotRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.botRepository = new BotRepository();
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
  public async createBot(token: string, username: string): Promise<IBot> {
    return await this.botRepository.createBot(token, username);
  }

  // Метод для удаления бота по ID
  public deleteBot(botId: number): void {
    this.botRepository.deleteBot(botId);
  }

  // Метод для получения бота по ID
  public async getBotById(botId: number): Promise<IBot | undefined> {
    return await this.botRepository.getBotById(botId);
  }

  // Метод для получения ботов по USERNAME
  public async getBotsByUserName(username: string): Promise<IBot[]> {
    return await this.botRepository.getBotsByUserName(username);
  }
  // getBotsByUserName
}

const api = new ApiService();
export default api;
