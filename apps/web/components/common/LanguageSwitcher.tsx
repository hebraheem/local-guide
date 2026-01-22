"use client";

import React, { useState, startTransition } from "react";

type Props = {
  currentLocale: string;
};

const LanguageSwitcher = ({ currentLocale }: Props) => {
  const [value, setValue] = useState(currentLocale);

  const onChange = (value: "en" | "de") => {
    console.log("value", value);

    setValue(value);
    startTransition(async () => {
      try {
        await fetch("/api/lang", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lng:value }),
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
    <>
      <button
        type="button"
        onClick={() => onChange("en")}
        className={`${value === "en" && "hidden"} hover:underline`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => onChange("de")}
        className={`${value === "de" && "hidden"} hover:underline`}
      >
        DE
      </button>
    </>
  );
};

export default LanguageSwitcher;
