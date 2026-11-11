import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#090d16",
        surface: "#111827",
        "surface-hover": "#1f2937",
        primary: "#06b6d4",
        accent: "#10b981",
      },
    },
  },
};

export default config;
