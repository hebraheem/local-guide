import BottomNav from "@/common/BottomNav";
import DashboardHeader from "@/common/DashboardHeader";
import SearchBar from "@/common/SearchBar";
import MapComponent from "@/map/MapComponent";
import React from "react";
import initTranslations from "@/lib/i18n/server";
import { getLocale } from "@/lib/i18n/detect";
import { getTheme } from "@/lib/theme/detect";

export default async function MapPage() {
  const { t } = await initTranslations();
  const locale = await getLocale();
  const theme = await getTheme();

  // Mock request data with geographical coordinates
  // In production, these would come from your database with actual geocoded locations
  const requests = [
    {
      id: 1,
      title: "Need help with German translation for legal documents",
      category: "Translation",
      location: "Mitte, Berlin",
      urgent: true,
      description: "I need someone to translate 3 pages of legal documents from English to German.",
      postedBy: "John Doe",
      position: { lat: 52.5200, lng: 13.4050 },
    },
    {
      id: 2,
      title: "Looking for city tour guide this weekend",
      category: "City Tours",
      location: "Prenzlauer Berg, Berlin",
      urgent: false,
      description: "I'm visiting Berlin this weekend and would love a local guide.",
      postedBy: "Maria Garcia",
      position: { lat: 52.5408, lng: 13.4133 },
    },
    {
      id: 3,
      title: "Study partner needed for Math exam",
      category: "Study Help",
      location: "Kreuzberg, Berlin",
      urgent: false,
      description: "Looking for someone to study with for upcoming calculus exam.",
      postedBy: "Alex Brown",
      position: { lat: 52.4995, lng: 13.4038 },
    },
    {
      id: 4,
      title: "Help moving furniture this Saturday",
      category: "Moving",
      location: "Charlottenburg, Berlin",
      urgent: true,
      description: "Need 2 people to help move furniture to new apartment.",
      postedBy: "Sarah Miller",
      position: { lat: 52.5163, lng: 13.2988 },
    },
    {
      id: 5,
      title: "Visa application document assistance",
      category: "Administrative",
      location: "Friedrichshain, Berlin",
      urgent: true,
      description: "Need help organizing documents for visa extension.",
      postedBy: "Anna Chen",
      position: { lat: 52.5145, lng: 13.4531 },
    },
    {
      id: 6,
      title: "Spanish language practice partner",
      category: "Language Exchange",
      location: "Tempelhof, Berlin",
      urgent: false,
      description: "Looking for native Spanish speaker for weekly conversation practice.",
      postedBy: "David Lee",
      position: { lat: 52.4729, lng: 13.3850 },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-20">
      {/* Header */}
      <DashboardHeader 
        userName="User"
        currentLocale={locale}
        currentTheme={theme}
      />

      {/* Main Content */}
      <main className="mx-auto w-full max-w-7xl px-4 py-4 space-y-4">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {t("MAP_TITLE")} 🗺️
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {requests.filter(r => r.urgent).length} urgent · {requests.length} total requests
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <SearchBar placeholder={t("MAP_SEARCH_PLACEHOLDER")} />

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
            Filter:
          </span>
          <button className="px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg">
            {t("MAP_FILTER_ALL")}
          </button>
          <button className="px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-500">
            {t("MAP_FILTER_URGENT")}
          </button>
          <button className="px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-500">
            {t("MAP_FILTER_NEARBY")}
          </button>
        </div>

        {/* Map Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 h-[500px] md:h-[600px] relative">
          <MapComponent requests={requests} />

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3 border border-gray-200 dark:border-gray-700">
              <h4 className="text-xs font-semibold text-gray-900 dark:text-white mb-2">Legend</h4>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500 border-2 border-white shadow-sm"></div>
                  <span className="text-xs text-gray-700 dark:text-gray-300">Urgent Request</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500 border-2 border-white shadow-sm"></div>
                  <span className="text-xs text-gray-700 dark:text-gray-300">Regular Request</span>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3 border border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {requests.length}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Active Requests
                </div>
              </div>
            </div>
          </div>

        {/* Info Card */}
        <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <div className="text-2xl">💡</div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1 text-sm">
                {t("TIP_TITLE")}
              </h4>
              <p className="text-xs text-gray-700 dark:text-gray-300">
                Click on any pin to see request details. Red pins indicate urgent requests that need immediate attention!
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
