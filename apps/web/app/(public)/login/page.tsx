import React from "react";
import initTranslations from "@/lib/i18n/server";
import LoginForm from "@/(public)/login/LoginForm";
import login from "../../../public/svg/undraw_login_weas.svg";
import Link from "next/link";
import { PAGE_LINKS } from "@/constant/page.links";
import Image from "next/image";

const LoginPage = async () => {
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
        className="py-5"
      />
      <h1>{t("WELCOME_BACK")}</h1>
      <p className="mb-6">{t("LOG_IN_TO_CONTINUE")}</p>
      <LoginForm />

      <p className="pt-6">
        {t("DONT_HAVE_AN_ACCOUNT")}?{" "}
        <Link href={PAGE_LINKS.SIGNUP}>{t("SIGN_UP")}</Link>
      </p>
    </div>
  );
};

export default LoginPage;
