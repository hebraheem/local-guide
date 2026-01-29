"use client";

import { useTranslations } from "next-intl";

export default function useTranslation() {
  const t = useTranslations();
  return { t };
}

// Also provide a named export for convenience/symmetry
export { default as useTranslation } from "./useTranslation";
