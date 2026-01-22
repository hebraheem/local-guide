import React from "react";
import initTranslations from "@/lib/i18n/server";
import Image from "next/image";
import forgotPassword from "@/public/svg/undraw_forgot-password_nttj.svg";
import Link from "next/link";
import { PAGE_LINKS } from "@/constant/page.links";
import RequestResetPasswordForm from "@/(public)/request-rest-password/RequestResetPasswordForm";

const RequestResetPasswordPage = async () => {
  const { t } = await initTranslations();
  return (
    <div className="h-[calc(100vh-var(--header-h))] bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Illustration & Info */}
        <div className="hidden md:flex flex-col items-center justify-center p-8">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <Image
              src={forgotPassword}
              alt="forgot password illustration"
              width={400}
              height={400}
              loading="eager"
              className="relative z-10 drop-shadow-2xl"
            />
          </div>
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
              Forgot Password? 🔑
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              No worries, we'll help you reset it!
            </p>
          </div>
        </div>

        {/* Right Side - Request Reset Form */}
        <div className="w-full flex items-center justify-center">
          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100 dark:border-gray-700">
            {/* Mobile Header */}
            <div className="md:hidden text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                🔑
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {t("RESET_YOUR_PASSWORD")}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {t("PROVIDE_YOUR_EMAIL_TO_RESET_PASSWORD")}
              </p>
            </div>

            {/* Desktop Header */}
            <div className="hidden md:block text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg transform hover:scale-110 transition-transform duration-300">
                🔑
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {t("RESET_YOUR_PASSWORD")}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {t("PROVIDE_YOUR_EMAIL_TO_RESET_PASSWORD")}
              </p>
            </div>

            <RequestResetPasswordForm />

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

            {/* Info Box */}
            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <p className="text-xs text-blue-800 dark:text-blue-300">
                  We'll send you an email with instructions to reset your
                  password. Please check your inbox and spam folder.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestResetPasswordPage;
