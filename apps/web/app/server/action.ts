"use server";

export type LoginTypes = {
  email: string;
  password: string;
};

export type SignUpTypes = {
  username: string;
} & LoginTypes;

export type ResetPasswordTypes = Omit<LoginTypes, "password">;
export type UpdatePasswordType = Omit<LoginTypes, "email">;

export async function submitLoginForm(
  prevState: LoginTypes,
  formData: FormData,
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  return {
    success: true,
    email,
    password,
  };
}

export async function submitSignUpForm(
  prevState: SignUpTypes,
  formData: FormData,
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const username = formData.get("username") as string;

  return {
    success: true,
    email,
    password,
    username,
  };
}

export async function submitRequestPassword(
  prevState: ResetPasswordTypes,
  formData: FormData,
) {
  const email = formData.get("email") as string;

  return {
    success: true,
    email,
  };
}

export async function submitUpdatePassword(
  prevState: UpdatePasswordType,
  formData: FormData,
) {
  const password = formData.get("password") as string;

  return {
    success: true,
    password,
  };
}