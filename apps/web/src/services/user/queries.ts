"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { User } from "@/types/user";
import { userService } from "./service";
import { userKeys } from "./keys";

export const useUsers = () =>
  useQuery({
    queryKey: userKeys.list(),
    queryFn: userService.getAll,
  });

export const useUser = (id: string, enabled: boolean = true) =>
  useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => userService.getById(id),
    enabled: Boolean(id) && enabled,
  });

export const useCreateUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<User>) => userService.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: userKeys.list() });
    },
  });
};

export const useUpdateUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<User> }) =>
      userService.update(id, payload),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: userKeys.detail(variables.id) });
      qc.invalidateQueries({ queryKey: userKeys.list() });
    },
  });
};

export const useDeleteUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => userService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: userKeys.list() });
    },
  });
};
