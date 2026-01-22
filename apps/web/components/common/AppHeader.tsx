import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { getLocale } from "@/src/lib/i18n/detect";
import React from "react";

type IconButton = {
  label: string;
  href?: string;
  onClick?: never; // server component: no click handler here
  svg: React.ReactNode;
};

type Props = {
  title: string;
  backHref: string;
  leftIcon: React.ReactNode;
  rightIcons: IconButton[];
  showLanguage: boolean;
};

// Server component header so it can include SSR LanguageSwitcher currentLocale prop from cookies
export default async function AppHeader({
  title = "HelferIn",
  backHref,
  leftIcon,
  rightIcons = [],
  showLanguage = false,
}: Partial<Props>) {
  const locale = await getLocale();

  return (
    <header className="sticky top-0 z-30 bg-primary-600 text-white shadow">
      <div className="mx-auto max-w-3xl px-4 py-3 flex items-center gap-3">
        {backHref ? (
          <Link
            href={backHref}
            aria-label="Back"
            className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/15"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </Link>
        ) : (
          <span className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center">
            {leftIcon ?? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12l9-9 9 9" />
                <path d="M9 21V9h6v12" />
              </svg>
            )}
          </span>
        )}

        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-yellow-300 text-primary-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path d="M12 2l3 7h7l-5.5 4 2.5 7-7-4.5L5.5 20 8 13 2 9h7z" />
            </svg>
          </span>
          <h1 className="font-semibold text-white text-base">{title}</h1>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {showLanguage && <LanguageSwitcher currentLocale={locale} />}
          {rightIcons?.map((it, idx) =>
            it.href ? (
              <Link
                key={idx}
                href={it.href}
                aria-label={it.label}
                className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/15"
              >
                {it.svg}
              </Link>
            ) : (
              <span
                key={idx}
                className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center"
                aria-label={it.label}
              >
                {it.svg}
              </span>
            )
          )}
        </div>
      </div>
    </header>
  );
}
