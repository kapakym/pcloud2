import { requestBuilder } from "../api/requestBuilder";
import { IUser, IUserUpdate } from "../types/auth.types";
import { IGetPeoplesReq } from "../types/media.types";
import {
  IGetUsersReq,
  IGetUsersResponse,
  IUserActive,
} from "../types/users.types";

class UsersService {
  async getUsers(data?: IGetUsersReq) {
    const response = await requestBuilder<IGetPeoplesReq, IGetUsersResponse>({
      url: "user/list",
      method: "post",
      options: {
        isAuth: true,
        data,
      },
    });
    return response;
  }

  async setActiveUser(data: IUserActive) {
    const response = await requestBuilder<IUserActive, boolean>({
      url: "user/active",
      method: "post",
      options: {
        isAuth: true,
        data,
      },
    });
    return response;
  }

  async deleteUser(data: { id: string }) {
    const response = await requestBuilder<{ id: string }, boolean>({
      url: "user/delete",
      method: "post",
      options: {
        isAuth: true,
        data,
      },
    });
    return response;
  }

  async getUserProfile() {
    const response = await requestBuilder<unknown, IUser>({
      url: "user/profile",
      method: "get",
      options: {
        isAuth: true,
      },
    });
    return response;
  }

  async updateProfile(data: IUserUpdate) {
    const response = await requestBuilder<IUserUpdate, IUser>({
      url: "user/profile",
      method: "put",
      options: {
        isAuth: true,
        data,
      },
    });
    return response;
  }
}

export const usersService = new UsersService();
