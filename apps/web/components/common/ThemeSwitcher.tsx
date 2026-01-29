"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        disabled
        aria-label="Toggle dark mode"
        className="inline-flex items-center gap-2 rounded-md border border-primary-100 bg-white/80 dark:bg-neutral-800 px-3 py-1 text-sm shadow-sm"
      >
        <div className="h-4 w-4" />
        <span className="hidden sm:inline">Theme</span>
      </button>
    );
  }

  const toggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={theme === "dark"}
      aria-label="Toggle dark mode"
      className="inline-flex items-center gap-2 rounded-md border border-primary-100 bg-white/80 dark:bg-neutral-800 px-3 py-1 text-sm shadow-sm hover:bg-white dark:hover:bg-neutral-700 transition-colors"
    >
      {theme === "dark" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4 text-primary-700" />
      )}
      <span className="hidden sm:inline">
        {theme === "dark" ? "Dark" : "Light"}
      </span>
    </button>
  );
};

export default ThemeSwitcher;
