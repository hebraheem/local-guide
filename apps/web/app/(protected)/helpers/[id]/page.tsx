import React from "react";
import initTranslations from "@/lib/i18n/server";
import Link from "next/link";
import BottomNav from "@/common/BottomNav";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function HelperDetailPage({ params }: Props) {
  const { t } = await initTranslations();
  const { id } = await params;

  // Mock helper data - replace with real data
  const helper = {
    id,
    name: "Sarah Johnson",
    username: "@sarahjohnson",
    role: "Professional Translator",
    location: "Berlin, Germany",
    rating: 4.9,
    totalReviews: 127,
    completedRequests: 145,
    responseTime: "< 1 hour",
    memberSince: "March 2023",
    bio: "Professional translator with 5+ years of experience specializing in legal and business documents. Native English speaker fluent in German. I help individuals and businesses with accurate, reliable translations and can also assist with document preparation for visa applications.",
    languages: ["English (Native)", "German (Fluent)", "Spanish (Intermediate)"],
    skills: ["Legal Translation", "Business Documents", "Visa Applications", "Contract Review", "Medical Documents"],
    availability: "Monday - Friday, 9am - 6pm",
    hourlyRate: "€30-50/hour",
  };

  const reviews = [
    {
      name: "Michael Brown",
      rating: 5,
      comment: "Sarah translated my employment contract perfectly. Very professional and quick turnaround!",
      date: "3 days ago",
    },
    {
      name: "Anna Mueller",
      rating: 5,
      comment: "Helped me with my visa application documents. Everything was approved on first try!",
      date: "1 week ago",
    },
    {
      name: "David Chen",
      rating: 4,
      comment: "Great translator, very patient with revisions. Highly recommend!",
      date: "2 weeks ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-20">
      {/* Header with Back Button */}
      <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="mx-auto max-w-4xl px-4 py-3 flex items-center gap-3">
          <Link
            href="/helpers"
            className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </Link>
          <h1 className="font-semibold text-gray-900 dark:text-white">
            {t("HELPER_DETAILS")}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-6 space-y-6">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 relative">
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          {/* Profile Info */}
          <div className="relative px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 mb-4">
              <div className="flex items-end gap-4">
                <div className="h-32 w-32 rounded-2xl border-4 border-white dark:border-gray-800 shadow-xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-4xl font-bold">
                  {helper.name.charAt(0)}
                </div>
                <div className="pb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {helper.name}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">{helper.username}</p>
                </div>
              </div>

              <div className="mt-4 md:mt-0 flex gap-3">
                <Link
                  href={`/chat/new?helper=${helper.id}`}
                  className="flex-1 md:flex-none px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  {t("HELPER_CONTACT_NOW")}
                </Link>
              </div>
            </div>

            {/* Role & Location */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-sm font-medium">
                💼 {helper.role}
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {helper.location}
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{helper.rating}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">⭐ {t("PROFILE_RATING")}</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{helper.completedRequests}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">✅ {t("PROFILE_COMPLETED")}</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{helper.responseTime}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">⏱️ Response</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{helper.hourlyRate}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">💰 Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <span className="text-2xl">📝</span>
            {t("HELPER_ABOUT")}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {helper.bio}
          </p>
        </div>

        {/* Languages */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">🌐</span>
            {t("PROFILE_LANGUAGES")}
          </h2>
          <div className="flex flex-wrap gap-2">
            {helper.languages.map((lang, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 rounded-full font-medium"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            {t("PROFILE_SKILLS")}
          </h2>
          <div className="flex flex-wrap gap-2">
            {helper.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-300 rounded-full font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              {t("PROFILE_REVIEWS")} ({helper.totalReviews})
            </h2>
          </div>

          <div className="space-y-4">
            {reviews.map((review, index) => (
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

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-800 dark:to-secondary-800 rounded-2xl shadow-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">
            Ready to work with {helper.name.split(' ')[0]}?
          </h3>
          <p className="text-white/90 mb-6">
            Get in touch and start your request today!
          </p>
          <Link
            href={`/chat/new?helper=${helper.id}`}
            className="inline-block px-8 py-3 bg-white hover:bg-gray-100 text-primary-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            {t("HELPER_CONTACT_NOW")}
          </Link>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
