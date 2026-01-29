"use client";

import React from "react";
import Link from "next/link";
import { PAGE_LINKS } from "@/constant/page.links";
import { Button } from "@/ui/button";
import { useTranslations } from "next-intl";

const ActionButtons = () => {
  const  t  = useTranslations();
  return (
    <div className="flex flex-row gap-8 mt-6">
      <Button appName="Sign Up" mode="secondary" className="w-32">
        <Link href={PAGE_LINKS.SIGNUP}>{t("SIGN_UP")}</Link>
      </Button>
      <Button appName="Sign" mode="primary" className="w-32">
        <Link href={PAGE_LINKS.LOGIN}>{t("LOGIN")}</Link>
      </Button>
    </div>
  );
};
export default ActionButtons;
