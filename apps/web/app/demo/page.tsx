"use client";

import { useState } from "react";
import { usePushNotifications } from "@/hooks/usePushNotifications";

export default function Home() {
  const { isSupported, isGranted, isLoading, subscribe, unsubscribe } =
    usePushNotifications();
  const [testMessage, setTestMessage] = useState("");

  const handleTogglePushNotifications = async () => {
    try {
      if (isGranted) {
        await unsubscribe();
      } else {
        await subscribe();
      }
    } catch (error) {
      console.error("Push notification toggle error:", error);
      alert(
        "Failed to toggle push notifications. Please check console for details.",
      );
    }
  };

  const handleSendTestNotification = async () => {
    if ("serviceWorker" in navigator) {
      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification("Test Notification", {
        body: testMessage || "This is a test notification",
        icon: "../public/icon-192x192.png",
        badge: "../public/badge-72x72.png",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
            Your Local Guide
          </h1>
          <p className="text-xl text-primary-600 mb-8">
            Next.js PWA with Push Notifications, TailwindCSS, and Modern
            Architecture
          </p>
        </div>

        {/* Configuration Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* PWA Status */}
          <div className="bg-primary-50 border border-primary-200 rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">📱</span>
              <h2 className="text-lg font-semibold text-primary-900">PWA</h2>
            </div>
            <ul className="space-y-2 text-sm text-primary-700">
              <li className="flex items-center gap-2">
                <span className="text-primary-600">✓</span> next-pwa configured
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary-600">✓</span> Service Worker
                registered
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary-600">✓</span> Offline support
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary-600">✓</span> Install prompt
              </li>
            </ul>
          </div>

          {/* Push Notifications Status */}
          <div className="bg-secondary-50 border border-secondary-200 rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🔔</span>
              <h2 className="text-lg font-semibold text-secondary-900">
                Push Notifications
              </h2>
            </div>
            <ul className="space-y-2 text-sm text-secondary-700">
              <li className="flex items-center gap-2">
                <span
                  className={
                    isSupported ? "text-primary-600" : "text-secondary-600"
                  }
                >
                  {isSupported ? "✓" : "✗"}
                </span>
                {isSupported ? "Supported" : "Not supported"}
              </li>
              <li className="flex items-center gap-2">
                <span
                  className={
                    isGranted ? "text-primary-600" : "text-secondary-500"
                  }
                >
                  {isGranted ? "✓" : "⚠"}
                </span>
                {isGranted ? "Enabled" : "Disabled"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary-600">✓</span> RxJS integrated
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary-600">✓</span> Cross-platform ready
              </li>
            </ul>
          </div>

          {/* Tech Stack Status */}
          <div className="bg-primary-50 border border-primary-200 rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">⚙️</span>
              <h2 className="text-lg font-semibold text-primary-900">
                Tech Stack
              </h2>
            </div>
            <ul className="space-y-2 text-sm text-primary-700">
              <li className="flex items-center gap-2">
                <span className="text-primary-600">✓</span> TailwindCSS
                configured
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary-600">✓</span> TanStack React Query
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary-600">✓</span> Axios + Interceptors
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary-600">✓</span> RxJS + Observables
              </li>
            </ul>
          </div>
        </div>

        {/* Testing Section */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-primary-900 mb-6">
            Test Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Push Notifications Test */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary-900">
                Push Notifications
              </h3>
              {isSupported ? (
                <>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Enter notification message"
                      value={testMessage}
                      onChange={(e) => setTestMessage(e.target.value)}
                      className="flex-1 px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={handleTogglePushNotifications}
                    disabled={isLoading}
                    className={`w-full px-6 py-2 rounded-lg font-medium transition-colors ${
                      isGranted
                        ? "bg-secondary-600 hover:bg-secondary-700 text-white"
                        : "bg-primary-600 hover:bg-primary-700 text-white"
                    } disabled:opacity-50`}
                  >
                    {isLoading
                      ? "Loading..."
                      : isGranted
                        ? "Disable Notifications"
                        : "Enable Notifications"}
                  </button>
                  {isGranted && (
                    <button
                      onClick={handleSendTestNotification}
                      className="w-full px-6 py-2 rounded-lg font-medium bg-primary-600 hover:bg-primary-700 text-white transition-colors"
                    >
                      Send Test Notification
                    </button>
                  )}
                </>
              ) : (
                <p className="text-sm text-primary-600">
                  Push notifications not supported in this browser
                </p>
              )}
            </div>

            {/* Folder Structure Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary-900">
                Folder Structure
              </h3>
              <div className="bg-primary-100 rounded-lg p-4 text-sm font-mono text-primary-900 space-y-1">
                <div>src/</div>
                <div className="ml-4">├── hooks/ (Custom React hooks)</div>
                <div className="ml-4">├── services/ (API services)</div>
                <div className="ml-4">├── config/ (Configuration)</div>
                <div className="ml-4">├── types/ (TypeScript types)</div>
                <div className="ml-4">├── utils/ (Utility functions)</div>
                <div className="ml-4">├── lib/ (Libraries)</div>
                <div className="ml-4">├── context/ (React contexts)</div>
                <div className="ml-4">└── stores/ (State management)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Configuration Checklist */}
        <div className="bg-secondary-50 border border-secondary-200 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6">
            Configuration Checklist
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-secondary-900 mb-4">
                Core Setup
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="text-primary-600 font-bold">✓</span>
                  <span className="text-secondary-700">
                    next.config.js with PWA
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-primary-600 font-bold">✓</span>
                  <span className="text-secondary-700">tailwind.config.ts</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-primary-600 font-bold">✓</span>
                  <span className="text-secondary-700">postcss.config.js</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-primary-600 font-bold">✓</span>
                  <span className="text-secondary-700">
                    axios client with interceptors
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-secondary-900 mb-4">
                Features & Libraries
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="text-primary-600 font-bold">✓</span>
                  <span className="text-secondary-700">
                    React Query provider
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-primary-600 font-bold">✓</span>
                  <span className="text-secondary-700">
                    Push notification service (RxJS)
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-primary-600 font-bold">✓</span>
                  <span className="text-secondary-700">
                    Custom hooks & services
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-primary-600 font-bold">✓</span>
                  <span className="text-secondary-700">
                    Environment configuration
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-secondary-900 mb-4">
                PWA & Offline
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="text-primary-600 font-bold">✓</span>
                  <span className="text-secondary-700">
                    Service worker (sw.js)
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-primary-600 font-bold">✓</span>
                  <span className="text-secondary-700">manifest.json</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-primary-600 font-bold">✓</span>
                  <span className="text-secondary-700">
                    Offline fallback page
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-primary-600 font-bold">✓</span>
                  <span className="text-secondary-700">
                    Install prompt component
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-secondary-900 mb-4">
                Code Organization
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="text-primary-600 font-bold">✓</span>
                  <span className="text-secondary-700">Path aliases (@/*)</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-primary-600 font-bold">✓</span>
                  <span className="text-secondary-700">
                    Type-safe configuration
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-primary-600 font-bold">✓</span>
                  <span className="text-secondary-700">Utility functions</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-primary-600 font-bold">✓</span>
                  <span className="text-secondary-700">.env configuration</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-primary-600">
          <p>🚀 Production-ready Next.js PWA configuration</p>
        </div>
      </div>
    </div>
  );
}
