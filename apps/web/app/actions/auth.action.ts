"use server";

import { setTokensOnServer } from "@/lib/jwt.server";
import { authService } from "@/services";
import { safeAction } from "@/lib/response-handler";
import { ResponseType } from "@/types/api";
import { AuthTokens } from "@/types/user";
import { revalidatePath } from "next/cache";

export const submitLoginForm = safeAction(
  async (_prev: ResponseType<AuthTokens>, payload: FormData) => {
    const email = payload.get("email") as string;
    const password = payload.get("password") as string;

    return await authService.login(
      {
        email,
        username: email,
        password,
      },
    );
  },
  async (data) => {
    const { refreshToken, accessToken } = data;
    await setTokensOnServer({
      token: accessToken,
      refreshToken: refreshToken as string,
    });
    
    // Clear cache for protected routes
    revalidatePath("/profile", "layout");
    revalidatePath("/dashboard", "layout");
    revalidatePath("/", "layout");
  },
);

export const submitSignUpForm = safeAction(
  async (_prevState: ResponseType<AuthTokens>, formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const username = formData.get("username") as string;

    return await authService.register({
      email,
      username,
      password,
    });
  },
  async (data) => {
    const { refreshToken, accessToken } = data;
    await setTokensOnServer({
      token: accessToken,
      refreshToken: refreshToken as string,
    });
    
    // Clear cache for protected routes
    revalidatePath("/profile", "layout");
    revalidatePath("/dashboard", "layout");
    revalidatePath("/", "layout");
  },
);

export const submitRequestPassword = safeAction(
  async (_prevState: ResponseType<never>, formData: FormData) => {
    const email = formData.get("email") as string;

    return await authService.requestPasswordReset(email);
  },
);

export const submitUpdatePassword = safeAction(
  async (_prevState: ResponseType<never>, formData: FormData) => {
    const newPassword = formData.get("password") as string;
    const token = formData.get("token") as string;

    return await authService.resetPassword(token, newPassword);
  },
);


