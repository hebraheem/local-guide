import { clearTokenOnServer } from "@/lib/jwt.server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";


export async function  POST() {
  await clearTokenOnServer();
  
  // Revalidate all profile and protected pages to clear cache
  revalidatePath("/profile", "layout");
  revalidatePath("/dashboard", "layout");
  revalidatePath("/", "layout");
  
  return NextResponse.json({ ok: true });
}