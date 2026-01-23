import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Animation */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-48 w-48 bg-purple-200 dark:bg-purple-900/30 rounded-full blur-3xl animate-pulse"></div>
          </div>
          
          {/* Large 404 */}
          <div className="relative">
            <h1 className="text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">
              404
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
          <div className="text-6xl mb-6 animate-bounce">
            🔍
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
            The page you're looking for doesn't exist or has been moved.
          </p>

          {/* Suggestions */}
          <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl text-left">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
              Where would you like to go?
            </h3>
            <div className="grid gap-3">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-gray-700 rounded-xl transition-colors border border-gray-200 dark:border-gray-700 group"
              >
                <span className="text-2xl">🏠</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                    Dashboard
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    View your personalized dashboard
                  </p>
                </div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>

              <Link
                href="/requests"
                className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-gray-700 rounded-xl transition-colors border border-gray-200 dark:border-gray-700 group"
              >
                <span className="text-2xl">📋</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                    Browse Requests
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Find requests you can help with
                  </p>
                </div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>

              <Link
                href="/helpers"
                className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-gray-700 rounded-xl transition-colors border border-gray-200 dark:border-gray-700 group"
              >
                <span className="text-2xl">✨</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                    Find Helpers
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Connect with available helpers
                  </p>
                </div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Main Action Button */}
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            Back to Home
          </Link>
        </div>

        {/* Help Text */}
        <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl border border-purple-200 dark:border-purple-800">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Lost? Need help?{" "}
            <a
              href="mailto:support@localguide.com"
              className="text-primary-600 dark:text-primary-400 hover:underline font-semibold"
            >
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
