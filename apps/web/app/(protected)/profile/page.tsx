import BottomNav from "@/common/BottomNav";
import DashboardHeader from "@/common/DashboardHeader";
import React from "react";
import initTranslations from "@/lib/i18n/server";
import { getLocale } from "@/lib/i18n/detect";
import { getTheme } from "@/lib/theme/detect";
import Image from "next/image";

export default async function ProfilePage() {
  const { t } = await initTranslations();
  const locale = await getLocale();
  const theme = await getTheme();

  // Mock data - replace with real user data
  const user = {
    name: "Mark Schneider",
    username: "@markschneider",
    role: "Helper & Requester",
    location: "Berlin, Germany",
    memberSince: "January 2024",
    rating: 4.8,
    totalReviews: 47,
    completedRequests: 52,
    activeRequests: 3,
    bio: "Friendly and reliable helper with experience in translations, city tours, and administrative support. I love meeting new people and helping them settle into Berlin!",
    languages: ["English", "Deutsch", "Español"],
    skills: ["Translation", "City Tours", "Study Help", "Administrative Tasks"],
  };

  const recentReviews = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "Mark was incredibly helpful with my German translation. Highly recommended!",
      date: "2 days ago",
    },
    {
      name: "Anna Schmidt",
      rating: 5,
      comment: "Best city tour ever! Mark showed me places I wouldn't have found on my own.",
      date: "1 week ago",
    },
    {
      name: "Michael Chen",
      rating: 4,
      comment: "Very professional and punctual. Great experience overall.",
      date: "2 weeks ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-20">
      {/* Header */}
      <DashboardHeader 
        userName={user.name}
        currentLocale={locale}
        currentTheme={theme}
      />

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-6 space-y-6">
        {/* Profile Header Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-primary-500 via-secondary-500 to-purple-500 relative">
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          {/* Profile Info */}
          <div className="relative px-6 pb-6">
            {/* Avatar */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 mb-4">
              <div className="flex items-end gap-4">
                <div className="h-32 w-32 rounded-2xl border-4 border-white dark:border-gray-800 shadow-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white text-4xl font-bold">
                  {user.name.charAt(0)}
                </div>
                <div className="pb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {user.name}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">{user.username}</p>
                </div>
              </div>

              {/* Edit Button */}
              <button className="mt-4 md:mt-0 self-start md:self-auto px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                {t("PROFILE_EDIT")}
              </button>
            </div>

            {/* Role & Location */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-sm font-medium">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3 7h7l-5.5 4 2.5 7-7-4.5L5.5 20 8 13 2 9h7z"/>
                </svg>
                {user.role}
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {user.location}
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                📅 {t("PROFILE_MEMBER_SINCE")} {user.memberSince}
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">{user.rating}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  ⭐ {t("PROFILE_RATING")}
                </div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{user.completedRequests}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  ✅ {t("PROFILE_COMPLETED")}
                </div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">{user.activeRequests}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  🔄 {t("PROFILE_ACTIVE")}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <span className="text-2xl">📝</span>
            {t("PROFILE_ABOUT")}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {user.bio}
          </p>
        </div>

        {/* Languages Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">🌐</span>
            {t("PROFILE_LANGUAGES")}
          </h2>
          <div className="flex flex-wrap gap-2">
            {user.languages.map((lang, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 rounded-full font-medium"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            {t("PROFILE_SKILLS")}
          </h2>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-300 rounded-full font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              {t("PROFILE_REVIEWS")} ({user.totalReviews})
            </h2>
            <button className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
              {t("PROFILE_VIEW_ALL_REVIEWS")} →
            </button>
          </div>

          <div className="space-y-4">
            {recentReviews.map((review, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{review.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3 7h7l-5.5 4 2.5 7-7-4.5L5.5 20 8 13 2 9h7z"/>
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
