import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Soft dark theme: ink = dark surfaces (lighter than pure black),
        // paper = light text.
        ink: {
          950: "#1b2434",
          900: "#232d40",
          850: "#2a3549",
          800: "#31405a",
          700: "#3d4f6e",
          600: "#55688c",
        },
        paper: {
          50: "#f7f8fa",
          100: "#eef1f5",
          200: "#d9dfe8",
          300: "#b8c2d1",
          400: "#8b99ae",
        },
        accent: {
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        serif: [
          "Source Serif 4",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "serif",
        ],
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [],
};

export default config;
