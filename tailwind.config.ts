import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        app: {
          bg: "#fbfaf8",
          card: "#ffffff",
          ink: "#111827",
          muted: "#6b7280",
          border: "#e5e7eb",
          accent: "#8b5a2b",  // warm brown
          accent2: "#d1a676"
        }
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.08)"
      }
    },
  },
  plugins: [],
};

export default config;
