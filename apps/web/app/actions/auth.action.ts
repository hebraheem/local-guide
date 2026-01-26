"use server";

import { RequestFormTypes } from "@/types/request.types";
import { setTokensOnServer } from "@/lib/jwt.server";
import { authService } from "@/services";
import { safeAction } from "@/lib/response-handler";
import { ResponseType } from "@/types/api";
import { AuthTokens } from "@/types/user";

export const submitLoginForm = safeAction(
  async (_prev: ResponseType<AuthTokens>, payload: FormData) => {
    const email = payload.get("email") as string;
    const password = payload.get("password") as string;

    return authService.login({
      email,
      username: email,
      password,
    });
  },
  async (data) => {
    const { refreshToken, accessToken } = data;
    await setTokensOnServer({
      token: accessToken,
      refreshToken: refreshToken as string,
    });
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

export type ProfileUpdateTypes = {
  success?: boolean;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  phone?: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  skills?: string[];
  languages?: string[];
};

export async function submitProfileUpdate(
  _prevState: ProfileUpdateTypes,
  formData: FormData,
) {
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

  // Get roles and skills arrays
  const roles = formData.getAll("roles[]") as string[];
  const skills = formData.getAll("skills[]") as string[];

  return {
    success: true,
    username,
    email,
    firstName,
    lastName,
    bio,
    phone,
    street,
    city,
    state,
    zipCode,
    country,
    roles,
    skills,
  };
}

export async function submitRequest(
  prevState: Partial<RequestFormTypes>,
  formData: FormData,
) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const mode = formData.get("mode") as string;
  const category = formData.get("category") as string;
  const deadline = formData.get("deadline") as string;
  const amount = formData.get("amount") as string;
  const currency = formData.get("currency") as string;
  const city = formData.get("city") as string;
  const street = formData.get("street") as string;
  const state = formData.get("state") as string;
  const zipCode = formData.get("zipCode") as string;
  const country = formData.get("country") as string;
  const latitude = formData.get("latitude") as string;
  const longitude = formData.get("longitude") as string;
  console.log("prevState", prevState);

  return {
    success: true,
    title,
    description,
    mode,
    category,
    deadline,
    amount,
    currency,
    city,
    street,
    state,
    zipCode,
    country,
    latitude,
    longitude,
  };
}
