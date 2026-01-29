import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { PaginatedResponse } from "@/types/api";
import { User } from "@/types/user";
import { userService } from "@/services";

export type UsersQueryParams = {
  role?: string;
  limit?: number;
  search?: string;
};

export const useUsers = (
  params: UsersQueryParams = {},
  options?: Omit<
    UseInfiniteQueryOptions<
      PaginatedResponse<User>, // TQueryFnData
      Error, // TError
      InfiniteData<PaginatedResponse<User>>, // TData
      readonly unknown[], // TQueryKey
      number // TPageParam
    >,
    "queryKey" | "queryFn" | "getNextPageParam" | "initialPageParam"
  >,
) => {
  return useInfiniteQuery({
    queryKey: ["users", params] as const,
    queryFn: ({ pageParam = 1 }) =>
      userService.getAll({
        ...params,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.meta;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
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
