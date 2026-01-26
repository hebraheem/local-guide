import { NormalizedApiError } from "@/utils/normalize.error";

export interface ApiResponse<T = unknown> {
  statusCode: number;
  message: string;
  data?: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
  timestamp?: string;
}

export type ResponseWrapper<TData> = {
  success: boolean;
  data?: TData;
  error?: NormalizedApiError | null;
  fields: Record<string, any>;
};

export type ResponseType<TData> = Pick<ResponseWrapper<TData>, "fields">;