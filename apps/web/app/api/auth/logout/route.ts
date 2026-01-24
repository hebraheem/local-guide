import { clearTokenOnServer } from "@/lib/jwt.server";
import { NextResponse } from "next/server";


export async function  POST() {
  await clearTokenOnServer();
  return NextResponse.json({ ok: true });
}