import React from "react";
import initTranslations from "@/lib/i18n/server";
import Link from "next/link";
import BottomNav from "@/common/BottomNav";
import ProfileForm from "./ProfileForm";
import PasswordForm from "./PasswordForm";

export default async function ProfileEditPage() {
  const { t } = await initTranslations();

  // Mock profile data - replace with real data
  const profile = {
    username: "jane_doe",
    email: "jane@example.com",
    firstName: "John",
    lastName: "Doe",
    bio: "A short bio about John Doe.",
    phone: "+1234567890",
    address: {
      street: "123 Main St",
      city: "Springfield",
      state: "IL",
      zipCode: "62704",
      country: "USA",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="mx-auto max-w-4xl px-4 py-3 flex items-center gap-3">
          <Link
            href="/profile"
            className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </Link>
          <h1 className="font-semibold text-gray-900 dark:text-white">
            {t("EDIT_PROFILE")}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-6 space-y-6">
        {/* Profile Information Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">👤</span>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {t("PROFILE_INFORMATION")}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t("UPDATE_PROFILE_INFO")}
              </p>
            </div>
          </div>
          <ProfileForm profile={profile} />
        </div>

        {/* Password Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🔒</span>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {t("CHANGE_PASSWORD")}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t("UPDATE_PASSWORD_SECURITY")}
              </p>
            </div>
          </div>
          <PasswordForm />
        </div>

        {/* Account Settings Info */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <div className="text-2xl">ℹ️</div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                {t("PROFILE_TIP")}
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {t("PROFILE_TIP_TEXT")}
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
