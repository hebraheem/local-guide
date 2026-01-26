import axios, { AxiosInstance, AxiosError } from "axios";
import { config } from "@/config/app";
import { normalizeAxiosError } from "@/utils/normalize.error";
import { ApiError } from "@/types/api";

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

    axios.get(config.api.URL+"/api/auth/token").then((res) => {
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
      (error: AxiosError<ApiError>) => {
        if ((error.response?.status || error.status) === 401) {
          axios.post(config.api.URL + "/api/auth/refresh").then((res: any) => {
            if (!res.data?.accessToken) {
              console.log("error", error);
            }
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
