import { NextResponse } from "next/server";
import { SUPPORTED_LOCALES } from "@/src/lib/i18n/detect";

export async function POST(req: Request) {
  try {
    const { lng } = (await req.json()) as { lng?: string };
    if (!lng || !SUPPORTED_LOCALES.includes(lng as any)) {
      return NextResponse.json({ error: "invalid language" }, { status: 400 });
    }
    const res = new NextResponse(null, { status: 204 });
    res.cookies.set("lng", lng, {
      path: "/",
      httpOnly: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
    return res;
  } catch (e) {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
}
