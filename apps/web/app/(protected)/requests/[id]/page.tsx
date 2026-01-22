import React from "react";
import initTranslations from "@/lib/i18n/server";
import Link from "next/link";
import BottomNav from "@/common/BottomNav";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function RequestDetailPage({ params }: Props) {
  const { t } = await initTranslations();
  const { id } = await params;

  // Mock request data - replace with real data
  const request = {
    id,
    title: "Need help with German translation for legal documents",
    category: "Translation",
    location: "Berlin, Mitte",
    postedBy: {
      name: "John Doe",
      username: "@johndoe",
      rating: 4.6,
      avatar: "J",
    },
    postedDate: "January 22, 2026",
    postedTime: "2 hours ago",
    urgent: true,
    status: "Open",
    description: "I recently received some legal documents from my employer regarding my work contract extension. The documents are in German and I need them translated to English to fully understand all the terms and conditions. The translation needs to be accurate as it involves legal terminology.",
    requirements: [
      "Native or fluent German speaker",
      "Experience with legal document translation",
      "Available within the next 2 days",
      "Can provide certified translation if needed",
    ],
    budget: "€50-80",
    deadline: "January 24, 2026",
    responses: 5,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-20">
      {/* Header with Back Button */}
      <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="mx-auto max-w-4xl px-4 py-3 flex items-center gap-3">
          <Link
            href="/requests"
            className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </Link>
          <h1 className="font-semibold text-gray-900 dark:text-white">
            {t("REQUEST_DETAILS")}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-6 space-y-6">
        {/* Request Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          {/* Title and Urgent Badge */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {request.title}
            </h1>
            {request.urgent && (
              <span className="flex-shrink-0 px-3 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold rounded-full animate-pulse">
                🚨 URGENT
              </span>
            )}
          </div>

          {/* Meta Information */}
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-sm font-medium">
              📂 {request.category}
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {request.location}
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
              ✓ {request.status}
            </span>
          </div>

          {/* Posted By */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold text-lg">
                {request.postedBy.avatar}
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {request.postedBy.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {request.postedBy.username} · ⭐ {request.postedBy.rating}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 dark:text-gray-400">{t("REQUEST_DATE")}</p>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{request.postedTime}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">📝</span>
            {t("REQUEST_DESCRIPTION")}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {request.description}
          </p>
        </div>

        {/* Requirements */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">✅</span>
            {t("REQUEST_REQUIREMENTS")}
          </h2>
          <ul className="space-y-3">
            {request.requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 text-sm font-bold">
                  ✓
                </span>
                {req}
              </li>
            ))}
          </ul>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">💰</span>
              <h3 className="font-bold text-gray-900 dark:text-white">Budget</h3>
            </div>
            <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {request.budget}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">⏰</span>
              <h3 className="font-bold text-gray-900 dark:text-white">Deadline</h3>
            </div>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              {request.deadline}
            </p>
          </div>
        </div>

        {/* Responses */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200 dark:border-blue-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">👥</span>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">
                {request.responses} helpers have responded
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Join them and offer your help!
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={`/requests/${request.id}/respond`}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-center"
          >
            {t("REQUEST_RESPOND_NOW")}
          </Link>
          <Link
            href={`/chat/new?request=${request.id}`}
            className="flex-1 px-6 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-400 transition-all text-center"
          >
            {t("REQUEST_MESSAGE_REQUESTER")}
          </Link>
        </div>

        {/* Safety Info */}
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-start gap-3">
            <div className="text-2xl">⚠️</div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                Safety Reminder
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Always verify details before meeting. Keep communication on the platform until trust is established. Report any suspicious activity.
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
