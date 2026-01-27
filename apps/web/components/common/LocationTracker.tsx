"use client";

import { useState } from "react";
import { useLocationTracker } from "@/hooks/useLocationTracker";
import useTranslation from "@/hooks/useTranslation";

interface LocationTrackerProps {
  autoStart?: boolean;
  updateInterval?: number;
  showUI?: boolean;
}

export default function LocationTracker({
  autoStart = false,
  updateInterval = 30000,
  showUI = true,
}: LocationTrackerProps) {
  const { t } = useTranslation();
  const [enabled, setEnabled] = useState(autoStart);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const { location, isTracking, error, startTracking, stopTracking } =
    useLocationTracker({
      enabled,
      updateInterval,
      onLocationUpdate: (loc) => {
        setLastUpdate(new Date(loc.timestamp));
      },
      onError: (err) => {
        console.error("Location error:", err);
      },
    });

  const handleToggle = () => {
    if (enabled) {
      stopTracking();
      setEnabled(false);
    } else {
      startTracking();
      setEnabled(true);
    }
  };

  const formatLastUpdate = () => {
    if (!lastUpdate) return t("NEVER");
    const now = new Date();
    const diff = Math.floor((now.getTime() - lastUpdate.getTime()) / 1000);

    if (diff < 60) return `${diff}${t("SECONDS_AGO")}`;
    if (diff < 3600) return `${Math.floor(diff / 60)}${t("MINUTES_AGO")}`;
    return `${Math.floor(diff / 3600)}${t("HOURS_AGO")}`;
  };

  const getErrorMessage = (errorMsg: string) => {
    if (errorMsg.includes("denied")) return t("LOCATION_PERMISSION_DENIED");
    if (errorMsg.includes("unavailable")) return t("LOCATION_UNAVAILABLE");
    if (errorMsg.includes("timeout")) return t("LOCATION_TIMEOUT");
    return errorMsg;
  };

  if (!showUI) {
    return null;
  }

  return (
    <div className="fixed bottom-24 right-4 z-50">
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className={`group relative h-14 w-14 rounded-full shadow-xl transition-all duration-300 hover:scale-110 ${
            isTracking
              ? "bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              : "bg-gradient-to-br from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700"
          }`}
          title={t("LOCATION_TRACKING")}
        >
          {isTracking && (
            <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75" />
          )}

          <div className="relative flex items-center justify-center h-full w-full text-white">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>

          <span className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-gray-900 dark:bg-gray-100 px-3 py-2 text-xs font-medium text-white dark:text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none">
            {isTracking ? t("LOCATION_TRACKING_ACTIVE") : t("START_TRACKING")}
          </span>
        </button>
      )}

      {isExpanded && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 min-w-[320px] max-w-[380px]">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div
                className={`h-3 w-3 rounded-full ${
                  isTracking
                    ? "bg-green-500 animate-pulse"
                    : "bg-gray-400 dark:bg-gray-600"
                }`}
              />
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                {t("LOCATION_TRACKING")}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsExpanded(false)}
                className="h-9 w-9 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center justify-center transition-all border border-gray-200 dark:border-gray-600"
                title={t("MINIMIZE")}
              >
                <span className="material-symbols-outlined text-gray-700 dark:text-gray-300">
                  cancel
                </span>
              </button>
            </div>
          </div>

          <div className="p-4 space-y-4">
            {!enabled && (
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="w-full flex items-start gap-2 text-left "
                >
                  <svg
                    className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="flex-1">
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                      {t("LOCATION_TRACKING_INFO")}
                    </p>
                    {showInfo && (
                      <div className="mt-3 space-y-2 text-xs text-blue-700 dark:text-blue-300">
                        <div>
                          <p className="font-semibold">
                            {t("LOCATION_TRACKING_WHY")}
                          </p>
                          <p className="mt-1">
                            {t("LOCATION_TRACKING_WHY_DESC")}
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold">
                            {t("LOCATION_TRACKING_PRIVACY")}
                          </p>
                          <p className="mt-1">
                            {t("LOCATION_TRACKING_PRIVACY_DESC")}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <svg
                    className={`h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0 transition-transform ${
                      showInfo ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            )}

            <button
              onClick={handleToggle}
              className={`w-full px-4 py-3 rounded-xl font-medium transition-all shadow-md hover:shadow-lg ${
                enabled
                  ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                  : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
              }`}
            >
              {enabled
                ? `⏸️ ${t("STOP_TRACKING")}`
                : `▶️ ${t("START_TRACKING")}`}
            </button>

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-start gap-2">
                  <svg
                    className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-xs text-red-600 dark:text-red-400 flex-1">
                    {getErrorMessage(error)}
                  </p>
                </div>
              </div>
            )}

            {location && (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <div className="text-gray-500 dark:text-gray-400 mb-1">
                      {t("LATITUDE")}
                    </div>
                    <div className="font-mono text-gray-900 dark:text-white font-medium">
                      {location.latitude.toFixed(6)}
                    </div>
                  </div>
                  <div className="p-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <div className="text-gray-500 dark:text-gray-400 mb-1">
                      {t("LONGITUDE")}
                    </div>
                    <div className="font-mono text-gray-900 dark:text-white font-medium">
                      {location.longitude.toFixed(6)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs p-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <span className="text-gray-500 dark:text-gray-400">
                    {t("ACCURACY")}:
                  </span>
                  <span className="font-mono text-gray-900 dark:text-white font-medium">
                    ±{Math.round(location.accuracy)}m
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs p-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <span className="text-gray-500 dark:text-gray-400">
                    {t("LAST_UPDATE")}:
                  </span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {formatLastUpdate()}
                  </span>
                </div>
              </div>
            )}

            {!location && !error && enabled && (
              <div className="text-center py-4">
                <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <svg
                    className="animate-spin h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  {t("GETTING_LOCATION")}
                </div>
              </div>
            )}

            {!enabled && !error && (
              <div className="text-center py-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t("LOCATION_TRACKING_DISABLED")}
                </p>
              </div>
            )}

            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  {t("UPDATES_EVERY")}{" "}
                  {Math.floor(updateInterval / (60 * 60 * 1000))} {t("MINUTES")}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
