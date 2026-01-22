import BottomNav from "@/components/common/BottomNav";
import DashboardHeader from "@/common/DashboardHeader";
import React from "react";
import initTranslations from "@/lib/i18n/server";
import { getLocale } from "@/lib/i18n/detect";
import { getTheme } from "@/lib/theme/detect";
import SearchBar from "@/common/SearchBar";
import Link from "next/link";

export default async function ChatPage() {
  const { t } = await initTranslations();
  const locale = await getLocale();
  const theme = await getTheme();

  // Mock chat data - replace with real data
  const conversations = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "S",
      lastMessage: "Thanks for your help with the translation!",
      time: "2m ago",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "M",
      lastMessage: "When can we schedule the city tour?",
      time: "15m ago",
      unread: 0,
      online: true,
    },
    {
      id: 3,
      name: "Anna Schmidt",
      avatar: "A",
      lastMessage: "Perfect! See you tomorrow at 3pm",
      time: "1h ago",
      unread: 0,
      online: false,
    },
    {
      id: 4,
      name: "David Kumar",
      avatar: "D",
      lastMessage: "Could you help me with my documents?",
      time: "3h ago",
      unread: 1,
      online: false,
    },
    {
      id: 5,
      name: "Maria Garcia",
      avatar: "M",
      lastMessage: "Thank you so much! Great service 😊",
      time: "Yesterday",
      unread: 0,
      online: false,
    },
    {
      id: 6,
      name: "John Smith",
      avatar: "J",
      lastMessage: "I'll send you the details shortly",
      time: "Yesterday",
      unread: 0,
      online: false,
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
      <main className="mx-auto max-w-4xl px-4 py-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {t("CHAT_TITLE")}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {conversations.filter(c => c.unread > 0).length} unread messages
            </p>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span className="hidden sm:inline">{t("CHAT_NEW_MESSAGE")}</span>
          </button>
        </div>

        {/* Search Bar */}
        <SearchBar placeholder={t("CHAT_SEARCH_PLACEHOLDER")} />

        {/* Conversations List */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          {conversations.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t("CHAT_NO_MESSAGES")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t("CHAT_START_CONVERSATION")}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {conversations.map((conversation) => (
                <Link
                  key={conversation.id}
                  href={`/chat/${conversation.id}`}
                  className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer group"
                >
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white text-xl font-bold shadow-md group-hover:shadow-lg transition-shadow">
                      {conversation.avatar}
                    </div>
                    {/* Online Indicator */}
                    {conversation.online && (
                      <div className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                    )}
                    {/* Unread Badge */}
                    {conversation.unread > 0 && (
                      <div className="absolute -top-1 -right-1 h-6 w-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
                        {conversation.unread}
                      </div>
                    )}
                  </div>

                  {/* Message Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`font-semibold truncate ${
                        conversation.unread > 0 
                          ? "text-gray-900 dark:text-white" 
                          : "text-gray-700 dark:text-gray-300"
                      }`}>
                        {conversation.name}
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">
                        {conversation.time}
                      </span>
                    </div>
                    <p className={`text-sm truncate ${
                      conversation.unread > 0
                        ? "text-gray-900 dark:text-white font-medium"
                        : "text-gray-600 dark:text-gray-400"
                    }`}>
                      {conversation.lastMessage}
                    </p>
                  </div>

                  {/* Chevron */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-gray-400 dark:text-gray-500 flex-shrink-0 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Info Card */}
        <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <div className="text-3xl">💡</div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                {t("TIP_TITLE")}
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {t("TIP_CHAT")}
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
