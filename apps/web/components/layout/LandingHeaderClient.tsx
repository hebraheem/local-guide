"use client";

import Link from "next/link";
import { useState } from "react";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

type Props = {
  locale: string;
  translations: {
    howItWorks: string;
    safety: string;
    about: string;
    login: string;
    signUp: string;
  };
};

const LandingHeaderClient = ({ locale, translations }: Props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const inPageNavigate = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-bold text-primary-600 dark:text-primary-400">
              🌍 Local Guide
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <div
              onClick={() => inPageNavigate("how-it-works")}
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors cursor-pointer"
            >
              {translations.howItWorks}
            </div>
            <div
              onClick={() => inPageNavigate("safety")}
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors cursor-pointer"
            >
              {translations.safety}
            </div>
            <div
              onClick={() => inPageNavigate("about")}
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors cursor-pointer"
            >
              {translations.about}
            </div>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <LanguageSwitcher currentLocale={locale} />
            </div>

            <Link
              href="/login"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
            >
              {translations.login}
            </Link>

            <Link
              href="/signup"
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-full font-semibold transition-colors"
            >
              {translations.signUp}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-800 pt-4">
            <nav className="flex flex-col gap-4">
              <Link
                href="/home"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {translations.howItWorks}
              </Link>
              <Link
                href="/home"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {translations.safety}
              </Link>
              <Link
                href="/home"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {translations.about}
              </Link>
              <div className="flex items-center gap-2 text-sm">
                <LanguageSwitcher currentLocale={locale} />
              </div>
              <Link
                href="/login"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {translations.login}
              </Link>
              <Link
                href="/signup"
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full font-semibold transition-colors text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                {translations.signUp}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default LandingHeaderClient;
