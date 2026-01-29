import React from "react";
import { ROOT_LAYOUT_HEADER_HEIGHT } from "@/constant/variables";
import ThemeSwitcher from "@/common/ThemeSwitcher";
import LanguageSwitcher from "@/common/LanguageSwitcher";
import Link from "next/link";
import { getServerAuthUser } from "@/lib/jwt.server";
import { redirect, RedirectType } from "next/navigation";
import { PAGE_LINKS } from "@/constant/page.links";

const PublicLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isAuthenticated } = await getServerAuthUser();

  if (isAuthenticated) {
    redirect(PAGE_LINKS.DASHBOARD, RedirectType.push);
  }
  return (
    <div className="min-h-dvh bg-brand-bg text-brand-text dark:text-brand-text-dark">
      <header
        className={`sticky py-3 top-0 z-50 w-full bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 backdrop-blur-md border-b border-gray-200 dark:border-gray-800  h-[${ROOT_LAYOUT_HEADER_HEIGHT}px]`}
      >
        <div className="mx-auto sm:max-w-3xl px-4 py-2 flex items-center justify-between">
          <div>
            <Link href="/apps/web/public" className="">
              <span className="text-xl md:text-2xl font-bold text-primary-600 dark:text-primary-400">
                🌍 Local Guide
              </span>
            </Link>
          </div>
          <div>
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default PublicLayout;
