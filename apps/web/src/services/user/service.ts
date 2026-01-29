import { api } from "@/lib/api-client";
import type { User } from "@/types/user";
import { AxiosResponse } from "axios";
import { ApiResponse, PaginatedResponse } from "@/types/api";

export const userService = {
  getAll: async (
    query: Record<string, any>,
  ): Promise<PaginatedResponse<User>> => {
    let queryString = new URLSearchParams(query).toString();
    if (queryString) {
      queryString = `?${queryString}`;
    }
    const { data } = await api.get<PaginatedResponse<User>>(
      "/users" + queryString,
    );
    return data;
  },
  getById: async (id: string): Promise<ApiResponse<User>> => {
    const { data } = await api.get<ApiResponse<User>>(`/users/${id}`);
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
