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
        background: "#000000",
        foreground: "#ffffff",
        guild: {
          pitch: "#000000",       // Pure Pitch Black
          black: "#050505",       // Deep Obsidian
          surface: "#0c0c0e",     // Surface Card
          card: "#121214",        // Elevated Card Surface
          cardHover: "#18181b",   // Hover Card Surface
          border: "rgba(239, 68, 68, 0.22)", // Subtle Red Border
          borderActive: "rgba(239, 68, 68, 0.6)", // Bright Red Border
          red: {
            DEFAULT: "#dc2626",   // Primary Red (Crimson)
            light: "#ef4444",     // Vibrant Ruby
            dark: "#991b1b",      // Deep Blood Red
            glow: "#ff2222",      // Neon Laser Red
            subtle: "rgba(220, 38, 38, 0.12)",
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
        redGlow: "0 0 25px rgba(239, 68, 68, 0.45)",
        redGlowLg: "0 0 50px rgba(220, 38, 38, 0.5)",
        redGlowSm: "0 0 12px rgba(239, 68, 68, 0.35)",
        guildCard: "0 10px 30px -4px rgba(0, 0, 0, 0.9)",
        guildHover: "0 20px 40px -10px rgba(239, 68, 68, 0.25)",
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 2.5s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(239, 68, 68, 0.35)' },
          '50%': { boxShadow: '0 0 35px rgba(239, 68, 68, 0.7)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
