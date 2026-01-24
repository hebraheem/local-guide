import { NextResponse } from "next/server";
import {
  clearTokenOnServer,
  getRefreshTokenOnServer,
  setTokensOnServer,
} from "@/lib/jwt.server";


export async function POST() {
  const refresh = await getRefreshTokenOnServer();
  if (!refresh) return NextResponse.json({}, { status: 401 });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    },
  );

  if (!res.ok) {
    await clearTokenOnServer();
    return NextResponse.json({}, { status: 401 });
  }

  const { accessToken, refreshToken } = await res.json();
  await setTokensOnServer({ token: accessToken, refreshToken });

  return NextResponse.json({ ok: true });
}
