import React from "react";
import initTranslations from "@/lib/i18n/server";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ChatDetailPage({ params }: Props) {
  const { t } = await initTranslations();
  const { id } = await params;

  // Mock conversation data - replace with real data
  const conversation = {
    id,
    name: "Sarah Johnson",
    avatar: "S",
    online: true,
  };

  const messages = [
    {
      id: 1,
      sender: "them",
      text: "Hi! I need help with translating some documents.",
      time: "10:30 AM",
    },
    {
      id: 2,
      sender: "me",
      text: "Hi Sarah! I'd be happy to help. What kind of documents?",
      time: "10:32 AM",
    },
    {
      id: 3,
      sender: "them",
      text: "It's a legal document for my apartment rental. About 3 pages.",
      time: "10:33 AM",
    },
    {
      id: 4,
      sender: "me",
      text: "No problem! I have experience with legal translations. When do you need it?",
      time: "10:35 AM",
    },
    {
      id: 5,
      sender: "them",
      text: "By tomorrow if possible. Is that doable?",
      time: "10:36 AM",
    },
    {
      id: 6,
      sender: "me",
      text: "Yes, definitely! Can you send me the documents?",
      time: "10:37 AM",
    },
    {
      id: 7,
      sender: "them",
      text: "Perfect! I'll send them right now. Thanks so much! 😊",
      time: "10:38 AM",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="mx-auto max-w-4xl px-4 py-3 flex items-center gap-3">
          {/* Back Button */}
          <Link
            href="/chat"
            className="h-10 w-10 rounded-full bg-gray-400 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-colors"
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

          {/* User Info */}
          <div className="flex items-center gap-3 flex-1">
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold">
                {conversation.avatar}
              </div>
              {conversation.online && (
                <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
              )}
            </div>
            <div>
              <h1 className="font-semibold text-gray-900 dark:text-white">
                {conversation.name}
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {conversation.online ? t("CHAT_ONLINE") : t("CHAT_OFFLINE")}
              </p>
            </div>
          </div>

        </div>
      </header>

      {/* Messages Container */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl px-4 py-6">
          {/* Date Separator */}
          <div className="flex items-center justify-center mb-6">
            <span className="px-4 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-full">
              {t("CHAT_TODAY")}
            </span>
          </div>

          {/* Messages */}
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-end gap-2 ${
                  message.sender === "me" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "them" && (
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {conversation.avatar}
                  </div>
                )}

                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${
                    message.sender === "me"
                      ? "bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-br-sm"
                      : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-bl-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p
                    className={`text-[10px] mt-1 ${
                      message.sender === "me"
                        ? "text-white/70"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {message.time}
                  </p>
                </div>

                {message.sender === "me" && (
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    U
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Message Input */}
      <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="mx-auto max-w-4xl px-4 py-3">
          <div className="flex items-center gap-2">
            {/* Attachment Button */}
            <button className="h-10 w-10 rounded-full bg-gray-400 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-colors flex-shrink-0">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
              </svg>
            </button>

            {/* Input Field */}
            <input
              type="text"
              placeholder={t("CHAT_TYPE_MESSAGE")}
              className="flex-1 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-all"
            />

            {/* Send Button */}
            <button className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex-shrink-0">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
