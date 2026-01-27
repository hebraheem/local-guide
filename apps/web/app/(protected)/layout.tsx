import React, { Suspense, use } from "react";
import { getServerAuthUser } from "@/lib/jwt.server";
import { PAGE_LINKS } from "@/constant/page.links";
import { redirect, RedirectType } from "next/navigation";
import { Metadata } from "next";
import { cookies } from "next/headers";


export const metadata: Metadata = {
  title: "Welcome to Your Local Guide",
  description: "Connect people who need help with those willing to help them",
};

const PrivateLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  use(cookies());

  const { isAuthenticated } = use(getServerAuthUser());

  if (!isAuthenticated) {
    redirect(PAGE_LINKS.LOGIN, RedirectType.push);
  }

  return (
    <Suspense>
      <div className="min-h-dvh bg-brand-bg text-brand-text dark:bg-brand-bg-dark dark:text-brand-text-dark">
        <main>{children}</main>
      </div>
    </Suspense>
  );
};

export default PrivateLayout;
