import React from "react";
import initTranslations from "@/lib/i18n/server";
import Image from "next/image";
import login from "@/public/svg/undraw_forgot-password_nttj.svg";
import Link from "next/link";
import { PAGE_LINKS } from "@/constant/page.links";
import ResetPasswordForm from "@/(public)/reset-password/ResetPasswordForm";

const ResetPasswordPage = async () => {
  const { t } = await initTranslations();
  return (
    <div
      className={`flex flex-col items-center h-[calc(100vh-var(--header-h))] px-4`}
    >
      <Image
        src={login}
        alt="login"
        width={200}
        loading="eager"
        className="py-8"
      />
      <h1>{t("RESET_YOUR_PASSWORD")}</h1>
      <p className="pb-10 pt-6">{t("PROVIDE_YOUR_EMAIL_TO_RESET_PASSWORD")}</p>
      <ResetPasswordForm />
      <p className="pt-6">
        {t("REMEMBER_PASSWORD")}?{" "}
        <Link href={PAGE_LINKS.LOGIN}>{t("LOGIN")}</Link>
      </p>
    </div>
  );
};

export default ResetPasswordPage;
