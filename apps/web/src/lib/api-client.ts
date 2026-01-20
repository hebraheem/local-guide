import axios, { AxiosInstance, AxiosError } from "axios";
import { config } from "@/config/app";

const AUTH_TOKEN_KEY = "authToken";

interface ApiErrorResponse {
  statusCode: number;
  message: string;
  error?: string;
}

class ApiClient {
  private instance: AxiosInstance;

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

  private setupInterceptors(): void {
    this.instance.interceptors.request.use(
      (config) => {
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiErrorResponse>) => {
        if (error.response?.status === 401) {
          this.handleUnauthorized();
        }
        return Promise.reject(error);
      },
    );
  }

  private getAuthToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(AUTH_TOKEN_KEY);
    }
    return null;
  }

  private handleUnauthorized(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      window.dispatchEvent(new CustomEvent("unauthorized"));
    }
  }

  public setAuthToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
    }
  }

  public clearAuthToken(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    }
  }

  public getClient(): AxiosInstance {
    return this.instance;
  }
}

export const apiClient = new ApiClient();
export const api = apiClient.getClient();
