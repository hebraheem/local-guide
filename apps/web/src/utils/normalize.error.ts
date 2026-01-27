import axios, { AxiosError } from "axios";

export interface NormalizedApiError extends AxiosError {
  status?: number;
  code?: string;
}

export function normalizeAxiosError(error: unknown): NormalizedApiError {
  if (axios.isAxiosError(error)) {

    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Request failed";

    const err = new Error(message) as NormalizedApiError;
    err.status = error?.status ?? error.response?.status;
    err.code = error.code;

    return err;
  }

  return error as NormalizedApiError;
}
