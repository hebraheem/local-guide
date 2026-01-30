import React, { Suspense } from "react";
import { PAGE_LINKS } from "@/constant/page.links";
import { redirect, RedirectType } from "next/navigation";
import { Metadata } from "next";
import { cookies } from "next/headers";
import LocationTracker from "@/common/LocationTracker";
import BottomNav from "@/common/BottomNav";
import { getServerAuthUser } from "@/lib/jwt.server";

export const metadata: Metadata = {
  title: "Welcome to Your Local Guide",
  description: "Connect people who need help with those willing to help them",
};

const PrivateLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  await cookies();

  const { isAuthenticated } = await getServerAuthUser();

  if (!isAuthenticated) {
   redirect(PAGE_LINKS.LOGIN, RedirectType.push);
  }

  return (
    <Suspense fallback="Loading...">
      <div className="min-h-dvh bg-brand-bg text-brand-text dark:bg-brand-bg-dark dark:text-brand-text-dark">
        <main>{children}</main>
      </div>
      <LocationTracker
        autoStart
        updateInterval={60 * 60 * 2 * 1000}
        showUI={true}
      />
      <BottomNav />
    </Suspense>
  );
};

export default PrivateLayout;
