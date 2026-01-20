import { api } from "@/lib/api-client";
import type { User, UserProfile } from "@/types/user";

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
  update: async (id: string, payload: Partial<User>): Promise<User> => {
    const { data } = await api.patch<User>(`/users/${id}`, payload);
    return data;
  },
  updateProfile: async (id: string, profile: Partial<UserProfile>): Promise<User> => {
    const { data } = await api.patch<User>(`/users/${id}/profile`, profile);
    return data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};

export type { User };
