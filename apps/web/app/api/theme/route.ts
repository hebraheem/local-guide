import { NextRequest, NextResponse } from "next/server";
import { isValidTheme } from "@/src/lib/theme/detect";

export async function POST(req: NextRequest) {
  try {
    const { theme } = (await req.json()) as { theme?: unknown };
    if (!isValidTheme(theme)) {
      return NextResponse.json({ error: "Invalid theme" }, { status: 400 });
    }

    const res = new NextResponse(null, { status: 204 });
    res.cookies.set("theme", theme, {
      httpOnly: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
    return res;
  } catch (e) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}
