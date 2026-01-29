import Link from "next/link";
import RequestForm from "@/forms/RequestForm";
import { getTranslations } from "next-intl/server";

export default async function PostRequestPage() {
  const t = await getTranslations();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="mx-auto max-w-4xl px-4 py-3 flex items-center gap-3">
          <Link
            href="/dashboard"
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
            {t("POST_REQUEST")}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-6 space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📝</span>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {t("CREATE_NEW_REQUEST")}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t("FILL_REQUEST_DETAILS")}
              </p>
            </div>
          </div>
          <RequestForm />
        </div>
      </main>
    </div>
  );
}
