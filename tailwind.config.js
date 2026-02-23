import textShadow from "tailwindcss-textshadow";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Roboto", "Helvetica", "Arial", "sans-serif"],
        heading: ["Poppins", "Inter", "sans-serif"],
      },
      textShadow: {
        sm: "1px 1px 2px #d1d5db",
        DEFAULT: "2px 2px 4px #9ca3af",
        lg: "3px 3px 6px #6b7280",
        glow: "0 0 8px rgba(156, 163, 175, 0.8)",
        modern: "2px 2px 10px rgba(0, 255, 255, 0.4)", // cyan-ish glow
      },
    },
  },
  plugins: [textShadow],
};
