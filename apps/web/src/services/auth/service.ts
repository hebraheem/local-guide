import { api } from "@/lib/api-client";
import type { AuthPayload, AuthTokens, User } from "@/types/user";

export const authService = {
  login: async (payload: AuthPayload): Promise<AuthTokens> => {
    const { data } = await api.post<AuthTokens>("/auth/login", payload);
    return data;
  },
  register: async (payload: AuthPayload): Promise<AuthTokens> => {
    const { data } = await api.post<AuthTokens>("/auth/register", payload);
    return data;
  },
  me: async (): Promise<User> => {
    const { data } = await api.get<User>("/auth/me");
    return data;
  },
  logout: async (): Promise<void> => {
    await api.post("/auth/logout", {});
  },
  refreshToken: async (refreshToken: string): Promise<AuthTokens> => {
    const { data } = await api.post<AuthTokens>("/auth/refresh-token", {
      refreshToken,
    });
    return data;
  },
  requestPasswordReset: async (email: string): Promise<void> => {
    await api.post("/auth/request-password-reset", { email });
  },
  resetPassword: async (
    token: string,
    newPassword: string,
  ): Promise<void> => {
    await api.post("/auth/reset-password", {
      token,
      newPassword,
    });
  },
};

export type { User, AuthPayload, AuthTokens };
