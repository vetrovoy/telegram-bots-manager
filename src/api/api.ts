import { IUser } from "../types/user";
import axios, { AxiosResponse } from "axios";

export default class Api {
  public async getUsers(): Promise<AxiosResponse<IUser[]>> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response: AxiosResponse<IUser[]> = await axios.get<IUser[]>(
        `./data/users.json`
      );

      return response;
    } catch (error: any) {
      throw new Error(`Error while fetching users: ${error.message}`);
    }
  }
  public async getUserByUserName(username: string): Promise<IUser | undefined> {
    const response = await this.getUsers();

    const result: IUser | undefined = response.data.find(
      (v) => v.username === username
    );

    return result;
  }
}
