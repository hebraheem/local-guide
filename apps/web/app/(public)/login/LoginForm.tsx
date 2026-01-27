"use client";

import React, { useActionState, useEffect } from "react";
import { submitLoginForm } from "@/actions/auth.action";
import Input from "@/forms/Input";
import { Button } from "@/ui/button";
import useTranslation from "@/hooks/useTranslation";
import Link from "next/link";
import { PAGE_LINKS } from "@/constant/page.links";
import { toast } from "react-toastify";
import { AuthTokens } from "@/types/user";
import { ResponseWrapper } from "@/types/api";
import { useRouter } from "next/navigation";

const initialState: ResponseWrapper<AuthTokens> = {
  fields: { email: "", password: "" },
  success: false,
  error: null,
};

const LoginForm = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    submitLoginForm,
    initialState,
  );

  useEffect(
    () => {
      if (state.error) {
        toast.error(state.error.message);
      }

      if (state.success) {
        toast.success(t("LOGIN_SUCCESS"));
        router.push(PAGE_LINKS.DASHBOARD);
      }
    },
    // eslint-disable-next-line
    [state.error, state.success],
  );

  return (
    <form className="w-full space-y-1" action={formAction}>
      <Input
        type="email"
        name="email"
        label="LOGIN_EMAIL"
        defaultValue={state.fields.email}
        placeholder="john.doe@example.com"
        required
      />
      <Input
        type="password"
        label="LOGIN_PASSWORD"
        name="password"
        placeholder="**********"
        defaultValue={state.fields.password}
        required
      />
      <div className="flex justify-end pt-2 pb-4">
        <Link
          href={PAGE_LINKS.REQUEST_RESET_PASSWORD}
          className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
        >
          {t("FORGOT_PASSWORD")}
        </Link>
      </div>
      <Button
        className="w-full mt-2 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
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
