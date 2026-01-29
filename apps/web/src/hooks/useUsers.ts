import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { PaginatedResponse } from "@/types/api";
import { User } from "@/types/user";
import { userService } from "@/services";

export type UsersQueryParams = {
  role?: string;
  page?: number;
  limit?: number;
  search?: string;
};

export const useUsers = (
  params: UsersQueryParams = {},
  options?: Omit<
    UseQueryOptions<PaginatedResponse<User>>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<PaginatedResponse<User>>({
    queryKey: ["users", params],
    queryFn: () => userService.getAll(params),
    //suspense: false,
    ...options,
  });
};

export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (filters: UsersQueryParams) => [...userKeys.lists(), filters] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};
