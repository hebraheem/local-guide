import DashboardHeader from "@/common/DashboardHeader";
import React from "react";
import { getLocale } from "@/lib/i18n/detect";
import { getTheme } from "@/lib/theme/detect";
import Helpers from "@/(protected)/helpers/component/Helpers";
import { getQueryClient } from "@/providers/query-client";
import { userService } from "@/services";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function HelpersPage() {
  const locale = await getLocale();
  const theme = await getTheme();

  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["users", {  role: "HELPER" }],
    queryFn: ({ pageParam = 1 }) =>
      userService.getAll({ page: pageParam, role: "HELPER" }),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-20">
        {/* Header */}
        <DashboardHeader
          userName="User"
          currentLocale={locale}
          currentTheme={theme}
        />

        <Helpers />

      </div>
    </HydrationBoundary>
  );
}
