"use client";

import React from "react";
import useTranslation from "@/hooks/useTranslation";
import Link from "next/link";
import { PAGE_LINKS } from "@/constant/page.links";
import { usePathname } from "next/navigation";

const BottomNav = () => {
  const { t } = useTranslation();
  const pathname = usePathname();

  const Item = ({
    label,
    icon,
    href,
  }: {
    label: string;
    icon: React.ReactNode;
    href: string;
  }) => {
    const isActive = pathname.includes(href);
    let spanClassName =
      "h-10 w-10 rounded-xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300";
    let labelClassName = "text-gray-700 dark:text-gray-300";

    if (isActive) {
      spanClassName +=
        " border-secondary-800 border-2 text-secondary-800 dark:text-secondary-800 dark:border-secondary-800";
      labelClassName = " text-secondary-800 dark:text-secondary-800";
    } else {
      spanClassName += " border-0";
    }

    return (
      <Link
        href={href}
        className="flex flex-col items-center justify-center gap-1 font-medium text-xs"
      >
        <span className={spanClassName}>{icon}</span>
        <span className={labelClassName}>{t(label)}</span>
      </Link>
    );
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg">
      <div className="mx-auto sm:max-w-3xl px-4 py-2 grid grid-cols-5 gap-2">
        <Item
          label="HOME"
          href={PAGE_LINKS.DASHBOARD}
          icon={
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
          }
        />
        <Item
          label="MAP"
          href={PAGE_LINKS.MAP}
          icon={
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
              <path d="M1 6l7-3 7 3 7-3v15l-7 3-7-3-7 3z" />
              <path d="M8 3v15" />
              <path d="M16 6v15" />
            </svg>
          }
        />
        <div className="flex items-center justify-center">
          <Link
            href={PAGE_LINKS.POST}
            aria-label="ADD"
            className="h-14 w-14 -mt-6 rounded-full bg-gradient-to-br from-secondary-500 to-secondary-600 dark:from-secondary-600 dark:to-secondary-700 text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all transform hover:scale-105"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </Link>
        </div>
        <Item
          label="CHAT"
          href={PAGE_LINKS.CHAT}
          icon={
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
              <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V5a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
            </svg>
          }
        />
        <Item
          label="PROFILE"
          href="/profile"
          icon={
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
              <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          }
        />
      </div>
    </nav>
  );
};

export default BottomNav;
