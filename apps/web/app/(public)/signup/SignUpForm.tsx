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
    <form className="w-full max-w-sm" action={formAction}>
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
        placeholder="john.doe@example.com"
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
        className="w-full mt-6"
        appName="login"
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
