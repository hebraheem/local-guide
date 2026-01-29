import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
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
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          50: "#FFFAE6",
          100: "#FFF3C2",
          200: "#FFE68A",
          300: "#FFDA5E",
          400: "#FFCF45",
          500: "#FFC83D",
          600: "#E6B137",
          700: "#CC9B31",
          800: "#A87927",
          900: "#805A1E",
          950: "#5A3F15",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
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
        "brand-card-dark": "#3b1a86",
        "brand-text-dark": "#F3F6FF",
        "brand-text-secondary-dark": "#C7C9E1",
        "brand-border-dark": "#4b2aa3",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      spacing: {
        safe: "max(env(safe-area-inset-bottom), 1rem)",
      },
      animation: {
        "pulse-gentle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 2s infinite",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
