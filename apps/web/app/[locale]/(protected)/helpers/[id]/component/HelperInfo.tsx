"use client";

import React from "react";
import { User } from "@/types/user";
import { getDistanceKm } from "@/utils/distance-in-km";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

const HelperInfo = ({ helper }: { helper: User }) => {
  const searchParams = useSearchParams();
  const t = useTranslations()
  const lat = parseFloat(searchParams.get("lat")!);
  const long = parseFloat(searchParams.get("long")!);

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          {helper?.profile?.firstName ?? ""} {helper?.profile?.lastName ?? ""}{" "}
          ({getDistanceKm({ user: {}, point: { lat, long } })} {t('AWAY')})
        </h1>
      </div>
    </div>
  );
};
export default HelperInfo;
