"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import home from '@/public/svg/home_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'
import SettingsModal from "@/common/SettingsModal";

type Props = {
  userName?: string;
  userAvatar?: string;
  currentLocale: string;
  currentTheme: "light" | "dark";
};

export default function DashboardHeader({ userName = "User", userAvatar, currentLocale, currentTheme }: Props) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-800 dark:to-secondary-800 text-white shadow-lg">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          {/* Left - User Avatar */}
          <Link href="/profile" className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white/30 group-hover:border-white/60 transition-all shadow-md">
              {userAvatar ? (
                <Image
                  src={userAvatar}
                  alt={userName}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                  {userName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </Link>

          {/* Center - App Name & Logo */}
          <div className="flex items-center gap-2">
            <Image
              src={home}
              alt="App Logo"
              width={28}
              height={28}
              className="drop-shadow-md"
            />
            <h1 className="font-bold text-lg md:text-xl text-white tracking-tight">
              Local Guide
            </h1>
          </div>

          {/* Right - Settings Icon */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all shadow-md hover:shadow-lg"
            aria-label="Settings"
          >
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
      </header>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentLocale={currentLocale}
        currentTheme={currentTheme}
      />
    </>
  );
}
