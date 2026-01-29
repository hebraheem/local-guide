"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const GoBack = ({ title }: { title: string }) => {
  const router = useRouter();
  const  t  = useTranslations();
  return (
    <div className="mx-auto max-w-4xl px-4 py-3 flex items-center gap-3">
      <button
        onClick={() => router.back()}
        className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-colors"
      >
        <span className="material-symbols-outlined">arrow_back</span>
      </button>
      <h1 className="font-semibold text-gray-900 dark:text-white">
        {t(title)}
      </h1>
    </div>
  );
};
export default GoBack;
