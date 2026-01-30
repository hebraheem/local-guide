import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";
import { config } from "@/config/app";
import { normalizeAxiosError } from "@/utils/normalize.error";
import { ApiError } from "@/types/api";
import { getTokenOnServer, getTokensOnServer } from "@/lib/jwt.server";

// Extend AxiosRequestConfig to track retries
interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

class ApiClient {
  private readonly instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: config.api.baseURL,
      timeout: config.api.timeout,
      headers: { "Content-Type": "application/json" },
    });

    this.setupInterceptors();
  }

  setupInterceptors(): void {
    this.instance.interceptors.request.use(async (config) => {
      const token = await getTokenOnServer();
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    // Handle 401 and refresh token
    this.instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError<ApiError>) => {
        const originalRequest = error.config as RetryableRequestConfig;

        if (
          originalRequest &&
          (error.response?.status || error.status) === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          try {
            const tokens = await getTokensOnServer();
            const res = await fetch(
              `${config.api.URL}/api/auth/refresh-token`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refreshToken: tokens.refreshToken }),
              },
            );

            if (!res.ok) throw new Error("Failed to refresh token");
            const data = await res.json();
            const { token: accessToken } = data;
            if (!accessToken) throw new Error("Invalid refresh token");

            // Fetch the updated token from server (cookies have been updated by the API route)
            const newToken = await getTokenOnServer();
            
            // Retry the original request with the new token
            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${newToken || accessToken}`,
            } as AxiosRequestHeaders;

            return this.instance(originalRequest);
          } catch (err) {
            console.error("Token refresh failed:", err);
            return Promise.reject(normalizeAxiosError(error));
          }
        }
        return Promise.reject(normalizeAxiosError(error));
      },
    );
  }

  public getClient(): AxiosInstance {
    return this.instance;
  }
}

export const apiClient = new ApiClient();
export const api = apiClient.getClient();
