"use client";
import { useActionState } from "react";
import Input from "@/forms/Input";
import { submitUpdatePassword } from "@/server/action";
import { useEffect } from "react";
import useTranslation from "@/hooks/useTranslation";

const initialState = { 
  success: false,
  password: "" 
};

export default function PasswordForm() {
  const { t } = useTranslation();
  const [state, formAction, isPending] = useActionState(
    submitUpdatePassword,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      console.log("Password updated successfully");
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-2">
      <Input
        label="CURRENT_PASSWORD"
        name="currentPassword"
        type="password"
        required
        placeholder="ENTER_CURRENT_PASSWORD"
      />

      <Input
        label="NEW_PASSWORD"
        name="password"
        type="password"
        required
        placeholder="ENTER_NEW_PASSWORD"
      />

      <Input
        label="CONFIRM_PASSWORD"
        name="confirmPassword"
        type="password"
        required
        placeholder="CONFIRM_NEW_PASSWORD"
      />

      <div className="pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="w-full px-6 py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:scale-100"
        >
          {isPending ? t("UPDATING") : t("UPDATE_PASSWORD")}
        </button>
      </div>
    </form>
  );
}
