export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Loading Animation */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-32 w-32 bg-primary-200 dark:bg-primary-900/30 rounded-full blur-3xl animate-pulse"></div>
          </div>
          
          {/* Spinning Logo/Icon */}
          <div className="relative">
            <div className="text-8xl animate-bounce">
              🌍
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-24 w-24 border-4 border-primary-600 dark:border-primary-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>

        {/* Loading Content */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Loading...
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400">
            Please wait while we prepare things for you
          </p>

          {/* Loading Dots Animation */}
          <div className="flex justify-center gap-2 pt-4">
            <div className="h-3 w-3 bg-primary-600 dark:bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="h-3 w-3 bg-secondary-600 dark:bg-secondary-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="h-3 w-3 bg-purple-600 dark:bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        </div>

        {/* Skeleton Loaders */}
        <div className="mt-12 space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse w-5/6 mx-auto"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse w-4/6 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}
