import React from "react";
import initTranslations from "@/lib/i18n/server";
import Image from "next/image";
import resetPassword from "@/public/svg/undraw_forgot-password_nttj.svg";
import Link from "next/link";
import { PAGE_LINKS } from "@/constant/page.links";
import ResetPasswordForm from "@/(public)/reset-password/ResetPasswordForm";

const ResetPasswordPage = async () => {
  const { t } = await initTranslations();
  return (
    <div className="min-h-[calc(100vh-var(--header-h))] bg-gradient-to-br from-green-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Illustration & Info */}
        <div className="hidden md:flex flex-col items-center justify-center p-8">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <Image
              src={resetPassword}
              alt="reset password illustration"
              width={400}
              height={400}
              loading="eager"
              className="relative z-10 drop-shadow-2xl"
            />
          </div>
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
              Create New Password 🔐
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Choose a strong password for your account
            </p>
          </div>
        </div>

        {/* Right Side - Reset Password Form */}
        <div className="w-full flex items-center justify-center">
          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100 dark:border-gray-700">
            {/* Mobile Header */}
            <div className="md:hidden text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                🔐
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {t("RESET_YOUR_PASSWORD")}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Enter your new password below
              </p>
            </div>

            {/* Desktop Header */}
            <div className="hidden md:block text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg transform hover:scale-110 transition-transform duration-300">
                🔐
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {t("RESET_YOUR_PASSWORD")}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Enter your new password below
              </p>
            </div>

            <ResetPasswordForm />

            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                {t("REMEMBER_PASSWORD")}?{" "}
                <Link 
                  href={PAGE_LINKS.LOGIN}
                  className="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                >
                  {t("LOGIN")}
                </Link>
              </p>
            </div>

            {/* Password Requirements */}
            <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-green-900 dark:text-green-300 mb-2 text-sm">
                Password Requirements:
              </h3>
              <ul className="text-xs text-green-800 dark:text-green-400 space-y-1">
                <li className="flex items-center gap-2">
                  <span>✓</span> At least 8 characters long
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span> Contains letters and numbers
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span> Use a unique password
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
