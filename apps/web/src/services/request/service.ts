import { api } from "@/lib/api-client";

export interface RequestItem {
  id: string;
  title: string;
  description?: string;
  status?: "OPEN" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  createdAt?: string | Date;
  updatedAt?: string | Date;
  [key: string]: unknown;
}

export const requestService = {
  getAll: async (): Promise<RequestItem[]> => {
    const { data } = await api.get<RequestItem[]>("/requests");
    return data;
  },
  getById: async (id: string): Promise<RequestItem> => {
    const { data } = await api.get<RequestItem>(`/requests/${id}`);
    return data;
  },
  create: async (payload: Partial<RequestItem>): Promise<RequestItem> => {
    const { data } = await api.post<RequestItem>("/requests", payload);
    return data;
  },
  update: async (id: string, payload: Partial<RequestItem>): Promise<RequestItem> => {
    const { data } = await api.patch<RequestItem>(`/requests/${id}`, payload);
    return data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/requests/${id}`);
  },
};
