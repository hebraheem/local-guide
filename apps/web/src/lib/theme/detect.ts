import { cookies } from "next/headers";

export type Theme = "light" | "dark";

export async function getTheme(): Promise<Theme> {
  const c = await cookies();
  const theme = c.get("theme")?.value;
  if (theme === "dark" || theme === "light") return theme;
  return "light";
}

export function isValidTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}
