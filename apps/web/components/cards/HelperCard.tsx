"use client";

import Image from "next/image";
import Link from "next/link";
import { getDistanceKm } from "@/utils/distance-in-km";

type Props = {
  id?: string;
  name: string;
  role: string;
  city: string;
  rating?: number;
  avatarSrc?: string;
  distance: {
    user: { lng?: number; lat?: number } | null;
    helper: { lng?: number; lat?: number } | null;
  };
};

export default function HelperCard({
  id = "1",
  name,
  role,
  city,
  rating = 4.8,
  avatarSrc = "/svg/undraw_agreement_ftet.svg",
  distance,
}: Props) {
  const getDistance = () => {
    if (!distance?.helper?.lat || !distance.helper.lng) return null;
    return getDistanceKm({
      user: {
        lat: distance?.user?.lat,
        long: distance?.user?.lng,
      },
      point: { lat: distance?.helper?.lat, long: distance?.helper?.lng },
    });
  };

  return (
    <Link href={`/helpers/${id}`} className="block">
      <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow p-3 flex gap-3 cursor-pointer">
        <div className="h-12 w-12 rounded-xl overflow-hidden bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
          <Image
            src={avatarSrc}
            alt={name}
            width={48}
            height={48}
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">
              {name}
            </p>
            <span className="inline-flex items-center gap-1 text-[12px] text-yellow-600 dark:text-yellow-500">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l3 7h7l-5.5 4 2.5 7-7-4.5L5.5 20 8 13 2 9h7z" />
              </svg>
              {rating.toFixed(1)}
            </span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {role}, {city}
          </p>
        </div>
        <div>
          {distance && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {getDistance()} away
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
