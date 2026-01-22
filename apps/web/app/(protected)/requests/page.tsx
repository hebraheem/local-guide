import BottomNav from "@/common/BottomNav";
import DashboardHeader from "@/common/DashboardHeader";
import SearchBar from "@/common/SearchBar";
import RequestCard from "@/cards/RequestCard";
import React from "react";
import initTranslations from "@/lib/i18n/server";
import { getLocale } from "@/lib/i18n/detect";
import { getTheme } from "@/lib/theme/detect";
import Link from "next/link";

export default async function RequestsPage() {
  const { t } = await initTranslations();
  const locale = await getLocale();
  const theme = await getTheme();

  // Mock requests data - replace with real data
  const requests = [
    {
      id: 1,
      title: "Need help with German translation for legal documents",
      category: "Translation",
      location: "Berlin",
      postedBy: "John Doe",
      postedTime: "2h ago",
      urgent: true,
      description: "I need someone to translate 3 pages of legal documents from English to German.",
    },
    {
      id: 2,
      title: "Looking for city tour guide this weekend",
      category: "City Tours",
      location: "Munich",
      postedBy: "Maria Garcia",
      postedTime: "4h ago",
      urgent: false,
      description: "I'm visiting Munich this weekend and would love a local guide to show me around.",
    },
    {
      id: 3,
      title: "Study partner needed for Math exam preparation",
      category: "Study Help",
      location: "Berlin",
      postedBy: "Alex Brown",
      postedTime: "6h ago",
      urgent: false,
      description: "Looking for someone to study with for upcoming calculus exam.",
    },
    {
      id: 4,
      title: "Help moving furniture this Saturday",
      category: "Moving",
      location: "Frankfurt",
      postedBy: "Sarah Miller",
      postedTime: "8h ago",
      urgent: true,
      description: "Need 2 people to help move furniture to new apartment.",
    },
    {
      id: 5,
      title: "Spanish language practice conversation partner",
      category: "Language Exchange",
      location: "Hamburg",
      postedBy: "David Lee",
      postedTime: "1 day ago",
      urgent: false,
      description: "Looking for native Spanish speaker for weekly conversation practice.",
    },
    {
      id: 6,
      title: "Visa application document assistance needed",
      category: "Administrative",
      location: "Berlin",
      postedBy: "Anna Chen",
      postedTime: "1 day ago",
      urgent: true,
      description: "Need help organizing and reviewing documents for visa extension application.",
    },
  ];

  const filters = [
    { key: "REQUESTS_ALL", active: true },
    { key: "REQUESTS_URGENT", active: false },
    { key: "REQUESTS_OPEN", active: false },
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
            {t("REQUESTS_TITLE")} 🔔
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {requests.filter(r => r.urgent).length} urgent requests · {requests.length} total
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar placeholder={t("REQUESTS_SEARCH_PLACEHOLDER")} />

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
            {t("REQUESTS_FILTER")}:
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

        {/* Requests List */}
        <div className="space-y-4">
          {requests.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t("REQUESTS_NO_RESULTS")}
              </h3>
            </div>
          ) : (
            requests.map((request) => (
              <Link
                key={request.id}
                href={`/requests/${request.id}`}
                className="block group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all p-5 group-hover:scale-[1.01] duration-300">
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-2xl flex-shrink-0 shadow-md">
                      📝
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                          {request.title}
                        </h3>
                        {request.urgent && (
                          <span className="flex-shrink-0 px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold rounded-full">
                            URGENT
                          </span>
                        )}
                      </div>

                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="inline-flex items-center gap-1 text-xs text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-3 py-1 rounded-full font-medium">
                          {request.category}
                        </span>
                        <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                          </svg>
                          {request.location}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {request.postedTime}
                        </span>
                      </div>

                      {/* Description Preview */}
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                        {request.description}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          by {request.postedBy}
                        </span>
                        <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300 flex items-center gap-1">
                          {t("REQUESTS_VIEW_DETAILS")}
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Info Card */}
        <div className="p-4 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl border border-green-200 dark:border-green-800">
          <div className="flex items-start gap-3">
            <div className="text-3xl">💡</div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                {t("TIP_TITLE")}
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Respond quickly to urgent requests to build your reputation. Clear communication leads to successful collaborations!
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
