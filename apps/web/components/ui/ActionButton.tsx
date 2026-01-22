"use client";

import Link from "next/link";

type ActionButtonProps = {
  icon: React.ReactNode;
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "tertiary";
};

export default function ActionButton({ icon, label, href, variant = "primary" }: ActionButtonProps) {
  const variantStyles = {
    primary: "bg-gradient-to-br from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg",
    secondary: "bg-gradient-to-br from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white shadow-lg",
    tertiary: "bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg",
  };

  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${variantStyles[variant]}`}
    >
      <div className="text-3xl">{icon}</div>
      <span className="text-sm font-semibold text-center leading-tight">
        {label}
      </span>
    </Link>
  );
}
