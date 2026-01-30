import { NextRequest, NextResponse } from "next/server";
import { clearTokenOnServer, setTokensOnServer } from "@/lib/jwt.server";

export async function POST(req: NextRequest) {
  const { refreshToken } = await req.json();

  if (!refreshToken)
    return NextResponse.json(
      {
        error: "Refresh token is required",
      },
      { status: 401 },
    );

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    },
  );
  const response = await res.json();

  await clearTokenOnServer();
  if (!response?.accessToken) {
    return NextResponse.json(
      {
        error: "Invalid refresh token",
      },
      { status: 400 },
    );
  }

  const { accessToken, refreshToken: newRefreshToken } = response;

  await setTokensOnServer({
    token: accessToken,
    refreshToken: newRefreshToken,
  });

  return NextResponse.json({
    ok: true,
    token: accessToken,
    refreshToken: newRefreshToken,
  });
}
