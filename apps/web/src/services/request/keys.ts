export const requestKeys = {
  all: ["request"] as const,
  list: () => ["request", "list"] as const,
  detail: (id: string) => ["request", "detail", id] as const,
} as const;

export type RequestKeys = typeof requestKeys;
