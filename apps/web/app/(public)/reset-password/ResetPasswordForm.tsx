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
    <form className="w-full space-y-1" action={formAction}>
      <Input
        type="password"
        name="password"
        label="NEW_PASSWORD"
        defaultValue={state.password}
        placeholder="**********"
        required
      />
      <Button
        className="w-full mt-6 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
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
export default ResetPassword;
