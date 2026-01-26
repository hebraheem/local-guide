"use client";

import React, { useActionState } from "react";
import {  submitRequestPassword } from "@/actions/auth.action";
import Input from "@/forms/Input";
import { Button } from "@/ui/button";
import useTranslation from "@/hooks/useTranslation";
import { ResponseWrapper } from "@/types/api";

const initialState: ResponseWrapper<never> = {
  fields: { email: "" },
  success: false,
  error: null,
};

const RequestPassword = () => {
  const [state, formAction, isPending] = useActionState(
    submitRequestPassword,
    initialState,
  );
  const { t } = useTranslation();
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
      <Button
        className="w-full mt-6 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
        appName="reset-password"
        mode="primary"
        type="submit"
        disabled={isPending}
        isloading={isPending.toString()}
      >
        {t("REQUEST_PASSWORD_RESET")}
      </Button>
    </form>
  );
};
export default RequestPassword;
