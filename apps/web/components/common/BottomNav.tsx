"use client";
import React from "react";
import useTranslation from "@/hooks/useTranslation";


const BottomNav = () => {
  const { t } = useTranslation()
  const Item = ({ label, icon }: { label: string; icon: React.ReactNode }) => (
    <button className="flex flex-col items-center justify-center gap-1 font-medium">
      <span className="h-10 w-10 rounded-xl bg-white shadow-soft border border-primary-100 flex items-center justify-center ">
        {icon}
      </span>
      {t(label)}
    </button>
  );

  return (
    <nav className="sticky bottom-0 z-20 border-t border-primary-100 bg-white/95 backdrop-blur">
      <div className="mx-auto sm:max-w-3xl px-4 py-2 grid grid-cols-5 gap-2">
        <Item
          label="HOME"
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12l9-9 9 9" />
              <path d="M9 21V9h6v12" />
            </svg>
          }
        />
        <Item
          label="MAP"
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 6l7-3 7 3 7-3v15l-7 3-7-3-7 3z" />
              <path d="M8 3v15" />
              <path d="M16 6v15" />
            </svg>
          }
        />
        <div className="flex items-center justify-center">
          <button
            aria-label="ADD"
            className="h-12 w-12 -mt-6 rounded-full bg-secondary-500 text-white shadow-card flex items-center justify-center"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
        <Item
          label="CHAT"
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V5a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
            </svg>
          }
        />
        <Item
          label="PROFILE"
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          }
        />
      </div>
    </nav>
  );
};

export default BottomNav;
