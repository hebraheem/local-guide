"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Animation */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-40 w-40 bg-red-200 dark:bg-red-900/30 rounded-full blur-3xl animate-pulse"></div>
          </div>
          <div className="relative text-9xl animate-bounce">
            ⚠️
          </div>
        </div>

        {/* Error Content */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Oops! Something went wrong
          </h1>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
            We encountered an unexpected error. Don't worry, it's not your fault!
          </p>

          {/* Error Details (in development) */}
          {process.env.NODE_ENV === "development" && error.message && (
            <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 text-left">
              <h3 className="font-semibold text-red-900 dark:text-red-400 mb-2 text-sm">
                Error Details (Development Only):
              </h3>
              <p className="text-xs text-red-700 dark:text-red-300 font-mono break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              Try Again
            </button>
            
            <Link
              href="/"
              className="px-8 py-4 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-bold rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-400 transition-all"
            >
              Go to Home
            </Link>
          </div>

          {/* Help Text */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              If this problem persists, please{" "}
              <a
                href="mailto:support@localguide.com"
                className="text-primary-600 dark:text-primary-400 hover:underline font-semibold"
              >
                contact support
              </a>
            </p>
          </div>
        </div>

        {/* Additional Help Card */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <div className="text-2xl">💡</div>
            <div className="text-left">
              <h4 className="font-bold text-gray-900 dark:text-white mb-1 text-sm">
                Common Solutions
              </h4>
              <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Try refreshing the page</li>
                <li>• Clear your browser cache</li>
                <li>• Check your internet connection</li>
                <li>• Try again in a few moments</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
