"use client";

import {
  useTranslation as useRIT,
  type UseTranslationOptions,
  type UseTranslationResponse,
} from "react-i18next";
import ensureClientI18n from "@/lib/i18n/client";

/**
 * Tiny helper to read the current <HTML lang> set by SSR
 */
function getHtmlLang(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const lang = document.documentElement.getAttribute("lang");
  return lang || undefined;
}

type ExtraOptions = {
  // Optional explicit locale override for initialization; defaults to <HTML lang>
  locale?: string;
};

// Drop-in replacement for react-i18next's useTranslation
// It ensures client i18n is initialized automatically (once) with SSR-provided locale.
export default function useTranslation<Ns extends string = "translation">(
  ns?: Ns | Ns[],
  options?: UseTranslationOptions<Ns> & ExtraOptions,
): UseTranslationResponse<Ns, unknown> {
  ensureClientI18n({ locale: getHtmlLang() });

  // Avoid passing our custom option down to react-i18next
  const { locale: _omit, ...rest } = (options || {}) as Record<string, unknown>;
  return useRIT(ns as Ns | Ns[], rest);
}

// Also provide a named export for convenience/symmetry
export { default as useTranslation } from "./useTranslation";
