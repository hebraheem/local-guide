import React from "react";
import Image from "next/image";
import Link from "next/link";

import welcome from "@/public/svg/undraw_welcome-cats_tw36.svg";
import { PAGE_LINKS } from "@/constant/page.links";
import initTranslations from "@/lib/i18n/server";
import SignUpForm from "@/(public)/signup/SignUpForm";

const SignupPage = async () => {
  const {t} = await initTranslations()
  return (
    <div className="min-h-[calc(100vh-var(--header-h))] bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Illustration & Info */}
        <div className="hidden md:flex flex-col items-center justify-center p-8">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <Image
              src={welcome}
              alt="welcome illustration"
              width={400}
              height={400}
              loading="eager"
              className="relative z-10 drop-shadow-2xl"
            />
          </div>
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
              Join Our Community! 🎉
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {t("WE_ARE_HAPPY_TO_HAVE_YOU_ON_BOARD")}
            </p>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full flex items-center justify-center">
          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100 dark:border-gray-700">
            {/* Mobile Header */}
            <div className="md:hidden text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                ✨
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Create Account
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {t("WE_ARE_HAPPY_TO_HAVE_YOU_ON_BOARD")}
              </p>
            </div>

            {/* Desktop Header */}
            <div className="hidden md:block text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg transform hover:scale-110 transition-transform duration-300">
                ✨
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Create Account
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {t("WE_ARE_HAPPY_TO_HAVE_YOU_ON_BOARD")}
              </p>
            </div>

            <SignUpForm />

            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                {t("ALREADY_HAVE_AN_ACCOUNT")}?{" "}
                <Link
                  href={PAGE_LINKS.LOGIN}
                  className="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                >
                  {t("LOGIN")}
                </Link>
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-center text-gray-500 dark:text-gray-500">
                By signing up, you agree to our Terms of Service and Privacy
                Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
