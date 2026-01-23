import i18next, { type i18n as I18n, TFunction } from "i18next";

import en from "@/src/dictionaries/en.json";
import de from "@/src/dictionaries/de.json";
import fr from "@/src/dictionaries/fr.json";
import { getLocale } from "@/lib/i18n/detect";

type InitResult = {
  i18n: I18n;
  t: TFunction<"translation", undefined>,
  locale: string;
};

const resources = {
  en: { translation: en },
  de: { translation: de },
  fr: { translation: fr },
};

const fallbackLng = "en" as const;

export async function initTranslations(locale?: string): Promise<InitResult> {
 const currentLocale = await getLocale()
  const lng = (
    locale && resources[locale as keyof typeof resources]
      ? locale
      : currentLocale ?? fallbackLng
  ) as keyof typeof resources;

  const i18n = i18next.createInstance();

  await i18n
    .init({
    lng: lng,
    fallbackLng,
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

  const t = i18n.getFixedT(lng);

  return { i18n, t, locale: lng };
}

export default initTranslations;
