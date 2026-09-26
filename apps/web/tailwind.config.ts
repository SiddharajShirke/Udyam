import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        gov: {
          navy: "#0C2340",
          "navy-light": "#163A62",
          blue: "#1A5276",
          "blue-light": "#2E86C1",
          "blue-accent": "#3498DB",
          surface: "#F4F6F9",
          white: "#FFFFFF",
          border: "#D5D8DC",
          "border-light": "#E8EAED",
          "text-primary": "#1C2833",
          "text-secondary": "#566573",
          "text-muted": "#85929E",
          success: "#1E8449",
          "success-light": "#E8F8F0",
          warning: "#D4910B",
          "warning-light": "#FEF5E7",
          danger: "#C0392B",
          "danger-light": "#FDEDEC",
          "active": "#2E86C1",
          "active-light": "#EBF5FB",
          "draft": "#85929E",
          "draft-light": "#F2F3F4",
        },
        brand: {
          orange: "#E86000",
          "orange-light": "#FF7A1A",
          "orange-dark": "#C04E00",
          "orange-surface": "#FFF4ED",
          "orange-tint": "#FFEEDD",
          nav: "#1A1A2E",
          "nav-light": "#252540",
          cream: "#FFFAF5",
        },
      },
      fontFamily: {
        sans: [
          "DM Sans",
          "sans-serif",
        ],
        display: [
          "Barlow Condensed",
          "sans-serif",
        ],
      },
      fontSize: {
        "page-title": ["1.5rem", { lineHeight: "2rem", fontWeight: "700" }],
        "section-title": [
          "1.125rem",
          { lineHeight: "1.75rem", fontWeight: "600" },
        ],
        "card-title": ["1rem", { lineHeight: "1.5rem", fontWeight: "600" }],
        body: ["0.875rem", { lineHeight: "1.25rem" }],
        caption: ["0.75rem", { lineHeight: "1rem" }],
      },
      boxShadow: {
        "gov-sm": "0 1px 2px 0 rgba(12, 35, 64, 0.05)",
        gov: "0 1px 3px 0 rgba(12, 35, 64, 0.08), 0 1px 2px -1px rgba(12, 35, 64, 0.08)",
        "gov-md": "0 4px 6px -1px rgba(12, 35, 64, 0.08), 0 2px 4px -2px rgba(12, 35, 64, 0.05)",
      },
      borderRadius: {
        gov: "0.375rem",
      },
    },
  },
  plugins: [],
};

export default config;
