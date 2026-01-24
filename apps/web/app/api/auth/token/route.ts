import {  getTokensOnServer } from "@/lib/jwt.server";
import { NextResponse } from "next/server";

export async function GET() {
  const tokens = await getTokensOnServer();

  return NextResponse.json({ tokens });
}