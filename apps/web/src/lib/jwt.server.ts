"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

const TOKEN_STORAGE_KEY = "authToken";
const REFRESH_TOKEN_STORAGE_KEY = "refreshToken";

export type Role = "REQUESTER" | "HELPER";
export type JwtPayload = {
  sub: string;
  email: string;
  iat: number;
  roles: Role[];
  exp: number;
  [key: string]: any;
};

export type MinimalAuthUser = {
  isAuthenticated: boolean;
  user: JwtPayload | null;
};

export async function getServerAuthUser(): Promise<MinimalAuthUser> {
  const token = await getTokenOnServer();
  if (!token) return { isAuthenticated: false, user: null };

  try {
    const payload = jwtDecode<JwtPayload>(token);

    const isValid = await isTokenValidOnServer(token);

    if (!isValid) return { isAuthenticated: false, user: null };

    return { isAuthenticated: true, user: payload };
  } catch {
    return { isAuthenticated: false, user: null };
  }
}

export async function setTokensOnServer(tokens: {
  token: string;
  refreshToken: string;
}): Promise<void> {
  const { token, refreshToken } = tokens;
  const cookieStore = await cookies();
  cookieStore.set({
    name: TOKEN_STORAGE_KEY,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  cookieStore.set({
    name: REFRESH_TOKEN_STORAGE_KEY,
    value: refreshToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}

export async function getTokenOnServer(
  isRefresh?: boolean,
): Promise<string | null> {
  const cookieStore = await cookies();
  return (
    cookieStore.get(isRefresh ? REFRESH_TOKEN_STORAGE_KEY : TOKEN_STORAGE_KEY)
      ?.value || null
  );
}

export async function getRefreshTokenOnServer(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(REFRESH_TOKEN_STORAGE_KEY)?.value || null;
}

export async function clearTokenOnServer(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_STORAGE_KEY);
  cookieStore.delete(REFRESH_TOKEN_STORAGE_KEY);
}

export async function getTokensOnServer(): Promise<{
  token: string | null;
  refreshToken: string | null;
}> {
  return {
    token: await getTokenOnServer(),
    refreshToken: await getRefreshTokenOnServer(),
  };
}

export async function isTokenValidOnServer(
  token: string | null,
): Promise<boolean> {
  if (!token) return false;
  const payload = jwtDecode<JwtPayload>(token);
  return payload.exp * 1000 > Date.now(); // still valid
}
