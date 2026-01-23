"use client";

import i18next, { type i18n as I18n } from "i18next";
import { initReactI18next } from "react-i18next";

import en from "@/src/dictionaries/en.json";
import de from "@/src/dictionaries/de.json";
import fr from "@/src/dictionaries/fr.json";

 const resources = {
  en: { translation: en },
  de: { translation: de },
  fr: { translation: fr },
};

const fallbackLng = "en" as const;

let initialized = false;

export type ClientI18nInitOptions = {
  locale?: string | null | undefined;
};

/**
 * Ensure the global i18next instance is initialized on the client.
 * Call early (e.g., at the top of a client component) before using useTranslation().
 */
export function ensureClientI18n(opts?: ClientI18nInitOptions): I18n {
  const desired = (opts?.locale && resources[opts.locale as keyof typeof resources]
    ? (opts!.locale as keyof typeof resources)
    : fallbackLng) as keyof typeof resources;

  // Only initialize once per browser session; later calls can change language.
  if (!initialized) {
    i18next
      .use(initReactI18next)
      .init({
        lng: desired,
        fallbackLng,
        resources,
        interpolation: { escapeValue: false },
        // react-i18next options
        react: { useSuspense: true },
      });
    initialized = true;
  } else if (i18next.language !== desired) {
    i18next.changeLanguage(desired);
  }

  return i18next;
}

export default ensureClientI18n;
