export const authKeys = {
  all: ["auth"] as const,
  me: () => ["auth", "me"] as const,
  status: () => ["auth", "status"] as const,
} as const;

export type AuthKeys = typeof authKeys;
