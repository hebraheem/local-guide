import React from "react";
import initTranslations from "@/lib/i18n/server";
import Link from "next/link";
import BottomNav from "@/common/BottomNav";
import RequestForm from "@/forms/RequestForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function RequestEditPage({ params }: Props) {
  const { t } = await initTranslations();
  const { id } = await params;

  // Mock request data - replace with real data
  const request = {
    id,
    title: "Fix Air Conditioner",
    description: "AC stopped cooling",
    mode: "PAID",
    categoryId: "a2f4c1e2-5b3c-4d89-ae33-1b1ccce3f441",
    deadline: "2026-02-01T18:00:00.000Z",
    location: {
      city: "Lagos",
      street: "Ikeja GRA",
      state: "Lagos",
      country: "Nigeria",
      zipCode: "100271",
    },
    payment: {
      amount: "12000",
      currency: "NGN",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="mx-auto max-w-4xl px-4 py-3 flex items-center gap-3">
          <Link
            href={`/requests/${id}`}
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
            {t("EDIT_REQUEST")}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-6 space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">✏️</span>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {t("EDIT_REQUEST_DETAILS")}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t("UPDATE_REQUEST_INFO")}
              </p>
            </div>
          </div>
          <RequestForm request={request} isEdit={true} />
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
