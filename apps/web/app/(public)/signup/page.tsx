import React from "react";
import Image from "next/image";
import Link from "next/link";

import welcome from "@/public/svg/undraw_welcome-cats_tw36.svg";
import { PAGE_LINKS } from "@/constant/page.links";
import initTranslations from "@/lib/i18n/server";
import SignUpForm from "@/(public)/signup/SignUpForm";

const SignupPage = async () => {
  const {t} = await initTranslations()
  return (
    <div
      className={`flex flex-col items-center h-[calc(100vh-var(--header-h))] px-4`}
    >
      <Image
        src={welcome}
        alt="login"
        width={200}
        loading="eager"
        className="py-5"
      />
      {/*<h1>{t("WELCOME")}</h1>*/}
      <p className="mb-6">{t("WE_ARE_HAPPY_TO_HAVE_YOU_ON_BOARD")}</p>
      <SignUpForm />

      <p className="pt-6">
        {t("ALREADY_HAVE_AN_ACCOUNT")}?{" "}
        <Link href={PAGE_LINKS.LOGIN}>{t("LOGIN")}</Link>
      </p>
    </div>
  );
};

export default SignupPage;
