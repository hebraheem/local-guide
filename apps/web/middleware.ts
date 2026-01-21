import { NextRequest, NextResponse } from "next/server";
import { SUPPORTED_LOCALES } from "@/src/lib/i18n/detect";

export function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const langParam = url.searchParams.get("lang");
  if (langParam && SUPPORTED_LOCALES.includes(langParam as any)) {
    const res = NextResponse.redirect(new URL(url.pathname + url.hash, req.url));
    res.cookies.set("lng", langParam, {
      path: "/",
      httpOnly: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
    });
    return res;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
