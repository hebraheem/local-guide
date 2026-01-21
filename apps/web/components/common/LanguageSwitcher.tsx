"use client";

import React, { useTransition, useState } from "react";
import useTranslation from "@/hooks/useTranslation";

type Props = {
  currentLocale: string;
};

const LanguageSwitcher =  ({ currentLocale }: Props) => {
  const [pending, startTransition] = useTransition();
  const [value, setValue] = useState(currentLocale);

  const { t } = useTranslation();

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lng = e.target.value;
    setValue(lng);
    startTransition(async () => {
      try {
        await fetch("/api/lang", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lng }),
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
    <label className="inline-flex items-center gap-2 text-sm">
      <span className="text-primary-800">{t("language")}:</span>
      <select
        value={value}
        onChange={onChange}
        disabled={pending}
        className="border rounded px-2 py-1"
      >
        <option value="en">English</option>
        <option value="de">Deutsch</option>
      </select>
    </label>
  );
};

export default LanguageSwitcher;
