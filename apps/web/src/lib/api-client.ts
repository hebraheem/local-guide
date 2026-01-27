import axios, { AxiosInstance, AxiosError } from "axios";
import { config } from "@/config/app";
import { normalizeAxiosError } from "@/utils/normalize.error";
import { ApiError } from "@/types/api";
import { getTokenOnServer, getTokensOnServer } from "@/lib/jwt.server";

class ApiClient {
  private readonly instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: config.api.baseURL,
      timeout: config.api.timeout,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  setupInterceptors(): void {
    // Request interceptor - fetch token on EACH request
    this.instance.interceptors.request.use(
      async (config) => {
        const token = await getTokenOnServer();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiError>) => {
        if ((error.response?.status || error.status) === 401) {
          getTokensOnServer().then((tokens) => {
            fetch("/api/auth/refresh", {
              method: "POST",
              body: JSON.stringify({ refreshToken: tokens.refreshToken }),
            }).then((res) => {
              if (!res.json()) {
                console.log("error", error);
              }
            });
          });
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
