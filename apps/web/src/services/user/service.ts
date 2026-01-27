import { api } from "@/lib/api-client";
import type { User } from "@/types/user";
import { AxiosResponse } from "axios";

export const userService = {
  getAll: async (): Promise<User[]> => {
    const { data } = await api.get<User[]>("/users");
    return data;
  },
  getById: async (id: string): Promise<User> => {
    const { data } = await api.get<User>(`/users/${id}`);
    return data;
  },
  create: async (payload: Partial<User>): Promise<User> => {
    const { data } = await api.post<User>("/users", payload);
    return data;
  },
  update: async (payload: Partial<User>): Promise<User> => {
    const { data } = await api.patch<User>(`/users/me`, payload);
    return data;
  },
  updateLocation: async (location: {
    latitude: number;
    longitude: number;
  }): Promise<User> => {
    const { data } = await api.patch<User>(`/users/me`, { location });
    return data;
  },
  currentUser: async (): Promise<AxiosResponse<User>> => {
    const { data } = await api.get<AxiosResponse<User>>(`/users/me`);
    return data;
  },
  delete: async (id: string): Promise<void> => {
    await api.patch(`/users/${id}`);
  },
};

export type { User };
