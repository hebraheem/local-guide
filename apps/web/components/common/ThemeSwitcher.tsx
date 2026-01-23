"use client";

import React, { useState, useTransition } from "react";

type Props = {
  currentTheme: "light" | "dark";
};

const ThemeSwitcher = ({ currentTheme }: Props) => {
  const [value, setValue] = useState<"light" | "dark">(currentTheme);
  const [pending, startTransition] = useTransition();

  const toggle = () => {
    const next = value === "dark" ? "light" : "dark";
    setValue(next);
    startTransition(async () => {
      try {
        await fetch("/api/theme", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ theme: next }),
          cache: "no-store",
        });
        // Reload so Server Components re-render with new theme class on <html>
        window.location.reload();
      } catch (e) {
        console.error("Failed to switch theme", e);
      }
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={pending}
      aria-pressed={value === "dark"}
      aria-label="Toggle dark mode"
      className="inline-flex items-center gap-2 rounded-md border border-primary-100 bg-white/80 dark:bg-neutral-800 px-3 py-1 text-sm shadow-sm hover:bg-white dark:hover:bg-neutral-700"
    >
      {value === "dark" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path d="M21.64 13a1 1 0 0 0-1.05-.14A8 8 0 1 1 11.1 3.41a1 1 0 0 0-.14-1.05 1 1 0 0 0-1.66.25 10 10 0 1 0 12.75 12.75 1 1 0 0 0 .25-1.66z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-primary-700"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      )}
      <span className="hidden sm:inline">{value === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
};

export default ThemeSwitcher;
