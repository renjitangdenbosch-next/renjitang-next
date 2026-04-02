import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "media",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        stone: {
          warm: "#f5f2eb",
          mist: "#e8e4dc",
          clay: "#c4b8a8",
          bark: "#6b5d4f",
        },
        ink: "#1A1208",
        "ink-light": "#241A0E",
        paper: "#F9F5EE",
        cream: "#EDE8DC",
        surface: "#EDE8DC",
        vermilion: "#C0392B",
        vermilionLight: "#D9534F",
        gold: "#B8860B",
        jade: "#3D6B4F",
        muted: "#9E8E75",
        rjt: {
          beige: "#F9F5EE",
          red: "#C0392B",
          gold: "#B8860B",
          dark: "#1A1208",
          cream: "#FAFAF8",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        cormorant: ["var(--font-serif)", "Georgia", "serif"],
        lato: ["var(--font-sans)", "sans-serif"],
      },
      animation: {
        marquee: "marquee 20s linear infinite",
        gradientShift: "gradientShift 4s ease infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-25%)" },
        },
        gradientShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
    },
  },
  plugins: [typography],
};
export default config;
