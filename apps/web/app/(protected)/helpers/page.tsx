import BottomNav from "@/common/BottomNav";
import DashboardHeader from "@/common/DashboardHeader";
import React, { Suspense } from "react";
import { getLocale } from "@/lib/i18n/detect";
import { getTheme } from "@/lib/theme/detect";
import Loading from "@/loading";
import Helpers from "@/(protected)/helpers/component/Helpers";

export default async function HelpersPage() {
  const locale = await getLocale();
  const theme = await getTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-20">
      {/* Header */}
      <DashboardHeader
        userName="User"
        currentLocale={locale}
        currentTheme={theme}
      />
      <Suspense fallback={<Loading />}>
        <Helpers />
      </Suspense>
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
