"use client";

import React from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter as userLocaleRouter } from "next/navigation";

const supportedLanguages = ["en", "de", "fr"] as const;

const LanguageSwitcher = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const localeRouter = userLocaleRouter();

  const onChange = (value: "en" | "de" | "fr") => {
    const segments = pathname.split("/");
    segments[1] = value; // replace locale
    localeRouter.push(segments.join("/"));
  };

  return (
    <span className="ml-3">
      {supportedLanguages.map((lang) => {
        return (
          <span
            role="button"
            key={lang}
            onClick={() => onChange(lang)}
            className={`${locale === lang ? "hidden" : "hover:underline"} text-primary-950 dark:text-primary-200 uppercase font-semi-bold pr-2 cursor-pointer`}
          >
            {lang}
          </span>
        );
      })}
    </span>
  );
};

export default LanguageSwitcher;
