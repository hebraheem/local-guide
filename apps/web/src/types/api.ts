import { NormalizedApiError } from "@/utils/normalize.error";

export interface ApiResponse<T = unknown> {
  statusCode: number;
  message: string;
  data?: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    totalRecord: number;
    currentPage: number;
    limit: number;
    totalPages: number;
  };
  statusCode?: number;
  message?: string;
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