export const userKeys = {
  all: ["user"] as const,
  list: () => ["user", "list"] as const,
  detail: (id: string) => ["user", "detail", id] as const,
  profile: (id: string) => ["user", "profile", id] as const,
  me: () => ["user", "me"] as const,
} as const;

export type UserKeys = typeof userKeys;
