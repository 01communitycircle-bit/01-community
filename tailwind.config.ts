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
        background: "#050706",
        foreground: "#ffffff",
        guild: {
          pitch: "#030504",       // Deep Pitch Charcoal
          black: "#060807",       // Obsidian Slate
          surface: "#0c100e",     // Surface Card
          card: "#111714",        // Elevated Card Surface
          cardHover: "#16201b",   // Hover Card Surface
          border: "rgba(16, 185, 129, 0.22)", // Subtle Emerald Border
          borderActive: "rgba(16, 185, 129, 0.6)", // Bright Emerald Border
          emerald: {
            DEFAULT: "#10b981",   // Primary Emerald Green
            light: "#34d399",     // Mint Green
            dark: "#059669",      // Deep Forest Emerald
            glow: "#10b981",      // Neon Mint Glow
            subtle: "rgba(16, 185, 129, 0.12)",
          },
          gold: "#f59e0b",
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
