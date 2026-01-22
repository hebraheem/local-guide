import React from "react";
import type { Metadata } from "next";
// import { ROOT_LAYOUT_HEADER_HEIGHT } from "@/constant/variables";
// import ThemeSwitcher from "@/common/ThemeSwitcher";
// import LanguageSwitcher from "@/common/LanguageSwitcher";

export const metadata: Metadata = {
  title: "Welcome to Your Local Guide",
  description: "Connect people who need help with those willing to help them",
};

const PrivateLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-dvh bg-brand-bg text-brand-text dark:bg-brand-bg-dark dark:text-brand-text-dark">
      {/*<header*/}
      {/*  className={`sticky top-0 z-30 w-full border-b border-brand-border/60 bg-brand-card/80 dark:bg-brand-card-dark/40 backdrop-blur h-[${ROOT_LAYOUT_HEADER_HEIGHT}px]`}*/}
      {/*>*/}
      {/*  <div className="mx-auto sm:max-w-3xl px-4 py-2 flex items-center justify-end gap-4">*/}
      {/*    <ThemeSwitcher currentTheme={theme} />*/}
      {/*    <LanguageSwitcher currentLocale={locale} />*/}
      {/*  </div>*/}
      {/*</header>*/}
      <main>{children}</main>
    </div>
  );
};

export default PrivateLayout;
