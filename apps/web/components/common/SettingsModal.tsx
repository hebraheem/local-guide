"use client";

import React, { useState, useTransition } from "react";
import useTranslation from "@/hooks/useTranslation";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  currentLocale: string;
  currentTheme: "light" | "dark";
};

export default function SettingsModal({ isOpen, onClose, currentLocale, currentTheme }: Props) {
  const { t } = useTranslation();
  const [locale, setLocale] = useState(currentLocale);
  const [theme, setTheme] = useState<"light" | "dark">(currentTheme);
  const [pending, startTransition] = useTransition();

  if (!isOpen) return null;

  const handleLanguageChange = (newLocale: "en" | "de") => {
    setLocale(newLocale);
    startTransition(async () => {
      try {
        await fetch("/api/lang", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lng: newLocale }),
          cache: "no-store",
        });
        window.location.reload();
      } catch (e) {
        console.error("Failed to switch language", e);
      }
    });
  };

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    startTransition(async () => {
      try {
        await fetch("/api/theme", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ theme: newTheme }),
          cache: "no-store",
        });
        window.location.reload();
      } catch (e) {
        console.error("Failed to switch theme", e);
      }
    });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
        <div
          className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-t-3xl md:rounded-3xl shadow-2xl transform transition-all duration-300 max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-800 dark:to-secondary-800 text-white px-6 py-4 rounded-t-3xl flex items-center justify-between">
            <h2 className="text-xl font-bold">{t("SETTINGS_TITLE")}</h2>
            <button
              onClick={onClose}
              className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              aria-label={t("CLOSE")}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Appearance Section */}
            <section>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                {t("SETTINGS_APPEARANCE")}
              </h3>

              {/* Language */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 mb-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      🌐
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {t("SETTINGS_LANGUAGE")}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {locale === "en" ? "English" : "Deutsch"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleLanguageChange("en")}
                    disabled={pending}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                      locale === "en"
                        ? "bg-primary-600 text-white shadow-md"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleLanguageChange("de")}
                    disabled={pending}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                      locale === "de"
                        ? "bg-primary-600 text-white shadow-md"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    Deutsch
                  </button>
                </div>
              </div>

              {/* Theme */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-400">
                      {theme === "dark" ? "🌙" : "☀️"}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {t("SETTINGS_THEME")}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {theme === "dark"
                          ? t("SETTINGS_THEME_DARK")
                          : t("SETTINGS_THEME_LIGHT")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleThemeChange("light")}
                    disabled={pending}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                      theme === "light"
                        ? "bg-primary-600 text-white shadow-md"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="5" />
                      <line x1="12" y1="1" x2="12" y2="3" />
                      <line x1="12" y1="21" x2="12" y2="23" />
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                      <line x1="1" y1="12" x2="3" y2="12" />
                      <line x1="21" y1="12" x2="23" y2="12" />
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </svg>
                    {t("SETTINGS_THEME_LIGHT")}
                  </button>
                  <button
                    onClick={() => handleThemeChange("dark")}
                    disabled={pending}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                      theme === "dark"
                        ? "bg-primary-600 text-white shadow-md"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M21.64 13a1 1 0 0 0-1.05-.14A8 8 0 1 1 11.1 3.41a1 1 0 0 0-.14-1.05 1 1 0 0 0-1.66.25 10 10 0 1 0 12.75 12.75 1 1 0 0 0 .25-1.66z" />
                    </svg>
                    {t("SETTINGS_THEME_DARK")}
                  </button>
                </div>
              </div>
            </section>

            {/* Account Section */}
            <section>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                {t("SETTINGS_ACCOUNT")}
              </h3>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
                  <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-400">
                    👤
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {t("SETTINGS_EDIT_PROFILE")}
                    </h4>
                  </div>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-gray-400"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>

                <button className="w-full flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
                  <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center text-orange-600 dark:text-orange-400">
                    🔒
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {t("SETTINGS_PRIVACY")}
                    </h4>
                  </div>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-gray-400"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </section>

            {/* Help Section */}
            <section>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                {t("SETTINGS_HELP")}
              </h3>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    ❓
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {t("SETTINGS_HELP_CENTER")}
                    </h4>
                  </div>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-gray-400"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>

                <button className="w-full flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
                  <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    💬
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {t("SETTINGS_CONTACT_SUPPORT")}
                    </h4>
                  </div>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-gray-400"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </section>

            {/* About */}
            <section className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{t("SETTINGS_VERSION")}</span>
                <span className="font-mono">1.0.0</span>
              </div>
            </section>

            {/* Logout Button */}
            <button className="w-full py-3 px-4 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 font-semibold rounded-xl transition-colors">
              {t("SETTINGS_LOGOUT")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
