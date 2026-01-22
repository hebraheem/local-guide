"use client";

import React, { useActionState } from "react";
import { submitUpdatePassword, UpdatePasswordType } from "@/server/action";
import Input from "@/forms/Input";
import { Button } from "@/ui/button";
import useTranslation from "@/hooks/useTranslation";

const initialState: UpdatePasswordType = {
  password: "",
};

const ResetPassword = () => {
  const [state, formAction, isPending] = useActionState(
    submitUpdatePassword,
    initialState,
  );
  const { t } = useTranslation();
  return (
    <form className="w-full max-w-sm" action={formAction}>
      <Input
        type="password"
        name="password"
        label="NEW_PASSWORD"
        defaultValue={state.password}
        placeholder="**********"
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
        {t("REQUEST_PASSWORD_RESET")}
      </Button>
    </form>
  );
};
export default ResetPassword;
