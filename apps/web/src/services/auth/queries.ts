"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AuthPayload, AuthTokens, User } from "@/types/user";
import { authService } from "./service";
import { authKeys } from "./keys";
import { apiClient } from "@/lib/api-client";

/*
* ============================ QUERIES ============================
* =================================================================
* */
export const useAuthMe = (enabled: boolean = true) =>
  useQuery({
    queryKey: authKeys.me(),
    queryFn: authService.me,
    enabled,
  });


/*
* ============================ MUTATIONS ============================
* ===================================================================
* */
export const useLogin = () => {
  const qc = useQueryClient();
  return useMutation<AuthTokens, unknown, AuthPayload>({
    mutationFn: (payload) => authService.login(payload),
    onSuccess: async (data) => {
      await qc.invalidateQueries({ queryKey: authKeys.me() });
    },
  });
};

export const useRegister = () => {
  const qc = useQueryClient();
  return useMutation<User, unknown, AuthPayload>({
    mutationFn: (payload) => authService.register(payload),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: authKeys.me() });
    },
  });
};

export const useLogout = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: authKeys.me() });
      qc.clear();
    },
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: authService.refreshToken,
    onSuccess: (data) => {
      // apiClient.setTokens(data.accessToken, data.refreshToken);
    },
  });
};
