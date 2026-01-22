import React from "react";
import initTranslations from "@/lib/i18n/server";
import LoginForm from "@/(public)/login/LoginForm";
import login from "../../../public/svg/undraw_login_weas.svg";
import Link from "next/link";
import { PAGE_LINKS } from "@/constant/page.links";
import Image from "next/image";

const LoginPage = async () => {
  const { t } = await initTranslations();
  return (
    <div className="h-[calc(100vh-var(--header-h))] bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Illustration & Info */}
        <div className="hidden md:flex flex-col items-center justify-center p-8">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <Image
              src={login}
              alt="login illustration"
              width={400}
              height={400}
              loading="eager"
              className="relative z-10 drop-shadow-2xl"
            />
          </div>
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
              {t("WELCOME_BACK")}! 👋
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {t("LOG_IN_TO_CONTINUE")}
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full flex items-center justify-center">
          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100 dark:border-gray-700">
            {/* Mobile Header */}
            <div className="md:hidden text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                🔐
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {t("WELCOME_BACK")}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {t("LOG_IN_TO_CONTINUE")}
              </p>
            </div>

            {/* Desktop Header */}
            <div className="hidden md:block text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg transform hover:scale-110 transition-transform duration-300">
                🔐
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {t("WELCOME_BACK")}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {t("LOG_IN_TO_CONTINUE")}
              </p>
            </div>

            <LoginForm />

            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                {t("DONT_HAVE_AN_ACCOUNT")}?{" "}
                <Link
                  href={PAGE_LINKS.SIGNUP}
                  className="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                >
                  {t("SIGN_UP")}
                </Link>
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-center text-gray-500 dark:text-gray-500">
                By continuing, you agree to our Terms of Service and Privacy
                Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
