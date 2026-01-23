import { headers, cookies } from "next/headers";

export const SUPPORTED_LOCALES = ["en", "de", "fr"] as const;
export type SupportedLocale = typeof SUPPORTED_LOCALES[number];

const FALLBACK_LOCALE: SupportedLocale = "en";

function parseAcceptLanguage(acceptLanguage: string | null): string[] {
  if (!acceptLanguage) return [];
  return acceptLanguage
    .split(",")
    .map((part) => {
      const [rawTag, qPart] = part.trim().split(";");
      const tag = (rawTag || "").toLowerCase();
      const q = qPart?.startsWith("q=") ? Number(qPart.slice(2)) : 1;
      return { tag, q };
    })
    .filter(({ tag }) => !!tag)
    .sort((a, b) => b.q - a.q)
    .map(({ tag }) => tag);
}

function matchSupported(preferred: string[]): SupportedLocale | null {
  for (const tag of preferred) {
    // Try full match first (e.g., de-DE)
    const direct = SUPPORTED_LOCALES.find((l) => l === tag);
    if (direct) return direct;
    // Then try base language (e.g., de)
    const base = tag.split("-")[0];
    const baseMatch = SUPPORTED_LOCALES.find((l) => l === base);
    if (baseMatch) return baseMatch;
  }
  return null;
}

export async function getLocale(): Promise<SupportedLocale> {
  // 1) Cookie wins
  const cookieStore = await cookies();
  const cookieLng = cookieStore.get("lng")?.value;
  if (cookieLng && SUPPORTED_LOCALES.includes(cookieLng as SupportedLocale)) {
    return cookieLng as SupportedLocale;
  }

  // 2) Accept-Language header
  const hdrs = await headers();
  const accept = hdrs.get("accept-language");
  const preferred = parseAcceptLanguage(accept);
  const matched = matchSupported(preferred);
  if (matched) return matched;

  // 3) Fallback
  return FALLBACK_LOCALE;
}

export const fallbackLocale = FALLBACK_LOCALE;
