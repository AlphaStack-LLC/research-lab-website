import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Light ("day") theme: ink = light surfaces, paper = dark text.
        ink: {
          950: "#f8fafc",
          900: "#ffffff",
          850: "#f1f5f9",
          800: "#e2e8f0",
          700: "#cbd5e1",
          600: "#94a3b8",
        },
        paper: {
          50: "#0f172a",
          100: "#1e293b",
          200: "#334155",
          300: "#475569",
          400: "#64748b",
        },
        accent: {
          300: "#0284c7",
          400: "#0369a1",
          500: "#075985",
          600: "#0c4a6e",
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
