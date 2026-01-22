"use client";

import React, { useActionState } from "react";
import { LoginTypes, submitLoginForm } from "@/server/action";
import Input from "@/forms/Input";
import { Button } from "@/ui/button";
import useTranslation from "@/hooks/useTranslation";
import Link from "next/link";
import { PAGE_LINKS } from "@/constant/page.links";

const initialState: LoginTypes = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(
    submitLoginForm,
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
        type="password"
        label="LOGIN_PASSWORD"
        name="password"
        placeholder="**********"
        defaultValue={state.password}
        required
      />
      <Link href={PAGE_LINKS.REQUEST_RESET_PASSWORD} className="flex justify-end">{t("FORGOT_PASSWORD")}</Link>
      <Button
        className="w-full mt-6"
        appName="login"
        mode="primary"
        type="submit"
        disabled={isPending}
        isloading={isPending.toString()}
      >
        {t("LOGIN")}
      </Button>
    </form>
  );
};
export default LoginForm;
