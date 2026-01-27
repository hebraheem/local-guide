import React, { Suspense } from "react";
import { ROOT_LAYOUT_HEADER_HEIGHT } from "@/constant/variables";
import ThemeSwitcher from "@/common/ThemeSwitcher";
import LanguageSwitcher from "@/common/LanguageSwitcher";
import { getLocale } from "@/lib/i18n/detect";
import { getTheme } from "@/lib/theme/detect";
import Link from "next/link";
import { getServerAuthUser } from "@/lib/jwt.server";
import { redirect, RedirectType } from "next/navigation";
import { PAGE_LINKS } from "@/constant/page.links";

const PublicLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const locale = await getLocale();
  const theme = await getTheme();
  const { isAuthenticated } = await getServerAuthUser();

  if (isAuthenticated) {
    redirect(PAGE_LINKS.DASHBOARD, RedirectType.push);
  }
  return (
    <Suspense>
      <div className="min-h-dvh bg-brand-bg text-brand-text dark:bg-brand-bg-dark dark:text-brand-text-dark">
        <header
          className={`sticky top-0 z-30 w-full border-b border-brand-border/60 bg-brand-card/80 dark:bg-brand-card-dark/40 backdrop-blur h-[${ROOT_LAYOUT_HEADER_HEIGHT}px]`}
        >
          <div className="mx-auto sm:max-w-3xl px-4 py-2 flex items-center justify-between">
            <div>
              <Link href="/" className="">
                <span className="text-xl md:text-2xl font-bold text-primary-600 dark:text-primary-400">
                  🌍 Local Guide
                </span>
              </Link>
            </div>
            <div>
              <ThemeSwitcher currentTheme={theme} />
              <LanguageSwitcher currentLocale={locale} />
            </div>
          </div>
        </header>
        <main>{children}</main>
      </div>
    </Suspense>
  );
};

export default PublicLayout;
