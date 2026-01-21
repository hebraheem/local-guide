import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Typography scale (rem-based for responsiveness)
        h1: ["1.75rem", { lineHeight: "2.25rem", fontWeight: "700" }], // 28px / 36px
        h2: ["1.375rem", { lineHeight: "1.875rem", fontWeight: "600" }], // 22px / 30px
        h3: ["1.125rem", { lineHeight: "1.625rem", fontWeight: "600" }], // 18px / 26px
        body: ["0.875rem", { lineHeight: "1.375rem", fontWeight: "400" }], // 14px / 22px
        small: ["0.75rem", { lineHeight: "1.125rem", fontWeight: "400" }], // 12px / 18px
        btn: ["0.875rem", { lineHeight: "1.25rem", fontWeight: "600" }], // 14px / 20px
      },
      colors: {
        primary: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c7d2fe",
          400: "#a5b4fc",
          500: "#818cf8",
          600: "#6366f1",
          700: "#4f46e5",
          800: "#4338ca",
          900: "#3730a3",
          950: "#2e1065",
        },
        // Secondary palette (Yellow/Accent) centered on #FFC83D
        secondary: {
          50: "#FFFAE6",
          100: "#FFF3C2",
          200: "#FFE68A",
          300: "#FFDA5E",
          400: "#FFCF45",
          500: "#FFC83D", // requested core secondary
          600: "#E6B137",
          700: "#CC9B31",
          800: "#A87927",
          900: "#805A1E",
          950: "#5A3F15",
        },
        accent: "#FBB24",
        // Brand flat tokens (light)
        "brand-primary": "#3F5DBA",
        "brand-primary-dark": "#2F4699",
        "brand-accent-yellow": "#FFC83D",
        "brand-accent-green": "#3DB39E",
        "brand-bg": "#F3F6FF",
        "brand-card": "#FFFFFF",
        "brand-text": "#1F2A44",
        "brand-text-secondary": "#6B7AA6",
        "brand-border": "#E3E9F5",
        // Brand flat tokens (dark)
        "brand-bg-dark": "#2e1065",
        // Choose readable defaults for dark surfaces/text based on the requested bg
        // These can be fine-tuned later to match the exact design
        "brand-card-dark": "#3b1a86",
        "brand-text-dark": "#F3F6FF",
        "brand-text-secondary-dark": "#C7C9E1",
        "brand-border-dark": "#4b2aa3",
      },
      spacing: {
        safe: "max(env(safe-area-inset-bottom), 1rem)",
      },
      animation: {
        "pulse-gentle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 2s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
