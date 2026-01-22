import React from 'react'
import BottomNav from "@/common/BottomNav";
import DashboardHeader from "@/common/DashboardHeader";
import SearchBar from "@/common/SearchBar";
import ActionButton from "@/ui/ActionButton";
import HelperCard from "@/cards/HelperCard";
import RequestCard from "@/cards/RequestCard";
import initTranslations from "@/lib/i18n/server";
import { getLocale } from "@/lib/i18n/detect";
import { getTheme } from "@/lib/theme/detect";
import Link from "next/link";

const Dashboard = async () => {
  const { t } = await initTranslations();
  const locale = await getLocale();
  const theme = await getTheme();

  // Mock data - replace with real data from your API
  const mockHelpers = [
    { name: "Sarah Johnson", role: "Translator", city: "Berlin", rating: 4.9 },
    { name: "Michael Chen", role: "Tour Guide", city: "Munich", rating: 4.8 },
    { name: "Anna Schmidt", role: "Study Helper", city: "Berlin", rating: 4.7 },
    { name: "David Kumar", role: "Event Planner", city: "Hamburg", rating: 4.9 },
  ];

  const mockRequests = [
    {
      title: "Need help with German translation for legal documents",
      category: "Translation",
      location: "Berlin",
      postedBy: "John Doe",
      postedTime: "2h ago",
      urgent: true,
    },
    {
      title: "Looking for city tour guide this weekend",
      category: "City Tours",
      location: "Munich",
      postedBy: "Maria Garcia",
      postedTime: "4h ago",
      urgent: false,
    },
    {
      title: "Study partner needed for Math exam preparation",
      category: "Study Help",
      location: "Berlin",
      postedBy: "Alex Brown",
      postedTime: "6h ago",
      urgent: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-20">
      {/* Header */}
      <DashboardHeader 
        userName="Guest User" 
        currentLocale={locale}
        currentTheme={theme}
      />

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {t("DASHBOARD_WELCOME")}! 👋
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t("DASHBOARD_FOR_YOU")}
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full">
          <SearchBar placeholder={t("DASHBOARD_SEARCH_PLACEHOLDER")} />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          <ActionButton
            icon={
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            }
            label={t("DASHBOARD_POST_REQUEST")}
            href="/post"
            variant="primary"
          />
          <ActionButton
            icon={
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            }
            label={t("DASHBOARD_MY_REQUESTS")}
            href="/my-requests"
            variant="secondary"
          />
          <ActionButton
            icon={
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 6l7-3 7 3 7-3v15l-7 3-7-3-7 3z" />
                <path d="M8 3v15" />
                <path d="M16 6v15" />
              </svg>
            }
            label={t("DASHBOARD_MAP_VIEW")}
            href="/map"
            variant="tertiary"
          />
        </div>

        {/* Recommended Helpers Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("DASHBOARD_RECOMMENDED_HELPERS")}
            </h3>
            <Link 
              href="/helpers"
              className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              {t("DASHBOARD_VIEW_ALL")} →
            </Link>
          </div>
          
          <div className="grid gap-3">
            {mockHelpers.map((helper, index) => (
              <HelperCard
                key={index}
                name={helper.name}
                role={helper.role}
                city={helper.city}
                rating={helper.rating}
              />
            ))}
          </div>
        </section>

        {/* Open Requests Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("DASHBOARD_OPEN_REQUESTS")}
            </h3>
            <Link 
              href="/requests"
              className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              {t("DASHBOARD_VIEW_ALL")} →
            </Link>
          </div>
          
          <div className="grid gap-3">
            {mockRequests.map((request, index) => (
              <RequestCard
                key={index}
                title={request.title}
                category={request.category}
                location={request.location}
                postedBy={request.postedBy}
                postedTime={request.postedTime}
                urgent={request.urgent}
              />
            ))}
          </div>
        </section>

        {/* Info Card */}
        <div className="mt-8 p-6 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-2xl border border-primary-200 dark:border-primary-800">
          <div className="flex items-start gap-4">
            <div className="text-4xl">💡</div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                {t("TIP_TITLE")}
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {t("TIP_DASHBOARD")}
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

export default Dashboard
