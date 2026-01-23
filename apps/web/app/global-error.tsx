"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
          <div className="max-w-2xl w-full text-center">
            {/* Critical Error Animation */}
            <div className="mb-8 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-40 w-40 bg-red-200 dark:bg-red-900/30 rounded-full blur-3xl animate-pulse"></div>
              </div>
              <div className="relative">
                <div className="text-9xl animate-pulse">
                  🚨
                </div>
              </div>
            </div>

            {/* Error Content */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Critical Application Error
              </h1>
              
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                We're sorry, but something went seriously wrong. Our team has been notified.
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
                  {error.stack && (
                    <details className="mt-3">
                      <summary className="text-xs text-red-600 dark:text-red-400 cursor-pointer">
                        Stack Trace
                      </summary>
                      <pre className="text-[10px] text-red-700 dark:text-red-300 mt-2 overflow-x-auto">
                        {error.stack}
                      </pre>
                    </details>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={reset}
                  className="px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  Reload Application
                </button>
                
                <Link
                  href="/"
                  className="px-8 py-4 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-bold rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-400 transition-all"
                >
                  Go to Home
                </Link>
              </div>

              {/* Emergency Contact */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  This is a critical error. Please contact support immediately:
                </p>
                <a
                  href="mailto:support@localguide.com"
                  className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline font-semibold"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  support@localguide.com
                </a>
              </div>
            </div>

            {/* Help Card */}
            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-start gap-3">
                <div className="text-2xl">⚠️</div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1 text-sm">
                    What you can do:
                  </h4>
                  <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Try reloading the application</li>
                    <li>• Clear your browser cache and cookies</li>
                    <li>• Check if your internet connection is stable</li>
                    <li>• Try accessing from a different browser</li>
                    <li>• Contact support if the problem persists</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
