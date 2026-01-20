
import { jwtDecode } from "jwt-decode";

export type JwtPayload = {
  sub: string;
  email: string;
  role: "REQUESTER" | "HELPER" | string;
  exp: number; // seconds since epoch
  iat?: number;
  [key: string]: unknown;
};

const TOKEN_STORAGE_KEY = "authToken";

export function decodeJwt(token: string): JwtPayload | null {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
}

export function isExpired(payload: JwtPayload): boolean {
  return payload.exp * 1000 < Date.now();
}

export function isTokenExpired(token: string | null | undefined): boolean {
  if (!token) return true;
  const decoded = decodeJwt(token);
  if (!decoded) return true;
  return isExpired(decoded);
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  } catch {
    // ignore
  }
}

export function clearToken(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function isAuthenticated(token?: string | null): boolean {
  const t = token ?? getToken();
  return !isTokenExpired(t ?? undefined);
}
