"use server";

import { RequestFormTypes } from "@/types/request.types";
import { redirect } from "next/navigation";
import { PAGE_LINKS } from "@/constant/page.links";
import {  setTokensOnServer } from "@/lib/jwt.server";

const testToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlYTA3Nzc2Ni0xNGIyLTRiNjQtOThlNy03Mzg5MDI1NDIyMTgiLCJ1c2VybmFtZSI6ImpvaG5fZG9lIiwicm9sZXMiOlsiUkVRVUVTVEVSIiwiSEVMUEVSIl0sImlhdCI6MTc2OTE5NDY5MCwiZXhwIjoxNzY5MTk4MjkwfQ.oC2uYHtZEnGwdyS2bWRDlQS32PdTqiYFZ5h0ejVCH3M";

const testRefreshToken = "";

export type LoginTypes = {
  email: string;
  password: string;
};

export type SignUpTypes = {
  username: string;
} & LoginTypes;

export type ResetPasswordTypes = Omit<LoginTypes, "password"> & {
  success?: boolean;
};
export type UpdatePasswordType = Omit<LoginTypes, "email"> & {
  success?: boolean;
};

export async function submitLoginForm(
  _prevState: LoginTypes,
  formData: FormData,
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const success = true;

  if (success) {
    await setTokensOnServer({ token: testToken, refreshToken: testRefreshToken });

    redirect(PAGE_LINKS.DASHBOARD);
  }
  return {
    success: true,
    email,
    password,
  };
}

export async function submitSignUpForm(
  _prevState: SignUpTypes,
  formData: FormData,
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const username = formData.get("username") as string;
  const success = true;
  if (success) {
    await setTokensOnServer({
      token: testToken,
      refreshToken: testRefreshToken,
    });
    redirect(PAGE_LINKS.DASHBOARD);
  }
  return {
    success: true,
    email,
    password,
    username,
  };
}

export async function submitRequestPassword(
  _prevState: ResetPasswordTypes,
  formData: FormData,
) {
  const email = formData.get("email") as string;

  return {
    success: true,
    email,
  };
}

export async function submitUpdatePassword(
  _prevState: UpdatePasswordType,
  formData: FormData,
) {
  const password = formData.get("password") as string;

  return {
    success: true,
    password,
  };
}

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
