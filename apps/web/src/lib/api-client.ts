import axios, { AxiosInstance, AxiosError } from "axios";
import { config } from "@/config/app";

interface ApiErrorResponse {
  statusCode: number;
  message: string;
  error?: string;
}

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

    axios.get("/api/auth/token").then((res) => {
      this.setupInterceptors(res.data.token);
    });
  }

  private setupInterceptors(token: string | null): void {
    this.instance.interceptors.request.use(
      (config) => {
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
          axios.post("/api/auth/refresh").then((res: any) => {
            if (!res.ok) {
              console.log("error", error);
            }
          });
        }
        return Promise.reject(error);
      },
    );
  }

  public getClient(): AxiosInstance {
    return this.instance;
  }
}

export const apiClient = new ApiClient();
export const api = apiClient.getClient();
