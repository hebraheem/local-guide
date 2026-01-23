"use client";

import React, { useState, startTransition } from "react";

type Props = {
  currentLocale: string;
};

const LanguageSwitcher = ({ currentLocale }: Props) => {
  const [value, setValue] = useState(currentLocale);
  const supportedLanguages = ["en", "de", "fr"] as const;
  const onChange = (value: "en" | "de" | "fr") => {
    setValue(value);
    startTransition(async () => {
      try {
        await fetch("/api/lang", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lng: value }),
          cache: "no-store",
        });
        // Reload to re-render server components with the new cookie
        window.location.reload();
      } catch (e) {
        console.error("Failed to switch language", e);
      }
    });
  };

  return (
    <span className="ml-3">
      {supportedLanguages.map((lang) => {
        return (
          <span
            role="button"
            key={lang}
            onClick={() => onChange(lang)}
            className={`${value === lang ? "hidden" : "hover:underline"} text-primary-950 dark:text-primary-200 uppercase font-semi-bold pr-2 cursor-pointer`}
          >
            {lang}
          </span>
        );
      })}
    </span>
  );
};

export default LanguageSwitcher;
