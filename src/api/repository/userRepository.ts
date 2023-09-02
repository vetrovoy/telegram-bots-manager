import axios, { AxiosResponse } from "axios";

import { IUser } from "../../types/app";

export class UserRepository {
  private readonly API_ROOT = process.env.REACT_APP_API_ROOT; // Set the API root URL

  // Добавить пользователя
  public async createUser(user: IUser): Promise<void> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response: AxiosResponse<IUser> = await axios.post<IUser>(
        this.API_ROOT + `/data/users.json`,
        user,
      );

      console.log(`User created successfully:`, response.data);
    } catch (error: any) {
      throw new Error(`Error while creating user: ${error.message}`);
    }
  }

  // Удалить пользователя по ID
  public async deleteUser(userId: number): Promise<void> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response: AxiosResponse = await axios.delete(
        this.API_ROOT + `/data/users/${userId}.json`,
      );

      console.log(`User deleted successfully.`, response.data);
    } catch (error: any) {
      throw new Error(`Error while deleting user: ${error.message}`);
    }
  }

  // Получить пользователя по ID
  public async getUserById(userId: number): Promise<IUser | undefined> {
    try {
      const users = await this.getUsers();
      const user = users.find((user) => user.id === userId);
      return user;
    } catch (error: any) {
      throw new Error(`Error while getting user by ID: ${error.message}`);
    }
  }

  // Получить пользователя по имени пользователя
  public async getUserByName(username: string): Promise<IUser | undefined> {
    try {
      const users = await this.getUsers();
      const user = users.find((user) => user.username === username);
      return user;
    } catch (error: any) {
      throw new Error(`Error while getting user by name: ${error.message}`);
    }
  }

  // Получить всех пользователей
  public async getUsers(): Promise<IUser[]> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response: AxiosResponse<IUser[]> = await axios.get<IUser[]>(
        this.API_ROOT + `/data/users.json`,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(`Error while fetching users: ${error.message}`);
    }
  }

  // Обновить информацию о пользователе
  public async updateUser(
    userId: number,
    updates: Partial<IUser>,
  ): Promise<IUser> {
    try {
      const user = await this.getUserById(userId);

      if (!user) {
        throw new Error(`User with ID ${userId} not found.`);
      }

      const updatedUser = { ...user, ...updates };

      const response: AxiosResponse<IUser> = await axios.put<IUser>(
        this.API_ROOT + `/data/users/${userId}.json`,
        updatedUser,
      );

      console.log(`User updated successfully:`, response.data);

      return response.data;
    } catch (error: any) {
      throw new Error(`Error while updating user: ${error.message}`);
    }
  }

  // Получить пользователей с определенной ролью
  // public async getUsersByRole(role: string): Promise<IUser[]> {
  //   try {
  //     const users = await this.getUsers();
  //     const filteredUsers = users.filter((user) => user.role === role);
  //     return filteredUsers;
  //   } catch (error: any) {
  //     throw new Error(`Error while fetching users by role: ${error.message}`);
  //   }
  // }

  // Поиск пользователей по ключевому слову
  public async searchUsers(keyword: string): Promise<IUser[]> {
    try {
      const users = await this.getUsers();
      const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(keyword.toLowerCase()),
      );
      return filteredUsers;
    } catch (error: any) {
      throw new Error(`Error while searching users: ${error.message}`);
    }
  }

  // Получить количество пользователей
  public async countUsers(): Promise<number> {
    try {
      const users = await this.getUsers();
      return users.length;
    } catch (error: any) {
      throw new Error(`Error while counting users: ${error.message}`);
    }
  }

  // Аутентификация пользователя по имени пользователя и паролю
  public async authenticateUser(
    username: string,
    password: string,
  ): Promise<IUser | undefined> {
    try {
      const user = await this.getUserByName(username);

      if (!user || user.password !== password) {
        throw new Error(`Invalid credentials.`);
      }

      return user;
    } catch (error: any) {
      throw new Error(`Error while authenticating user: ${error.message}`);
    }
  }
}
