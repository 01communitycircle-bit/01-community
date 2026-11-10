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
        background: "#091540",
        // The user's exact 4-color palette from media_1794300100022_9037a64a.png
        guild: {
          navy: "#091540",       // Band 1: Midnight Deep Navy
          cobalt: "#1B2CC1",     // Band 2: Royal Cobalt Blue
          periwinkle: "#7692FF", // Band 3: Vibrant Periwinkle Blue
          ice: "#ABD2FA",        // Band 4: Ice / Soft Sky Blue
          card: "#0d1b52",       // Elevated card surface
          cardBorder: "#1B2CC1", // Card border
          cardHover: "#122363",  // Hover card surface
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
        guildCard: "0 10px 30px -4px rgba(9, 21, 64, 0.7)",
        guildHover: "0 20px 40px -10px rgba(27, 44, 193, 0.35)",
        guildGlow: "0 0 30px rgba(118, 146, 255, 0.25)",
      }
    },
  },
  plugins: [],
};
export default config;
