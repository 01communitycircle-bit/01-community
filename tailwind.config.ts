import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#0f172a",
        guild: {
          pitch: "#ffffff",
          black: "#f8fafc",
          surface: "#ffffff",
          card: "#ffffff",
          cardHover: "#f1f5f9",
          border: "rgba(16, 185, 129, 0.2)",
          borderActive: "rgba(5, 150, 105, 0.6)",
          emerald: {
            DEFAULT: "#059669",
            light: "#10b981",
            dark: "#047857",
            glow: "#10b981",
            subtle: "rgba(16, 185, 129, 0.08)",
          },
          gold: "#d97706",
        }
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "var(--font-inter)",
          "Segoe UI",
          "Roboto",
          "sans-serif"
        ],
      },
      boxShadow: {
        emeraldGlow: "0 0 25px rgba(16, 185, 129, 0.45)",
        emeraldGlowLg: "0 0 50px rgba(16, 185, 129, 0.55)",
        emeraldGlowSm: "0 0 12px rgba(16, 185, 129, 0.35)",
        redGlow: "0 0 25px rgba(16, 185, 129, 0.45)", // Backward-compatible alias
        redGlowLg: "0 0 50px rgba(16, 185, 129, 0.5)",
        redGlowSm: "0 0 12px rgba(16, 185, 129, 0.35)",
        guildCard: "0 10px 30px -4px rgba(0, 0, 0, 0.9)",
        guildHover: "0 20px 40px -10px rgba(16, 185, 129, 0.25)",
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 2.5s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(16, 185, 129, 0.35)' },
          '50%': { boxShadow: '0 0 35px rgba(16, 185, 129, 0.7)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
