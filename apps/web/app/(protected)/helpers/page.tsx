import BottomNav from "@/common/BottomNav";
import DashboardHeader from "@/common/DashboardHeader";
import SearchBar from "@/common/SearchBar";
import HelperCard from "@/cards/HelperCard";
import React from "react";
import initTranslations from "@/lib/i18n/server";
import { getLocale } from "@/lib/i18n/detect";
import { getTheme } from "@/lib/theme/detect";
import Link from "next/link";

export default async function HelpersPage() {
  const { t } = await initTranslations();
  const locale = await getLocale();
  const theme = await getTheme();

  // Mock helpers data - replace with real data
  const helpers = [
    { id: 1, name: "Sarah Johnson", role: "Translator", city: "Berlin", rating: 4.9, skills: ["English", "German", "Legal"] },
    { id: 2, name: "Michael Chen", role: "Tour Guide", city: "Munich", rating: 4.8, skills: ["City Tours", "History"] },
    { id: 3, name: "Anna Schmidt", role: "Study Helper", city: "Berlin", rating: 4.7, skills: ["Math", "Physics"] },
    { id: 4, name: "David Kumar", role: "Event Planner", city: "Hamburg", rating: 4.9, skills: ["Events", "Coordination"] },
    { id: 5, name: "Maria Garcia", role: "Language Tutor", city: "Frankfurt", rating: 4.8, skills: ["Spanish", "English"] },
    { id: 6, name: "John Smith", role: "Tech Support", city: "Berlin", rating: 4.6, skills: ["IT", "Software"] },
    { id: 7, name: "Lisa Mueller", role: "Administrative Help", city: "Cologne", rating: 4.9, skills: ["Documents", "Visa"] },
    { id: 8, name: "Ahmed Ali", role: "Moving Helper", city: "Stuttgart", rating: 4.7, skills: ["Moving", "Transport"] },
  ];

  const filters = [
    { key: "HELPERS_ALL", active: true },
    { key: "HELPERS_NEARBY", active: false },
    { key: "HELPERS_TOP_RATED", active: false },
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
      <main className="mx-auto max-w-4xl px-4 py-6 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t("HELPERS_TITLE")} ✨
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {helpers.length} helpers available in your area
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar placeholder={t("HELPERS_SEARCH_PLACEHOLDER")} />

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
            {t("HELPERS_FILTER")}:
          </span>
          {filters.map((filter) => (
            <button
              key={filter.key}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                filter.active
                  ? "bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-500"
              }`}
            >
              {t(filter.key)}
            </button>
          ))}
        </div>

        {/* Helpers List */}
        <div className="space-y-4">
          {helpers.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t("HELPERS_NO_RESULTS")}
              </h3>
            </div>
          ) : (
            helpers.map((helper) => (
              <Link
                key={helper.id}
                href={`/helpers/${helper.id}`}
                className="block group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all p-4 group-hover:scale-[1.02] duration-300">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="h-16 w-16 rounded-xl overflow-hidden bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-md">
                      {helper.name.charAt(0)}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {helper.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {helper.role}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-500 bg-yellow-50 dark:bg-yellow-900/30 px-2 py-1 rounded-lg">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l3 7h7l-5.5 4 2.5 7-7-4.5L5.5 20 8 13 2 9h7z"/>
                          </svg>
                          <span className="text-sm font-semibold">{helper.rating}</span>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-2 mb-3 text-sm text-gray-600 dark:text-gray-400">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                        {helper.city}
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {helper.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Arrow */}
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-gray-400 dark:text-gray-500 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors flex-shrink-0"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
