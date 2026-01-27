"use server";

import { Role, User } from "@/types/user";
import { safeAction } from "@/lib/response-handler";
import { ApiResponse, ResponseType } from "@/types/api";
import { userService } from "@/services";
import { Language } from "@/forms/LanguageInput";
import { revalidatePath } from "next/cache";
import { PAGE_LINKS } from "@/constant/page.links";
import { headers } from "next/headers";

export const submitProfileUpdate = safeAction(
  async (_prevState: ResponseType<User>, formData: FormData) => {
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const bio = formData.get("bio") as string;
    const phone = formData.get("phone") as string;
    const street = formData.get("street") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const zipCode = formData.get("zipCode") as string;
    const country = formData.get("country") as string;

    // Get roles, skills and language arrays
    const roles = formData.getAll("roles[]") as Role[];
    const skills = formData.getAll("skills[]") as string[];
    const languages =
      // @ts-expect-error parsing JSON
      formData.getAll("languages[]").map(JSON.parse) as Language[];
    console.log("", street, city, state, zipCode, country);

    return await userService.update({
      username,
      email,
      roles,
      profile: {
        firstName,
        lastName,
        bio,
        phone,
        languages,
        skills,
        address: {
          street,
          city,
          state,
          zipCode,
          country,
        },
      },
    });
  },
  async () => {
    revalidatePath(PAGE_LINKS.PROFILE);
  },
);

export async function getCurrentUser(): Promise<ApiResponse<User>> {
  // Force Next.js to treat this as dynamic by accessing headers
  await headers();
  
  const user = await userService.currentUser();
  if(!user){
    return {
      statusCode: 404,
      message: "User not found",
    }
  }
  return {
    statusCode: 200,
    data: user.data,
    message: "Current user fetched successfully",
  }
}
