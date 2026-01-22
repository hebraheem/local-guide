"use client";

import React, { useActionState } from "react";
import {  SignUpTypes, submitSignUpForm } from "@/server/action";
import Input from "@/forms/Input";
import { Button } from "@/ui/button";
import useTranslation from "@/hooks/useTranslation";

const initialState: SignUpTypes = {
  email: "",
  password: "",
  username: "",
};

const SignUpForm = () => {
  const [state, formAction, isPending] = useActionState(
    submitSignUpForm,
    initialState,
  );
  const { t } = useTranslation();
  return (
    <form className="w-full space-y-1" action={formAction}>
      <Input
        type="email"
        name="email"
        label="LOGIN_EMAIL"
        defaultValue={state.email}
        placeholder="john.doe@example.com"
        required
      />
      <Input
        type="text"
        name="username"
        label="USERNAME"
        defaultValue={state.username}
        placeholder="johndoe"
        required
      />
      <Input
        type="password"
        label="LOGIN_PASSWORD"
        name="password"
        placeholder="**********"
        defaultValue={state.password}
        required
      />
      <Button
        className="w-full mt-6 bg-gradient-to-r from-secondary-600 to-primary-600 hover:from-secondary-700 hover:to-primary-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
        appName="signup"
        mode="primary"
        type="submit"
        disabled={isPending}
        isloading={isPending.toString()}
      >
        {t("SIGN_UP")}
      </Button>
    </form>
  );
};
export default SignUpForm;
